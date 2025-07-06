// aws-api.js

const API_URL = "https://vutwpw3822.execute-api.ap-southeast-1.amazonaws.com/default/getPosts";

/**
 * 获取博客文章列表
 * @returns {Promise<Object>} 返回API响应的JSON对象
 */
export async function fetchPosts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP错误，状态码：${response.status}`);
    }
    const data = await response.json();
    console.log("API 返回数据:", data);
    return data;
  } catch (error) {
    console.error("调用API失败:", error);
    throw error;
  }
}
