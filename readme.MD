# WTF is this?

cessna_skyhawk is a simple plane, a humble plane, a workhouse.

It is also a simple, humble, workhorse of a React FE app that we use to develop and test the public API(https://github.com/Bluetail-aero/public-api) and the auth server (https://github.com/Bluetail-aero/auth).

There are lot of moving parts in this solution and it's difficult to test each part in isolation. 
Especially when we need to test it to QA or production!!

This application is a basic little test harness that we can use to develop, debug and diagnose issues with those systems in all the different environments.  Do I want to ask a third party to help me test the API in production? Not really?!!

## Projects for the stack of the Appliation

- [Public API](https://github.com/Bluetail-aero/public-api)
- [Auth Server](https://github.com/Bluetail-aero/auth)
- [Backend Project](https://github.com/Bluetail-aero/bulk-doc-uploader-api)

## How do we access this app?

| Environment | URL                                                        |
| ----------- | ---------------------------------------------------------- |
| local       | http://localhost:3006                                      |
| qa:         | https://cessna_skyhawk.qa.bluetail-dev.com                 |
| prod:       | https://cessna_skyhawk.prod.bluetail-dev.com (not a typo!) |


## How it will function?

- Using only local storage: if a user is authenticated then it will store their API token in local browser storage.
- If there is no token, they aren't logged in, so it will just show a login button (kind of like what BOOM does https://boom.bluetail.aero/)
- Clicking the login button will redirect to the auth server.
   - locally http://localhost:3005/oauth/authenticate?response_type=code&client_id=cessna_skyhawk&redirect_uri=http://localhost:3006/oauth_callback
   - QA https://auth.qa.bluetail-dev.com/oauth/authenticate?response_type=code&client_id=cessna_skyhawk&redirect_uri=https://cessna_skyhawk.qa.bluetail-dev.com/oauth_callback
   - prod https://auth.bluetail.aero/oauth/authenticate?response_type=code&client_id=cessna_skyhawk&redirect_uri=https://cessna_skyhawk.prod.bluetail-dev.com/oauth_callback
- **OAuth login stuff happens. User gets redirected back to the test harness ...**
- When there is a valid token the "home page" of the app will unpack all the details we have about the user: 
  - token, 
  - userId, 
  - name, 
  - scopes.
- There will be three (crude) functions available for the user to perform:
  - List folder structure
  - Upload a document to a folder.
  - Logout (purge local storage)

TADA! 🎉

### Example local env

```
# These SESSION_REPLAY settings are there for use with DataDog user session recording, which we use on production to replay any issues users are reporting.
REACT_APP_SESSION_REPLAY_ENABLED=true
REACT_APP_SESSION_REPLAY_env=local
REACT_APP_SESSION_REPLAY_sampleRate=100
REACT_APP_SESSION_REPLAY_sessionReplaySampleRate=100
NODE_ENV=development
PORT=3101
REACT_APP_API_DOMAIN=/api
REACT_APP_OAUTH_REDIRECT_URL=http://localhost:3006/oauth_callback
REACT_APP_OAUTH_CLIENT_ID=cessna_skyhawk
REACT_APP_OAUTH_SERVER=http://localhost:3005

```

You will need the following:

- [BOOM API](https://github.com/Bluetail-aero/bulk-doc-uploader-api) running
- [BOOM Daemon](https://github.com/Bluetail-aero/bulk-doc-uploader-daemon) running (optional but recommended)
- Postgres (We recommend the following Docker images)
  -[Postgres Image](https://hub.docker.com/layers/ppc64le/postgres/11.17-bullseye/images/sha256-938d2e8f2f90623f244273bd53b88d01c390107e3724de2dfeeffca54fe28b14)
          - See Jason or Mike about getting setup
          - You will need to perform a DB restore from the QA environment to get started most likely, and you can run into some weird issues with pgadmin's strictness around restoring. You will want to be very aware of what version of "tooling" is used to backup the DB, as the same version needs used when restoring, and this version can be completely arbitrary based on pgadmin settings.
  -[pgAdmin Image](https://hub.docker.com/r/dpage/pgadmin4/)
  -Either a personal AWS account with it's own buckets, or the ability to point the local backend to an AWS environment like QA.

### Running the code locally

Depending on where you want to point the frontend, you have a number of options you can choose. In general though, you will likely want to target the project at a local environment setup. As usual, see package.json for a complete listing of available scripts.

```
npm i
npm run start:local
```