import * as core from "@actions/core";
import build from "./builders/buildPRPayload";
import { addAssignees, addLabels, addReviewers, send } from "./sendPullRequest"; // Import the 'send' function from the appropriate module
import { buildPRAddonsPayload } from "./builders/builLabelsPayload";

export async function run(): Promise<void> {
  try {
    core.debug("Starting action");

    const ghPayloadRequest = await build(core);
    const result = await send(ghPayloadRequest);
    core.debug("labels: " + JSON.stringify(ghPayloadRequest.labels));

    if (result.status !== 201) {
      throw new Error(
        `Failed to create pull request. Status: ${result.status}, Message: ${result}`,
      );
    }

    const addLabelPayload = await buildPRAddonsPayload(
      ghPayloadRequest,
      result.data.number,
    );
    const labelsResult = await addLabels(addLabelPayload);
    if (labelsResult.status !== 200) {
      core.error("ERROR : Addinng labels : " + labelsResult);
    }

    const addAssigneesPayload = await buildPRAddonsPayload(
      ghPayloadRequest,
      result.data.number,
    );
    const assignesResult = await addAssignees(addAssigneesPayload);
    if (assignesResult.status !== 201) {
      core.error("ERROR : Adding assignees : " + assignesResult);
    }

    const addReviewersPayload = await buildPRAddonsPayload(
      ghPayloadRequest,
      result.data.number,
    );
    const reviewersResult = await addReviewers(addReviewersPayload);
    if (reviewersResult.status !== 201) {
      core.error("ERROR : Adding reviewers : " + reviewersResult);
    }

    const addTeamReviewersPayload = await buildPRAddonsPayload(
      ghPayloadRequest,
      result.data.number,
    );
    const teamReviewersResult = await addReviewers(addTeamReviewersPayload);
    if (teamReviewersResult.status !== 201) {
      core.error("ERROR : Adding team review : " + teamReviewersResult);
    }

    core.setOutput("pull_request_number", result.data.number.toString());
    core.setOutput("pull_request_url", result.data.html_url);
    core.setOutput("pull_request_id", result.data.id.toString());
  } catch (error) {
    core.error("Error in action received");
    core.setFailed((error as Error).message);
  }
}
