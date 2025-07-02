// src/config.ts
export const auth0Config = {
  domain: "YOUR_AUTH0_DOMAIN",
  clientId: "YOUR_AUTH0_CLIENT_ID",
  redirectUri: window.location.origin,
  audience: "YOUR_AUTH0_AUDIENCE",
  scope: "read:current_user update:current_user_metadata"
}; 