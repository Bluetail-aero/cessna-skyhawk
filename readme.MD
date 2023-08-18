# WTF is this?

The Cessna Skyhawk 🛩️ is a simple plane, a humble plane, a workhouse that is the backbone of pilot training.  Likewise, the Bluetail cessna-skyhawk project is a demonstration app showing how to consume the Bluetial public API and Oauth service.

There are lot of moving parts in this solution and it's difficult to test each part in isolation.  This application is a basic little test harness that we can use to develop, debug and diagnose issues with those systems in all the different environments.


## How do we access this app?

| Environment | URL                                                        |
| ----------- | ---------------------------------------------------------- |
| local       | http://localhost:3006                                      |
| qa          | https://cessna-skyhawk.qa.bluetail-dev.com                 |
| prod        | https://cessna-skyhawk.prod.bluetail-dev.com (not a typo!) |


## How does it work? What does it do?

Cessna-skyhawk is a React app that relies on browser localstorage for persisting state. It doesn't have a "backend" other than the API and auth server it is demonstrating.

Using only local storage: if a user is authenticated then it will store their API token in local browser storage.
If there is no token, they aren't logged in, so it will just show a login button.

| Environment | URL                                                        |
| ----------- | ---------------------------------------------------------- |
| local       | http://localhost:3005/oauth/authenticate?response_type=code&client_id=cessna_skyhawk&redirect_uri=http://localhost:3006/oauth_callback |
| qa          | https://auth.qa.bluetail-dev.com/oauth/authenticate?response_type=code&client_id=cessna_skyhawk&redirect_uri=https://cessna-skyhawk.qa.bluetail-dev.com/oauth_callback |
| prod        | https://auth.bluetail.aero/oauth/authenticate?response_type=code&client_id=cessna_skyhawk&redirect_uri=https://cessna-skyhawk.prod.bluetail-dev.com/oauth_callback |

The user authenticates on the relevenat auth server and is redirected back to the app with an authCode.
The appthnuses the authCode and their client_secret to convert that into a more useful access_token and a refresh_token (which is stores in loca storage).

The app provides two (crude) functions available for the user to perform:

- Upload a document to a folder.
- Logout (purge local storage)

TADA! 🎉




# Running the app locally

To run this app locally ("full stack") you will want to also run these dependencies:
- Auth Server
- Public API
- Bluetail Backend

### Example local env

```
NODE_ENV=development
PORT=3006
REACT_APP_OAUTH_CLIENT_ID=cessna_skyhawk
REACT_APP_OAUTH_REDIRECT_URL=http://localhost:3006/oauth_callback
REACT_APP_OAUTH_SERVER=http://localhost:3005
REACT_APP_PUBLIC_API=http://localhost:3004
```

```
npm i
npm run start:local
```
