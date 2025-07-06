window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  if (!postId) {
    document.getElementById('dynamic-post-title').innerText = '未指定文章ID';
    document.getElementById('dynamic-post-content').innerText = '';
    return;
  }

  try {
    const response = await fetch(`https://vutwpw3822.execute-api.ap-southeast-1.amazonaws.com/default/getPosts?id=${postId}`);
    if (!response.ok) throw new Error(`HTTP 错误: ${response.status}`);

    const data = await response.json();

    console.log("API 返回数据:", data);

    const post = data[0];

    if (!post || !post.PostId) {
      document.getElementById('dynamic-post-title').innerText = '未找到文章';
      document.getElementById('dynamic-post-content').innerText = '';
      return;
    }

    document.getElementById('dynamic-post-title').innerText = post.Title;
    document.getElementById('dynamic-post-content').innerHTML = post.Content;

    // document.getElementById('top-title').innerHTML = post.Title;

    // 同时修改页面标题
    document.title = post.Title;

  } catch (err) {
    document.getElementById('dynamic-post-title').innerText = '加载失败';
    document.getElementById('dynamic-post-content').innerText = err.message;
  }
};
