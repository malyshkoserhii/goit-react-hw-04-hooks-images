import axios from 'axios';

const key = '18518367-60788b25c9bdd8e2c754a390a';
axios.defaults.baseURL = 'https://pixabay.com/api/';

async function fetchImages({ searchQuery = '', currentPage = 1 }) {
  try {
    const { data } = await axios.get(
      `?q=${searchQuery}&page=${currentPage}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`,
    );

    return data.hits;
  } catch (error) {
    if (error) {
      return [];
    }
    throw error;
  }
}

export default fetchImages;
