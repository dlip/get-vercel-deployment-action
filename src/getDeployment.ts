import fetch from "cross-fetch";
import { retry } from "ts-retry-promise";

export type GetDeploymentArgs = {
  vercelToken: string;
  vercelOrgId: string;
  vercelProjectId: string;
  githubBranch: string;
  githubCommit: string;
  startTimeout: number;
  finishTimeout: number;
  paginationLimit: number;
  wait: boolean;
};

export type DeploymentMeta = {
  githubCommitAuthorName: string;
  githubCommitMessage: string;
  githubCommitOrg: string;
  githubCommitRef: string;
  githubCommitRepo: string;
  githubCommitSha: string;
  githubDeployment: string;
  githubOrg: string;
  githubRepo: string;
  githubCommitAuthorLogin: string;
};

export interface Deployment {
  /** The unique identifier of the deployment. */
  uid: string;
  /** The name of the deployment. */
  name: string;
  /** The URL of the deployment. */
  url: string;
  /** Timestamp of when the deployment got created. */
  created: number;
  /** The source of the deployment. */
  source?: "cli" | "git" | "import" | "import/repo" | "clone/repo";
  /** In which state is the deployment. */
  state?:
  | "BUILDING"
  | "ERROR"
  | "INITIALIZING"
  | "QUEUED"
  | "READY"
  | "CANCELED";
  /** The type of the deployment. */
  type: "LAMBDAS";
  /** Metadata information of the user who created the deployment. */
  creator: {
    /** The unique identifier of the user. */
    uid: string;
    /** The email address of the user. */
    email?: string;
    /** The username of the user. */
    username?: string;
    /** The GitHub login of the user. */
    githubLogin?: string;
    /** The GitLab login of the user. */
    gitlabLogin?: string;
  };
  /** An object containing the deployment's metadata */
  meta: DeploymentMeta;
  /** On which environment has the deployment been deployed to. */
  target?: ("production" | "staging") | null;
  /** An error object in case aliasing of the deployment failed. */
  aliasError?: {
    code: string;
    message: string;
  } | null;
  aliasAssigned?: (number | boolean) | null;
  /** Timestamp of when the deployment got created. */
  createdAt?: number;
  /** Timestamp of when the deployment started building at. */
  buildingAt?: number;
  /** Timestamp of when the deployment got ready. */
  ready?: number;
  /** State of all registered checks */
  checksState?: "registered" | "running" | "completed";
  /** Conclusion for checks */
  checksConclusion?: "succeeded" | "failed" | "skipped" | "canceled";
  /** Vercel URL to inspect the deployment. */
  inspectorUrl: string | null;
  /** Deployment can be used for instant rollback */
  isRollbackCandidate?: boolean | null;
}

interface Pagination {
  /** Amount of items in the current page. */
  count: number;
  /** Timestamp that must be used to request the next page. */
  next: number | null;
  /** Timestamp that must be used to request the previous page. */
  prev: number | null;
}

interface DeploymentResponse {
  pagination: Pagination;
  deployments: Deployment[];
}

export async function getDeployment({
  vercelToken,
  vercelOrgId,
  vercelProjectId,
  githubBranch,
  githubCommit,
  startTimeout,
  finishTimeout,
  paginationLimit,
  wait,
}: GetDeploymentArgs) {
  const deployment = await retry(
    async () => {
      console.log("Finding deployment...");
      let next = null;
      for (let page = 0; page < paginationLimit; page++) {
        let url = `https://api.vercel.com/v6/deployments?teamId=${vercelOrgId}&projectId=${vercelProjectId}`;
        if (next) {
          url += `&until=${next}`;
        }
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${vercelToken}`,
          },
          method: "get",
        });
        const result = (await response.json()) as DeploymentResponse;
        const deployment = result.deployments.find(
          (d) =>
            d.meta.githubCommitRef === githubBranch &&
            d.meta.githubCommitSha === githubCommit
        );
        if (deployment) {
          return deployment;
        }
        if (result.pagination.next) {
          next = result.pagination.next;
        } else {
          break;
        }
      }
      throw new Error("Deployment not found");
    },
    { timeout: startTimeout * 1000, delay: 1000, retries: "INFINITELY" }
  );
  console.log("Deployment found!");
  if (wait) {
    console.log("Waiting for deployment to finish...");
    await retry(
      async () => {
        let url = `https://api.vercel.com/v13/deployments/${deployment.uid}`;
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${vercelToken}`,
          },
          method: "get",
        });
        if ((await response.json()).readyState === "READY") {
          console.log("Deployment is ready!");
          return;
        }
        throw new Error("Deployment not found");
      },
      { timeout: finishTimeout * 1000, delay: 1000, retries: "INFINITELY" }
    );
  }

  return deployment;
}
