import { USERNAME } from './config';

export const ISSUES_BASE_URL = `https://api.github.com/repos/${USERNAME}/${USERNAME}.github.io/issues`;

export const AUTHORIZE_URL = 'http://github.com/login/oauth/authorize';
export const ACCESS_URL = 'https://github.com/login/oauth/access_token';

export const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com';