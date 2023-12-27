export interface GithubPayload {
  title: string;
  body: string;
  head: string;
  base: string;
  labels: string[];
  assignees: string[];
  reviewers: string[];
  team_reviewers: string[];
  owner: string;
  repo: string;
  token: string;
  author: string;
  auto_merge: boolean;
}
