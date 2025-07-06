import "dotenv/config";
import { DynamoDBClient, BatchWriteItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// 构造 20 条样本数据
const items = Array.from({ length: 20 }, (_, i) => ({
  PutRequest: {
    Item: {
      Artist: { S: `Artist_${i + 1}` },
      SongTitle: { S: `Song_${i + 1}` },
      Year: { N: `${2000 + i}` },
      Genre: { S: i % 2 === 0 ? "Pop" : "Rock" }
    }
  }
}));

const params = {
  RequestItems: {
    Music: items
  }
};

const run = async () => {
  try {
    const command = new BatchWriteItemCommand(params);
    const response = await client.send(command);
    if (response.UnprocessedItems && Object.keys(response.UnprocessedItems).length > 0) {
      console.warn("⚠️ 有未处理的项:", response.UnprocessedItems);
    } else {
      console.log("✅ 成功插入 20 条数据！");
    }
  } catch (err) {
    console.error("❌ 插入失败:", err);
  }
};

run();
