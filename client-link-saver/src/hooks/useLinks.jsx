import { useState, useEffect, useCallback } from 'react';
import { fetchLinks, addLink as addLinkService } from '../services/linksService';

const useLinks = (getAccessTokenSilently, isAuthenticated) => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadLinks = useCallback(async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(null);

    try {
      const token = await getAccessTokenSilently();
      const data = await fetchLinks(token);
      setLinks(data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  const addLink = useCallback(
    async (linkData) => {
      setError(null);

      try {
        const token = await getAccessTokenSilently();
        const newLink = await addLinkService(token, linkData);
        setLinks((prevLinks) => [...prevLinks, newLink]);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      }
    },
    [getAccessTokenSilently]
  );

  useEffect(() => {
    loadLinks();
  }, [loadLinks]);

  return { links, loading, error, addLink, loadLinks };
};

export default useLinks;