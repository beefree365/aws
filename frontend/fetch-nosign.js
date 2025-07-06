import fetch from "node-fetch";

const API_HOST = "vutwpw3822.execute-api.ap-southeast-1.amazonaws.com";
const API_PATH = "/default/getPosts";

async function callApiGateway() {
  const url = `https://${API_HOST}${API_PATH}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        // 公开API，不需要签名和token，普通请求即可
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API 返回数据:", data);
  } catch (err) {
    console.error("调用 API 失败:", err);
  }
}

callApiGateway();
