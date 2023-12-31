import * as core from "@actions/core";
import { GithubPayload } from "../vo/githubPayload";
import { stripStringSeparatedByCommas } from "../utils/Utils";

type CoreType = typeof core;

const build = async (input: CoreType) => {
  const ghPayload: GithubPayload = {
    title: input.getInput("title"),
    body: input.getInput("body"),
    head: input.getInput("head"),
    base: input.getInput("base"),
    labels: stripStringSeparatedByCommas(input.getInput("labels")),
    assignees: stripStringSeparatedByCommas(input.getInput("assignees")),
    reviewers: stripStringSeparatedByCommas(input.getInput("reviewers")),
    team_reviewers: stripStringSeparatedByCommas(
      input.getInput("team_reviewers"),
    ),
    owner: input.getInput("owner"),
    repo: input.getInput("repo"),
    token: input.getInput("token"),
    author: input.getInput("author"),
    auto_merge: input.getInput("auto_merge") === "true",
  };

  return ghPayload;
};

export default build;
