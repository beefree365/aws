import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { HttpRequest } from "@aws-sdk/protocol-http";
import fetch from "node-fetch";
import { Sha256 } from "@aws-crypto/sha256-js"; // ✅ 添加这一行

const REGION = "ap-southeast-1";
const IDENTITY_POOL_ID = "ap-southeast-1:104c8484-61d9-48dd-bbe1-e7c1678da892";
const API_HOST = "ya9eq9jp5a.execute-api.ap-southeast-1.amazonaws.com";
const API_PATH = "/default/getPostsSign";

async function callApiGateway() {
  const cognitoClient = new CognitoIdentityClient({ region: REGION });
  const credentialsProvider = fromCognitoIdentityPool({
    client: cognitoClient,
    identityPoolId: IDENTITY_POOL_ID,
  });

  const tempCredentials = await credentialsProvider();

  const request = new HttpRequest({
    protocol: "https:",
    hostname: API_HOST,
    method: "GET",
    path: API_PATH,
    headers: {
      host: API_HOST,
    },
  });

  const signer = new SignatureV4({
    credentials: {
      accessKeyId: tempCredentials.accessKeyId,
      secretAccessKey: tempCredentials.secretAccessKey,
      sessionToken: tempCredentials.sessionToken,
    },
    service: "execute-api",
    region: REGION,
    sha256: Sha256, // ✅ 显式指定 sha256 实现
  });

  const signedRequest = await signer.sign(request);

  const response = await fetch(`https://${API_HOST}${API_PATH}`, {
    method: request.method,
    headers: signedRequest.headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("API 返回数据:", data);
}

callApiGateway().catch((err) => {
  console.error("调用 API 失败:", err);
});
