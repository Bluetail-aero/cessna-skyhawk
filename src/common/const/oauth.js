export const redirectUrl = `
  ${process.env.REACT_APP_OAUTH_SERVER}/oauth/authenticate?
  response_type=code
  &client_id=${process.env.REACT_APP_OAUTH_CLIENT_ID}
  &redirect_uri=${process.env.REACT_APP_OAUTH_REDIRECT_URL}
  &state=none`;
