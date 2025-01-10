import axios from 'axios';

const API_BASE_URL = 'https://website-saver.onrender.com';

export const fetchLinks = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/api/links`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addLink = async (token, linkData) => {
  const response = await axios.post(`${API_BASE_URL}/api/links`, linkData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};



/*
export const updateLink = async (token, linkId, linkData) => {
  const response = await axios.put(`${API_BASE_URL}/links/${linkId}`, linkData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteLink = async (token, linkId) => {
  const response = await axios.delete(`${API_BASE_URL}/links/${linkId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
*/