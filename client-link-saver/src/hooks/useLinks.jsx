import { useState, useEffect } from 'react';
import { fetchLinks, addLink as addLinkService } from '../services/linksService';

const useLinks = (getAccessTokenSilently, isAuthenticated) => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const loadLinks = async () => {
        setLoading(true);
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

  const addLink = async (linkData) => {
    try {
      const token = await getAccessTokenSilently();
      const newLink = await addLinkService(token, linkData);
      setLinks((prevLinks) => [...prevLinks, newLink]);
    } catch (err) {
      setError(err.message);
    }
  };

  return { links, loading, error, addLink };
};

export default useLinks;