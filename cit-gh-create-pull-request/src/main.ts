import * as core from "@actions/core";
import build from "./builders/buildPRPayload";
import { send } from "./sendPullRequest"; // Import the 'send' function from the appropriate module

export async function run(): Promise<void> {
  try {
    core.debug("Starting action");

    const ghPayloadRequest = await build(core);
    const result = await send(ghPayloadRequest);

    if (result.status !== 201) {
      throw new Error(
        `Failed to create pull request. Status: ${result.status}, Message: ${result}`,
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
