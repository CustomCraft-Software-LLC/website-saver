import { useState, useEffect } from 'react';
import { fetchLinks, createLink } from '../api/links';

const useLinks = (getAccessTokenSilently, isAuthenticated) => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const loadLinks = async () => {
        try {
          const token = await getAccessTokenSilently();
          const data = await fetchLinks(token);
          setLinks(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      loadLinks();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  const addLink = async (newLink) => {
    try {
      const token = await getAccessTokenSilently();
      const createdLink = await createLink(token, newLink);
      setLinks((prev) => [...prev, createdLink]);
    } catch (err) {
      setError(err.message);
    }
  };

  return { links, addLink, loading, error };
};

export default useLinks;