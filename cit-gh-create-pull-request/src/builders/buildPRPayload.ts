import * as core from "@actions/core";
import { GithubPayload } from "../vo/githubPayload";

type CoreType = typeof core;

const build = async (input: CoreType) => {
  const ghPayload: GithubPayload = {
    title: input.getInput("title"),
    body: input.getInput("body"),
    head: input.getInput("head"),
    base: input.getInput("base"),
    labels: input.getInput("labels").split(","),
    assignees: input.getInput("assignees").split(","),
    reviewers: input.getInput("reviewers").split(","),
    team_reviewers: input.getInput("team_reviewers").split(","),
    owner: input.getInput("owner"),
    repo: input.getInput("repo"),
    token: input.getInput("token"),
  };

  return ghPayload;
};

export default build;
