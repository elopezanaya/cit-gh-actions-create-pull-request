# cit-gh-actions

# Documentation

| Name           | CIT : Create pull request                                        |
|----------------|--------------------------------------------------------------------|
| Description    | Create a PR directly from the branch to the base                   |
| Author         | elopezanaya                                                       |

### Branding
| Icon  | Color  |
|-------|--------|
| cloud-rain | red |

### Inputs
| Name           | Description                                     | Required | Default                                   |
|----------------|-------------------------------------------------|----------|-------------------------------------------|
| title          | Title of the Pull-request                        | true     |                                           |
| body           | Description of the PR                            | true     | Automated PR generated via github-action   |
| head           | Branch name containing the changes               | true     |                                           |
| base           | Branch name of the main code                     | true     | main                                      |
| labels         | Label tags                                      |          |                                           |
| assignees      | Responsible of the task, List of user id's       |          |                                           |
| reviewers      | Responsible to review the changes, List of ids   |          |                                           |
| team_reviewers | Team name responsible to review the changes      |          |                                           |
| owner          | Owner of the repository                          | true     |                                           |
| repo           | Name of the repository                           | true     |                                           |
| token          | GITHUB_TOKEN                                    |          | \${{ github.token }}s                     |
| author         | Author of the changes                            | true     |                                           |
| auto-merge     | Enable branch for auto merge                     |          | false                                     |

### Outputs
| Name                 | Description                    |
|----------------------|--------------------------------|
| pull-request-number  | The pull request number        |
| pull-request-url     | The URL of the pull request    |
| pull-request-id      | Id of the PR                   |

### Runs
- Using: node20
- Main: ./dist/index.js


# Sample
name: Create Pull Request

on:
  push:
    branches:
      - main

jobs:
  create_pull_request:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Create Pull Request
        uses: elopezanaya/cit-gh-actions-create-pull-request/@beta
        with:
          title: Update feature XYZ
          body: This pull request includes updates for feature XYZ.
          head: feature-branch
          base: main
          owner: your-username
          repo: your-repository
          author: your-name
          token: ${{ secrets.GITHUB_TOKEN }}
