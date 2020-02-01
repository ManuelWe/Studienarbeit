import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cdn.contentful.com/spaces/kfibk3xh1vwb',
  headers: {
    Authorization: 'Bearer xR0IGjSg9X8mdMdoBtSoaSfaUGg209VwAYhVlv6xGMo',
  },
});

const functions = {
  getProducts() {
    return api.get('entries?content_type=produkt');
  },
};

export default functions;
