import "dotenv/config";
import { DynamoDBClient, DescribeTableCommand } from "@aws-sdk/client-dynamodb";

// 初始化 DynamoDB 客户端
const client = new DynamoDBClient({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// 创建 DescribeTable 命令
const checkStatus = async () => {
  const command = new DescribeTableCommand({ TableName: "Music" });
  const response = await client.send(command);
  console.log("📦 当前状态:", response.Table.TableStatus);
};

checkStatus();
