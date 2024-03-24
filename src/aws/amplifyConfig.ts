const AWS_USER_POOLS_ID = process.env.AWS_USER_POOLS_ID;
const AWS_USER_POOLS_WEB_CLIENT_ID = process.env.AWS_USER_POOLS_WEB_CLIENT_ID;

export const amplifyConfig = {
  aws_project_region: 'us-east-1',
  aws_cognito_region: 'us-east-1',
  aws_user_pools_id: `${AWS_USER_POOLS_ID}`,
  aws_user_pools_web_client_id: `${AWS_USER_POOLS_WEB_CLIENT_ID}`,
  login_mechanisms: ['email'],
  oauth: {},
};
