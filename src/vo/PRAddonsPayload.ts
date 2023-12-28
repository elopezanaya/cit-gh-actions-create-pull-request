export interface PRAddonsPayload {
  labels: string[];
  owner: string;
  repo: string;
  token: string;
  issue_number: number;
  reviewers: string[];
  team_reviewers: string[];
  assignees: string[];
}
