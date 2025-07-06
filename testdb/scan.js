import "dotenv/config";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const params = {
  TableName: "Music",
  Limit: 10 // 最多返回 10 条记录
};

const run = async () => {
  const command = new ScanCommand(params);
  const response = await client.send(command);
  console.log("📦 获取到的数据:", response.Items);
};

run();


