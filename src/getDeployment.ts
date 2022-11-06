import fetch from 'cross-fetch';

export type GetDeploymentArgs = {
  vercelToken: string;
  vercelOrgId: string;
  vercelProjectId: string;
  githubBranch: string;
  githubHash: string;
  startTimeout: number;
  finishTimeout: number;
  wait: boolean;
};

export async function getDeployment({
  vercelToken,
  vercelOrgId,
  vercelProjectId,
  githubBranch,
  githubHash,
  startTimeout,
  finishTimeout,
  wait,
}: GetDeploymentArgs) {
  const response = await fetch(
    `https://api.vercel.com/v6/deployments?teamId=${vercelOrgId}&projectId=${vercelProjectId}`,
    {
      headers: {
        Authorization: `Bearer ${vercelToken}`,
      },
      method: "get",
    }
  );
  return response.json();
}
