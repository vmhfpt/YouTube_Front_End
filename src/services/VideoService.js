
const axios = require('axios');
class VideoService {
  async getAll() {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/videos/all`
    );
    const result = await response.json();
    return result;
  }
  async uploadComment(comment) {
    const token = comment.token;
    delete comment.token;
    const result = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/videos/upload-comment`,
      comment,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return result.data;
  }
  async getCommentsByVideoId(videoId) {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/videos/get-comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoId: videoId,
        }),
      }
    );
    const result = await response.json();
    return result;
  }
  async saveVideoToServe(data) {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/videos/upload`, {
      method: 'POST',
      body: data,
    });
    console.log('Log ~ response.json()', response.json());
  }
}
export default new VideoService();
