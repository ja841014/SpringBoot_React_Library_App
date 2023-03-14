import { profile } from "console";

export const oktaConfig = {
    clientId: '0oa8mb156h0fmdSEI5d7',
    //'https://<>/oauth2/default'
    issuer: 'https://dev-72302158.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    // OIDC scopes provide access information about a user such as name, phone, email
    // openid: required for authentication requests
    // profile: first name. last name , phone , etc.
    // email: user's email address
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,

}