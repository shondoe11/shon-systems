import "server-only";
import { site } from "./site";

//& svr-only: token never reaches client bundle. every call cached by next's fetch cache(1h), so site makes at most handful of reqs/h regardless of traffic.
const REVALIDATE_SECONDS = 3600;
const REST = "https://api.github.com";
const GRAPHQL = "https://api.github.com/graphql";

export type ProfileStats = {
  publicRepos: number;
  followers: number;
  commitsThisYear: number | null;
  year: number;
};

export type RepoStats = {
  stars: number;
  forks: number;
  language: string | null;
  pushedAt: string;
};

const token = process.env.GITHUB_TOKEN;

function headers(): HeadersInit {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "shon-systems",
  };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

async function rest<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${REST}${path}`, {
      headers: headers(),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) {
      console.warn(`[github] ${path} -> ${res.status}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`[github] ${path} failed`, err);
    return null;
  }
}

//& contribution totals only exist on graphql api (refuses unauthenticated calls), so quietly returns null when no token configured.
async function commitsThisYear(year: number): Promise<number | null> {
  if (!token) return null;
  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
          restrictedContributionsCount
        }
      }
    }`;
  const variables = {
    login: site.githubUser,
    from: `${year}-01-01T00:00:00Z`,
    to: `${year}-12-31T23:59:59Z`,
  };
  try {
    const res = await fetch(GRAPHQL, {
      method: "POST",
      headers: { ...headers(), "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) {
      console.warn(`[github] graphql -> ${res.status}`);
      return null;
    }
    const json = (await res.json()) as {
      data?: {
        user?: {
          contributionsCollection?: {
            totalCommitContributions: number;
            restrictedContributionsCount: number;
          };
        };
      };
      errors?: { message: string }[];
    };
    if (json.errors?.length) {
      console.warn("[github] graphql errors", json.errors);
      return null;
    }
    const c = json.data?.user?.contributionsCollection;
    if (!c) return null;
    return c.totalCommitContributions + c.restrictedContributionsCount;
  } catch (err) {
    console.warn("[github] graphql failed", err);
    return null;
  }
}

export async function getProfileStats(): Promise<ProfileStats | null> {
  const year = new Date().getUTCFullYear();
  const [user, commits] = await Promise.all([
    rest<{ public_repos: number; followers: number }>(`/users/${site.githubUser}`),
    commitsThisYear(year),
  ]);
  if (!user) return null;
  return {
    publicRepos: user.public_repos,
    followers: user.followers,
    commitsThisYear: commits,
    year,
  };
}

export async function getRepoStats(owner: string, repo: string): Promise<RepoStats | null> {
  const data = await rest<{
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    pushed_at: string;
  }>(`/repos/${owner}/${repo}`);
  if (!data) return null;
  return {
    stars: data.stargazers_count,
    forks: data.forks_count,
    language: data.language,
    pushedAt: data.pushed_at,
  };
}
