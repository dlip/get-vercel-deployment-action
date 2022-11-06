import { getDeployment, GetDeploymentArgs } from "./getDeployment";
import * as dotenv from 'dotenv'
dotenv.config()

const args: GetDeploymentArgs = {
  vercelToken: process.env.VERCEL_TOKEN as string,
  vercelOrgId: process.env.VERCEL_ORG_ID as string,
  vercelProjectId: process.env.VERCEL_VERCEL_PROJECT_ID as string,
  githubBranch: process.env.GITHUB_REF_NAME as string,
  githubCommit: process.env.GITHUB_SHA as string,
  startTimeout: parseInt(process.env.START_TIMEOUT as string),
  finishTimeout: parseInt(process.env.FINISH_TIMEOUT as string),
  wait: process.env.WAIT === 'true',
};

getDeployment(args).then(console.log)
