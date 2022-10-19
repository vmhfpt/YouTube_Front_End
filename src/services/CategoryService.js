const axios = require("axios");
class CategoryService {
  async getAll() {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/categories`
    );
    const result = await response.json();
    return result;
  }
  
}
export default new CategoryService();
