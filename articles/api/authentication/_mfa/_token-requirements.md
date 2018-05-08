### Access Token requirements

The multifactor authentication endpoints require an [Access Token](/tokens/access-token) with:

- `audience`: Set to `https://${account.namespace}/mfa`
- `scope`: Include `enroll` to associate or add authenticators, `read:authenticators` to list authenticators, and `remove:authenticators` to delete authenticators.