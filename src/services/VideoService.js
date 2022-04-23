const axios = require("axios");
class VideoService {
  async getAll() {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/videos/all`
    );
    const result = await response.json();
    return result;
  }
  async getAllCategories() {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/videos/categories`
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
  async getCommentsAndSuggestionVideoBy(videoId, categoryId) {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/videos/get-comment-and-suggestion-videos`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoId: videoId,
          categoryId: categoryId,
        }),
      }
    );
    const result = await response.json();
    return result;
  }
  async saveVideoToServe(data) {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/videos/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    console.log("Log ~ response.json()", response.json());
  }
}
export default new VideoService();
