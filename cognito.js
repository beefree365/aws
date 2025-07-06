import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

const REGION = "ap-southeast-1";
const IDENTITY_POOL_ID = "ap-southeast-1:104c8484-61d9-48dd-bbe1-e7c1678da892";

const client = new CognitoIdentityClient({ region: REGION });

const credentials = fromCognitoIdentityPool({
  client,
  identityPoolId: IDENTITY_POOL_ID,
});

async function getTemporaryCredentials() {
  const creds = await credentials();
  console.log("临时凭证:", creds);
  // 你可以用这些临时凭证来调用 AWS API，比如调用 API Gateway
}

getTemporaryCredentials();
