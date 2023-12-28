import { PRAddonsPayload } from "./vo/PRAddonsPayload";
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

export async function addLabels(labelsPayload: PRAddonsPayload) {
  try {
    console.log("addLabels");

    const octokit = new Octokit({
      auth: labelsPayload.token,
    });

    const response = await octokit.issues.addLabels({
      owner: labelsPayload.owner,
      repo: labelsPayload.repo,
      issue_number: labelsPayload.issue_number,
      labels: labelsPayload.labels,
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function addAssignees(assigneesPayload: PRAddonsPayload) {
  try {
    console.log("addAssignees");

    const octokit = new Octokit({
      auth: assigneesPayload.token,
    });

    const response = await octokit.issues.addAssignees({
      owner: assigneesPayload.owner,
      repo: assigneesPayload.repo,
      issue_number: assigneesPayload.issue_number,
      assignees: assigneesPayload.labels,
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function addReviewers(reviewersPayload: PRAddonsPayload) {
  try {
    console.log("addReviewers");

    const octokit = new Octokit({
      auth: reviewersPayload.token,
    });

    const response = await octokit.pulls.requestReviewers({
      owner: reviewersPayload.owner,
      repo: reviewersPayload.repo,
      pull_number: reviewersPayload.issue_number,
      reviewers: reviewersPayload.labels,
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function addTeamReviewers(teamReviewersPayload: PRAddonsPayload) {
  try {
    console.log("addTeamReviewers");

    const octokit = new Octokit({
      auth: teamReviewersPayload.token,
    });

    const response = await octokit.pulls.requestReviewers({
      owner: teamReviewersPayload.owner,
      repo: teamReviewersPayload.repo,
      pull_number: teamReviewersPayload.issue_number,
      team_reviewers: teamReviewersPayload.labels,
    });

    return response;
  } catch (error) {
    throw error;
  }
}
