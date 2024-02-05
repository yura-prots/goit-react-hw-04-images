import axios from 'axios';

const API_KEY = '41545079-e9b3a4168a776ff0916b92321';
// const controller = new AbortController();
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const fetchImages = async (query, page, perPage) => {
  const response = await axios({
    url: `https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=${perPage}`,
    method: 'get',
    // signal: controller.signal,
    cancelToken: source.token,
  });

  // controller.abort();
  source.cancel();

  return response.data;
};

export default fetchImages;
