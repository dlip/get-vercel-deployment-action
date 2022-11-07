# Get Vercel Deployment Action

## Inputs

| Name                | Required | Default | Description                                                                                                 |
| ------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| `vercel-token`      | ✅       |         | API token for Vercel                                                                                        |
| `vercel-org-id`     | ✅       |         | Org/Team ID (can be found in `.vercel/project.json` after `vercel login` command)                           |
| `vercel-project-id` | ✅       |         | Project ID (can be found in `.vercel/project.json` after `vercel login` command)                            |
| `github-branch`     | ✅       |         | Branch that matches the deployment                                                                          |
| `github-commit`     | ✅       |         | Commit that matches the deployment                                                                          |
| `start-timeout`     | ✖️       | `600`   | How long to wait to see the deployment starting                                                             |
| `finish-timeout`    | ✖️       | `600`   | How long to wait to see the deployment finish (if `wait` is set to `true`)                                  |
| `pagination-limit`  | ✖️       | `1`     | Vercel's api gives back 20 deployments per page, if this is a new deployment it should be on the first page |
| `wait`              | ✖️       | `true`  | If the action should wait for the deployment to finish deploying                                            |

## Outputs

| Name             | Description                              |
| ---------------- | ---------------------------------------- |
| `deployment-url` | URL of the deployment assigned by Vercel |

## Example

```yaml
name: "Pull Request"
on:
  pull_request:

jobs:
  my_job:
    runs-on: ubuntu-latest
    steps:
      - uses: dlip/get-vercel-deployment-action@v1.0.0
        id: get-vercel-deployment
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID}}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID}}
          github-branch: ${{ github.head_ref }}
          github-commit: ${{ github.event.pull_request.head.sha }}
      - run: echo "${{ steps.get-vercel-deployment.outputs.deployment-url }}"
```
