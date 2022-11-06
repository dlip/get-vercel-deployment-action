import * as core from "@actions/core";
import { getDeployment, GetDeploymentArgs } from "./getDeployment";

try {
  const args: GetDeploymentArgs = {
    vercelToken: core.getInput("vercel-token"),
    vercelOrgId: core.getInput("vercel-org-id"),
    vercelProjectId: core.getInput("vercel-project-id"),
    githubBranch: core.getInput("github-branch"),
    githubCommit: core.getInput("github-commit"),
    startTimeout: parseInt(core.getInput("start-timeout")),
    finishTimeout: parseInt(core.getInput("finish-timeout")),
    paginationLimit: parseInt(core.getInput("pagination-limit")),
    wait: core.getBooleanInput("wait"),
  };
  console.log(args);

  getDeployment(args).then((deployment) => {
    core.setOutput("deployment-url", deployment.url);
  });
} catch (error: unknown) {
  core.setFailed((error as Error).message);
}
