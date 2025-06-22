# GitHub Actions Setup for BigBlocks Registry

## Automated Setup (Recommended)

If you have repository admin permissions and are using the Anthropic API directly:

1. Run this command in Claude Code:
   ```
   /install-github-app
   ```

2. Follow the prompts to:
   - Install the Claude GitHub App
   - Configure repository secrets
   - Set up workflows

## Manual Setup

### 1. Add Repository Secret

Add `ANTHROPIC_API_KEY` to your repository secrets:
1. Go to Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `ANTHROPIC_API_KEY`
4. Value: Your Anthropic API key from https://console.anthropic.com/

### 2. GitHub Actions Workflow

The workflow is already configured in `.github/workflows/component-review.yml` and will:
- Trigger on PRs that modify registry components
- Run type checking and pattern validation
- Use Claude to review component code
- Post a summary comment on the PR

### 3. Using Claude in Issues/PRs

Once configured, you can:
- Tag `@claude` in issue comments to get help
- Tag `@claude` in PR comments for code reviews
- Use phrases like "@claude implement this feature" to trigger actions

## Testing the Integration

1. Create a test PR with a component change
2. Add the `new-component` label
3. Claude should automatically review the changes

## Troubleshooting

### Action Not Running
- Check that `ANTHROPIC_API_KEY` is set in repository secrets
- Verify the workflow file syntax is correct
- Check Actions tab for error logs

### Authentication Errors
- Ensure your API key is valid and has sufficient credits
- For AWS Bedrock or Google Vertex, see the [official docs](https://github.com/anthropics/claude-code-action)

### Review Not Posting
- Check that the GitHub token has write permissions
- Verify the PR has the correct labels or trigger comments