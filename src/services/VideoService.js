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
}
export default new VideoService();
