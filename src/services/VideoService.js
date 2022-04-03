class VideoService {
  async getAll() {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/videos/all`
    );
    const result = await response.json();
    return result;
  }
  async updateView() {}
}
export default new VideoService();
