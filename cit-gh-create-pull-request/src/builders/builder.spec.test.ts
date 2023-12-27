import build from "./buildPRPayload";
//unit tests for buildPRPayload.ts
describe("buildPRPayload : happy path", () => {
  it("should return a GithubPayload object", async () => {
    const core = {
      getInput: jest.fn()
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
      .mockReturnValueOnce("token"),
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
    });
  });
});