import "dotenv/config";
import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const params = {
  TableName: "Posts",
  AttributeDefinitions: [
    { AttributeName: "PostId", AttributeType: "S" },
    { AttributeName: "CreatedAt", AttributeType: "N" }
  ],
  KeySchema: [
    { AttributeName: "PostId", KeyType: "HASH" },      // 分区键
    { AttributeName: "CreatedAt", KeyType: "RANGE" }   // 排序键
  ],
  BillingMode: "PAY_PER_REQUEST"
};

const run = async () => {
  try {
    const command = new CreateTableCommand(params);
    const response = await client.send(command);
    console.log("✅ Posts 表创建成功:", response.TableDescription.TableStatus);
  } catch (err) {
    console.error("❌ 创建失败:", err);
  }
};

run();

