import { GithubPayload } from "./vo/githubPayload";
import { Octokit } from "@octokit/rest"; // Import the necessary module
export async function send(payload: GithubPayload) {
  console.log("send");

  const octokit = new Octokit({
    auth: payload.token,
  });

  const response = await octokit.pulls.create({
    owner: payload.owner,
    repo: payload.repo,
    title: payload.title,
    body: payload.body,
    head: payload.head,
    base: payload.base,
    maintainer_can_modify: false,
    labels: payload.labels,
    assignees: payload.assignees,
    reviewers: payload.reviewers,
    team_reviewers: payload.team_reviewers,
    author: payload.author,
    auto_merge: payload.auto_merge,
  });

  return response;
}
