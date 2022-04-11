class VideoService {
  async getAll() {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/videos/all`
    );
    const result = await response.json();
    return result;
  }
  async updateView(videoId) {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/videos/update-view`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoId: videoId,
        }),
      }
    );
    const result = await response.json();
    return result;
  }
  async uploadComment(comment) {
    console.log('Log ~ uploadComment ~ comment', comment);
    const token = comment.token;
    delete comment.token;
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/videos/upload-comment`,
      {
        method: 'POST',
        headers: {
          Authorization: token,
        },
        body: JSON.stringify(comment),
      }
    );
    const result = await response.json();
    console.log('Log ~ uploadComment ~ result', result);
    return result;
  }
  async getCommentsByVideoId(videoId) {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/videos/get-comment`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoId: videoId,
        }),
      }
    );
    const result = await response.json();
    return result;
  }
}
export default new VideoService();
