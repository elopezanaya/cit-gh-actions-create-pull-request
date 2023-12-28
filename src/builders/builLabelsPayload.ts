import { PRAddonsPayload } from "src/vo/PRAddonsPayload";
import { GithubPayload } from "src/vo/githubPayload";

export const buildPRAddonsPayload = async (
  input: GithubPayload,
  issueNumber: number,
) => {
  const prAddonsPayload: PRAddonsPayload = {
    labels: input.labels,
    owner: input.owner,
    repo: input.repo,
    token: input.token,
    issue_number: issueNumber,
    reviewers: input.reviewers,
    team_reviewers: input.team_reviewers,
    assignees: input.assignees,
  };

  return prAddonsPayload;
};

export default buildPRAddonsPayload;
