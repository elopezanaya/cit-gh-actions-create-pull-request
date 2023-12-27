import build from "./buildPRPayload";
//unit tests for buildPRPayload.ts
describe("buildPRPayload : testing build functionality", () => {
  it("should return a GithubPayload object", async () => {
    const core = {
      getInput: jest
        .fn()
        .mockReturnValueOnce("title")
        .mockReturnValueOnce("body")
        .mockReturnValueOnce("head")
        .mockReturnValueOnce("base")
        .mockReturnValueOnce("bug,enhancement") // labels
        .mockReturnValueOnce("uno,dos") // assignees
        .mockReturnValueOnce("tres,cuatro") // reviewers
        .mockReturnValueOnce("los-mas-aca") // team_reviewers
        .mockReturnValueOnce("owner")
        .mockReturnValueOnce("repo")
        .mockReturnValueOnce("token")
        .mockReturnValueOnce("author")
        .mockReturnValueOnce("true"),
    };
    const result = await build(core as any);
    expect(result).toEqual({
      title: "title",
      body: "body",
      head: "head",
      base: "base",
      labels: ["bug", "enhancement"],
      assignees: ["uno", "dos"],
      reviewers: ["tres", "cuatro"],
      team_reviewers: ["los-mas-aca"],
      owner: "owner",
      repo: "repo",
      token: "token",
      author: "author",
      auto_merge: true,
    });
  });

  it("should return a GithubPayload object with empty arrays for missing fields", async () => {
    const core = {
      getInput: jest
        .fn()
        .mockReturnValueOnce("title")
        .mockReturnValueOnce("body")
        .mockReturnValueOnce("head")
        .mockReturnValueOnce("base")
        .mockReturnValueOnce("uno") // labels
        .mockReturnValueOnce("") // assignees
        .mockReturnValueOnce("") // reviewers
        .mockReturnValueOnce("los-mas-aca") // team_reviewers
        .mockReturnValueOnce("owner")
        .mockReturnValueOnce("repo")
        .mockReturnValueOnce("token")
        .mockReturnValueOnce("author")
        .mockReturnValueOnce("true"),
    };
    const result = await build(core as any);
    expect(result).toEqual({
      title: "title",
      body: "body",
      head: "head",
      base: "base",
      labels: ["uno"],
      assignees: [],
      reviewers: [],
      team_reviewers: ["los-mas-aca"],
      owner: "owner",
      repo: "repo",
      token: "token",
      author: "author",
      auto_merge: true,
    });
  });
});
