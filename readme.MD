# Cessna Skyhawk

## Component Overview

The Cessna Skyhawk 🛩️ is a demonstration app showing how to consume the Bluetail public API and OAuth service. It serves as a test harness to develop, debug, and diagnose issues with these systems across different environments.

**Fact Sheet Link**: [Cessna Skyhawk Fact Sheet](https://bluetail.atlassian.net/wiki/spaces/BT/pages/786535/Cessna_Skyhawk)

## System Dependencies

### Prerequisites
- Node.js (24.x)
- pnpm 10.x (`corepack enable && corepack prepare pnpm@10.33.0 --activate`)

### External Services
- None

### Other Bluetail Components
- Auth Server
- Public API
- Bluetail Backend

### Third-party Services
- None

## Local Development Setup

### Installation Steps
1. Create a `.env` file based on the [Sample .env file](/.env.sample)
2. Install dependencies:
   ```
   pnpm install --frozen-lockfile
   ```

### Environment Variables
Refer to the [Sample .env file](/.env.sample) for a complete list of required environment variables.

```
NODE_ENV=development
PORT=3006
REACT_APP_OAUTH_CLIENT_ID=cessna_skyhawk
REACT_APP_OAUTH_REDIRECT_URL=http://localhost:3006/oauth_callback
REACT_APP_OAUTH_SERVER=http://localhost:3005
REACT_APP_PUBLIC_API=http://localhost:3004
```

### Running Locally
```
pnpm run start:local
```

The app will be available at http://localhost:3006

## Component Architecture

### Key Concepts
- Cessna-Skyhawk is a React app that relies on browser local storage for persisting state
- It doesn't have a "backend" other than the API and auth server it is demonstrating
- If a user is authenticated, it stores their API token in local browser storage
- If there is no token, it shows a login button

### Authentication Flow
The authentication flow works as follows:

1. User clicks login button and is redirected to the auth server
2. User authenticates on the auth server and is redirected back to the app with an authCode
3. The app uses the authCode and client_secret to obtain an access_token and refresh_token
4. These tokens are stored in local storage

### Available Functions
The app provides two main functions:
- Upload a document to a folder
- Logout (purge local storage)

## Testing
N/A

## Deployment

### Automatic Deployment
This application is deployed to AWS Amplify automatically whenever there is a commit pushed.

- Branch `dev` deploys updates to QA
- Branch `staging` deploys updates to staging
- Branch `master` deploys updates to PROD

See `amplify.yml` for Amplify's build configuration.

## Troubleshooting
N/A

## References

### Environment URLs

#### Application URLs
| Environment | URL                                                        |
| ----------- | ---------------------------------------------------------- |
| local       | http://localhost:3006                                      |
| qa          | https://cessna-skyhawk.qa.bluetail-dev.com                 |
| prod        | https://cessna-skyhawk.prod.bluetail-dev.com (not a typo!) |

#### Authentication URLs
| Environment | URL                                                        |
| ----------- | ---------------------------------------------------------- |
| local       | http://localhost:3005/oauth/authenticate?response_type=code&client_id=cessna_skyhawk&redirect_uri=http://localhost:3006/oauth_callback |
| qa          | https://auth.qa.bluetail-dev.com/oauth/authenticate?response_type=code&client_id=cessna_skyhawk&redirect_uri=https://cessna-skyhawk.qa.bluetail-dev.com/oauth_callback |
| prod        | https://auth.bluetail.aero/oauth/authenticate?response_type=code&client_id=cessna_skyhawk&redirect_uri=https://cessna-skyhawk.prod.bluetail-dev.com/oauth_callback |
