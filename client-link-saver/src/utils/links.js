import axios from 'axios';

export const fetchLinks = async (token) => {
  const { data } = await axios.get('https://website-saver.onrender.com/api/links', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const createLink = async (token, newLink) => {
  const { data } = await axios.post(
    'https://website-saver.onrender.com/api/links',
    newLink,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};