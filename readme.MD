# WTF is this?

cessna_skyhawk is a simple plane, a humble plane, a workhouse.

It is also a simple, humble, workhorse of a React FE app that we use to develop and test the public API(https://github.com/Bluetail-aero/public-api) and the auth server (https://github.com/Bluetail-aero/auth).

There are lot of moving parts in this solution and it's difficult to test each part in isolation. 
Especially when we need to test it to QA or production!!

This application is a basic little test harness that we can use to develop, debug and diagnose issues with those systems in all the different environments.  Do I want to ask a third party to help me test the API in production? Not really?!!

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

# Env variables?

This app will need some oauth_client settings:

| Environment | REACT_APP_OAUTH_REDIRECT_URL                                | REACT_APP_OAUTH_CLIENT_ID | REACT_APP_OAUTH_CLIENT_SECRET |
| ----------- | ----------------------------------------------------------- | ------------------------- | ----------------------------- |
| local       | http://localhost:3006/oauth_callback                        | cessna_skyhawk            | btjJvcqiycM3Q3JE6ve7AJVP      |
| qa:         | https://cessna_skyhawk.qa.bluetail-dev.com/oauth_callback   | cessna_skyhawk            | ************************      |
| prod:       | https://cessna_skyhawk.prod.bluetail-dev.com/oauth_callback | cessna_skyhawk            | ************************      |

Also ...

| Environment | REACT_APP_OAUTH_SERVER            |
| ----------- | --------------------------------- |
| local       | http://localhost:3005             |
| qa:         | https://auth.qa.bluetail-dev.com  |
| prod:       | https://auth.bluetail.aero        |
