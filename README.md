# cit-gh-actions
This is a simple hook that creates a PR from an already checkout branch, which changes are already commit and pushed.



# Documentation

| Name           | CIT : Create pull request                                        |
|----------------|--------------------------------------------------------------------|
| Description    | Create a PR directly from the branch to the base                   |
| Author         | elopezanaya                                                       |


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




# Sample

name: 🚀🚀🚀 Launch PR creator 📢📢📢
on:
  workflow_dispatch:

permissions: write-all

jobs:
  send-pull-request:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout main branch
        uses: actions/checkout@v2
        with:
          ref: main

      - name: Create temporary branch and chekout
        id: create_branch
        run: | 
          branch_name="tmp-bump-$(date +'%m-%d-%Y-%H-%M-%S')"
          git checkout -b "$branch_name"
          git push --set-upstream origin "$branch_name"
          echo "::set-output name=branch_name::$branch_name"


      - name: Create and commit text file
        run: |
          git config --global user.email "actions@github.com"
          git config --global user.name "GitHub Actions"
          echo "This is a sample text file." > sample.txt
          git add sample.txt
          git commit -m "Add sample.txt"
          git push origin HEAD:${{ steps.create_branch.outputs.branch_name }}

          
      - name: Checkout
        uses: actions/checkout@v4
      - name: Send PR using root action
        uses: ./
        id: sendPR
        with:
          title: 'taco shop - pull request'
          body: 'Taco shop is a great place to eat tacos'
          head: ${{ steps.create_branch.outputs.branch_name }}
          base: 'main'
          labels: 'bug, enhancement'
          assignees: 'elopezanaya'
          owner: 'elopezanaya'
          repo: 'cit-gh-actions-create-pull-request'
          token: ${{ secrets.GITHUB_TOKEN }}
          author: ${{ github.actor }} <${{ github.actor }}@users.noreply.github.com>
          auto-merge: 'true'
      - name : PrintOutput
        run: | 
          echo "The PR number is ${{ steps.sendPR.outputs.pull_request_number }}"
          echo "The PR url is ${{ steps.sendPR.outputs.pull_request_url }}"
          echo "The PR ID is ${{ steps.sendPR.outputs.pull_request_id }}"
