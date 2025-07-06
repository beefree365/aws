import "dotenv/config";
import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { BatchWriteItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const items = Array.from({ length: 10 }, (_, i) => ({
  PutRequest: {
    Item: {
      PostId: { S: `post_${i + 1}` },
      CreatedAt: { N: `${Date.now() - i * 100000}` },
      Title: { S: `博客标题 ${i + 1}` },
      Content: { S: `这是第 ${i + 1} 篇博客的内容，欢迎阅读！` },
      Tags: { SS: ["技术", "生活", i % 2 === 0 ? "JavaScript" : "AWS"] }
    }
  }
}));

const insertPosts = async () => {
  const command = new BatchWriteItemCommand({
    RequestItems: {
      Posts: items
    }
  });

  try {
    const response = await client.send(command);
    console.log("✅ 成功插入样本数据！");
    if (response.UnprocessedItems?.Posts?.length) {
      console.warn("⚠️ 有未处理项:", response.UnprocessedItems.Posts);
    }
  } catch (err) {
    console.error("❌ 插入失败:", err);
  }
};

insertPosts();
