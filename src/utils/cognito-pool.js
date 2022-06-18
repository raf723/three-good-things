import {CognitoUserPool} from 'amazon-cognito-identity-js';

import {USER_POOL_ID, CLIENT_ID} from '../../env-vars';

const poolData = {
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID,
};

export const cognitoPool = new CognitoUserPool(poolData);
