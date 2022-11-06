import core from '@actions/core';

try {
  const nameToGreet = core.getInput('who-to-greet');
  const vercel-token = core.getInput('vercel-token');
  const vercel-org-id = core.getInput('vercel-org-id');
  const vercel-project-id = core.getInput('vercel-project-id');
  const github-branch = core.getInput('github-branch');
  const github-hash = core.getInput('github-hash');
  const start-timeout = core.getInput('start-timeout');
  const finish-timeout = core.getInput('finish-timeout');
  const wait = core.getInput('wait');
  const vercel-token = console.log({vercel-token});
  const vercel-org-id = console.log({vercel-org-id});
  const vercel-project-id = console.log({vercel-project-id});
  const github-branch = console.log({github-branch});
  const github-hash = console.log({github-hash});
  const start-timeout = console.log({start-timeout});
  const finish-timeout = console.log({finish-timeout});
  const wait = console.log({wait});
  core.setOutput("deployment-url", "TODO");
} catch (error: unknown) {
  core.setFailed((error as Error).message);
}
