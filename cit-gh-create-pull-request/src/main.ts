import * as core from '@actions/core';
import build from './builders/buildPRPayload';
import { send } from './sendPullRequest'; // Import the 'send' function from the appropriate module

export async function run(): Promise<void> {

    try {
        console.log('run');
        const ghPayloadRequest = await build(core);
        await send(ghPayloadRequest);
        console.log('run : success');
    } catch (error) {
        console.log(error);
    }


}