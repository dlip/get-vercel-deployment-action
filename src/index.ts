import core from '@actions/core';

try {
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
} catch (error: unknown) {
  core.setFailed((error as Error).message);
}
