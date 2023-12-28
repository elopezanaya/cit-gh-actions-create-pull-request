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

    const addLabelPayload = await buildPRAddonsPayload(ghPayloadRequest, result.data.number);
    const labelsResult = await addLabels(addLabelPayload);
    if (labelsResult.status !== 200) {
      throw new Error(
        `Failed to add labels request. Status: ${result.status}, Message: ${result}`,
      );
    }


    const addAssigneesPayload = await buildPRAddonsPayload(ghPayloadRequest, result.data.number);
    const assignesResult = await addAssignees(addAssigneesPayload);
    if (assignesResult.status !== 201) {
      throw new Error(
        `Failed to create pull request. Status: ${result.status}, Message: ${result}`,
      );
    }

    const addReviewersPayload = await buildPRAddonsPayload(ghPayloadRequest, result.data.number);
    const reviewersResult = await addReviewers(addReviewersPayload);
    if (reviewersResult.status !== 201) {
      throw new Error(
        `Failed to add individual reviewers pull request. Status: ${result.status}, Message: ${result}`,
      );
    }

    const addTeamReviewersPayload = await buildPRAddonsPayload(ghPayloadRequest, result.data.number);
    const teamReviewersResult = await addReviewers(addTeamReviewersPayload);
    if (teamReviewersResult.status !== 201) {
      throw new Error(
        `Failed to add team reviewers. Status: ${result.status}, Message: ${result}`,
      );
    }

    core.setOutput("pull_request_number", result.data.number.toString());
    core.setOutput("pull_request_url", result.data.html_url);
    core.setOutput("pull_request_id", result.data.id.toString());
  } catch (error) {
    core.debug("Error in action");
    core.setFailed((error as Error).message);
  }
}
