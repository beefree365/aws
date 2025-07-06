import "dotenv/config";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "ap-southeast-1", // 根据你创建表时的区域调整
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const params = {
  TableName: "Posts",
  Limit: 10,
  ReturnConsumedCapacity: "TOTAL"
};

const run = async () => {
  const command = new ScanCommand(params);
  const response = await client.send(command);
  console.log("📦 数据项:", response.Items);
  console.log("📊 读取流量消耗:", response.ConsumedCapacity?.CapacityUnits);
};

run();
