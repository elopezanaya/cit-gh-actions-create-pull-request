import { PRAddonsPayload } from "src/vo/PRAddonsPayload";
import { GithubPayload } from "src/vo/githubPayload";

export const buildPRAddonsPayload = async (
  input: GithubPayload,
  issueNumber: number,
) => {
  const labelsPayload: PRAddonsPayload = {
    labels: input.labels,
    owner: input.owner,
    repo: input.repo,
    token: input.token,
    issue_number: issueNumber,
  };

  return labelsPayload;
};

export default buildPRAddonsPayload;
