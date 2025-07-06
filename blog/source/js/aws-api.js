async function fetchPosts() {
  const url = "https://vutwpw3822.execute-api.ap-southeast-1.amazonaws.com/default/getPosts";
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP 错误：${res.status}`);
    const data = await res.json();
    console.log("获取到的文章：", data);

    // data 是数组，直接遍历
    data.forEach(post => {
      const div = document.createElement('div');
      // 假设 PostId 就是 slug，或者你有方法转换为slug
      // 链接改成 Hexo 默认文章路径：/post/<slug>/
      div.innerHTML = `<h3><a href="/post.html?id=${post.PostId}">${post.Title}</a></h3><p>${post.Content}</p>`;
      document.getElementById('aws-posts-container').appendChild(div);
    });

  } catch (err) {
    console.error("调用API失败：", err);
  }
}

window.onload = () => {
  fetchPosts();
};
