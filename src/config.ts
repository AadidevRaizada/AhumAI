// Auth0 Configuration
export const auth0Config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN || '',
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || '',
  redirectUri: window.location.origin,
  audience: import.meta.env.VITE_AUTH0_AUDIENCE || '',
  scope: 'openid profile email',
};

// API Endpoints
export const apiEndpoints = {
  base: 'https://api.ahumai.co.in',
  login: '/auth/login',
  logout: '/auth/logout',
  profile: '/user/profile',
};

// Other Site Configuration
export const siteConfig = {
  name: 'AhumAI',
  domain: 'ahumai.co.in',
  defaultTitle: 'AhumAI - Leading AI Solutions & Digital Transformation Services',
  defaultDescription: 'AhumAI specializes in AI-powered solutions, SaaS platforms, and digital transformation services that drive business innovation and growth.',
  social: {
    twitter: 'https://twitter.com/ahumai',
    linkedin: 'https://www.linkedin.com/company/ahumai',
    github: 'https://github.com/ahumai',
  },
}; 