# Deployment

## Deploying UI updates to QA 

- https://boom.qa.bluetail-dev.com
- /api acts as a proxy to https://boom-api.qa.bluetail-dev.com

To deploy the code to QA all you need to do is push a commit or update the `dev` branch.
AWS Amplify will then notice the update and automatically build and refresh the environment.

### Amplify Setup

The only remarkable piece of Amplify setup is a Rewrite/redirect rule

Source address: `/api/<*>`
Target address: `https://boom-api.qa.bluetail-dev.com/api/<*>`
Type: 200 (Rewrite)

## Deploying UI updates to Prod 

- https://boom.bluetail.aero
- /api acts as a proxy to https://boom-api.bluetail.aero

To deploy the code to Production all you need to do is push a commit or update the `master` branch.
AWS Amplify will then notice the update and automatically build and refresh the environment.

### Amplify Setup

The only remarkable piece of Amplify setup is a Rewrite/redirect rule

Source address: `/api/<*>`
Target address: `https://boom-api.bluetail.aero/api/<*>`
Type: 200 (Rewrite)
