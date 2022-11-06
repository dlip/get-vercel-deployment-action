import * as core from "@actions/core";

try {
  const args = {
    vercelToken: core.getInput("vercel-token"),
    vercelOrgId: core.getInput("vercel-org-id"),
    vercelProjectId: core.getInput("vercel-project-id"),
    githubBranch: core.getInput("github-branch"),
    githubHash: core.getInput("github-hash"),
    startTimeout: core.getInput("start-timeout"),
    finishTimeout: core.getInput("finish-timeout"),
    wait: core.getInput("wait"),
  };
  console.log(args);

  core.setOutput("deployment-url", "todo");
} catch (error: unknown) {
  console.error(error);
  core.setFailed((error as Error).message);
}
