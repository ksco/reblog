import { 
  USERNAME,
  REPONAME,
} from './config';

export const ISSUES_BASE_URL = `https://api.github.com/repos/${USERNAME}/${REPONAME}/issues`;

export const AUTHORIZE_URL = 'http://github.com/login/oauth/authorize';
export const ACCESS_URL = 'https://github-access-token-pdhnmrdjvs.now.sh/';