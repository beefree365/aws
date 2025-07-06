import "dotenv/config";
import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";

// 初始化客户端（建议用环境变量管理密钥）
const client = new DynamoDBClient({
  region: "ap-southeast-1", // 新加坡区域
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// 创建表参数
const params = {
  TableName: "Music",
  AttributeDefinitions: [
    { AttributeName: "Artist", AttributeType: "S" },
    { AttributeName: "SongTitle", AttributeType: "S" }
  ],
  KeySchema: [
    { AttributeName: "Artist", KeyType: "HASH" }, // 分区键
    { AttributeName: "SongTitle", KeyType: "RANGE" } // 排序键
  ],
  BillingMode: "PAY_PER_REQUEST" // 按请求计费，适合免费额度
};

// 执行创建表命令
const run = async () => {
  try {
    const command = new CreateTableCommand(params);
    const response = await client.send(command);
    console.log("✅ 表创建成功:", response.TableDescription.TableStatus);
  } catch (err) {
    console.error("❌ 创建失败:", err);
  }
};

run();
