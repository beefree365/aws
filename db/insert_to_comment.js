import { BatchWriteItemCommand } from "@aws-sdk/client-dynamodb";
import "dotenv/config";
import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

console.log("process.env.AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID);

const comments = Array.from({ length: 5 }, (_, i) => ({
  PutRequest: {
    Item: {
      PostId: { S: "post_1" },
      CommentId: { S: `comment_${Date.now() + i}` },
      Author: { S: `User_${i + 1}` },
      Content: { S: `这是第 ${i + 1} 条评论，欢迎交流！` },
      CreatedAt: { N: `${Date.now() + i}` }
    }
  }
}));

const insertComments = async () => {
  const command = new BatchWriteItemCommand({
    RequestItems: {
      Comments: comments
    }
  });

  const response = await client.send(command);
  console.log("✅ 成功插入评论数据！");
  if (response.UnprocessedItems?.Comments?.length) {
    console.warn("⚠️ 有未处理项:", response.UnprocessedItems.Comments);
  }
};

insertComments();
