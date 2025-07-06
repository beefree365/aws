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
  TableName: "Comments",
  AttributeDefinitions: [
    { AttributeName: "PostId", AttributeType: "S" },
    { AttributeName: "CommentId", AttributeType: "S" }
  ],
  KeySchema: [
    { AttributeName: "PostId", KeyType: "HASH" },      // 分区键：文章 ID
    { AttributeName: "CommentId", KeyType: "RANGE" }   // 排序键：评论 ID
  ],
  BillingMode: "PAY_PER_REQUEST"
};

const run = async () => {
  const command = new CreateTableCommand(params);
  const response = await client.send(command);
  console.log("✅ 评论表创建成功:", response.TableDescription.TableStatus);
};

run();
