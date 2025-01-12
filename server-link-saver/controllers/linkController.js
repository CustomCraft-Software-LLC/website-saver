const { db } = require('../models');

const sendResponse = (res, status, data, error = null) => {
  console.log(`[sendResponse] Status: ${status}, Data: ${data ? JSON.stringify(data) : 'None'}, Error: ${error}`);
  res.status(status).json(error ? { error } : data);
};

const getLinks = async (req, res) => {
  console.log('[getLinks] Request received');
  
  let userId = null;
  
  if (req.auth?.sub) {
    const subParts = req.auth.sub.split('|');
    if (subParts.length > 1) {
      userId = subParts[1];
    } else {
      console.warn('[getLinks] Invalid sub format: Missing userId');
    }
  } else {
    console.warn('[getLinks] Missing sub field in JWT');
  }

  console.log('[getLinks] Decoded JWT:', req.auth?.sub);

  if (!userId) {
    console.warn('[getLinks] Unauthorized request: Missing userId in JWT');
    return sendResponse(res, 401, null, 'Unauthorized');
  }

  try {
    console.log('[getLinks] Fetching links for userId:', userId);
    const links = await db.Link.findAll({ where: { userId } });
    console.log(`[getLinks] Found ${links.length} links for userId: ${userId}`);
    sendResponse(res, 200, links);
  } catch (error) {
    console.error('[getLinks] Error fetching links:', error.message);
    sendResponse(res, 500, null, 'Failed to fetch links');
  }
};

const createLink = async (req, res) => {
  console.log('[createLink] Request received');
  
  let userId = null;

  if (req.auth?.sub) {
    const subParts = req.auth.sub.split('|');
    if (subParts.length > 1) {
      userId = subParts[1];
    } else {
      console.warn('[createLink] Invalid sub format: Missing userId');
    }
  } else {
    console.warn('[createLink] Missing sub field in JWT');
  }

  const { title, url } = req.body;

  console.log('[createLink] Decoded JWT:', req.auth);
  console.log('[createLink] Request body:', req.body);

  if (!userId) {
    console.warn('[createLink] Unauthorized request: Missing userId in JWT');
    return sendResponse(res, 401, null, 'Unauthorized');
  }

  if (!title || !url) {
    console.warn('[createLink] Invalid request: Missing title or URL');
    return sendResponse(res, 400, null, 'Title and URL are required');
  }

  try {
    console.log('[createLink] Creating new link for userId:', userId);
    const link = await db.Link.create({ title, url, userId });
    console.log(`[createLink] Link created: ${JSON.stringify(link)}`);
    sendResponse(res, 201, link);
  } catch (error) {
    console.error('[createLink] Error creating link:', error.message);
    sendResponse(res, 500, null, 'Failed to create link');
  }
};

/*
const deleteLinks = async (req, res) => {
  const userId = req.user?.sub;
  const { id } = req.body;

  if (!userId) {
    return sendResponse(res, 401, null, 'Unauthorized');
  }

  if (!id) {
    return sendResponse(res, 400, null, 'Link ID is required');
  }

  try {
    const result = await db.Link.destroy({ where: { id, userId } });
    if (result) {
      sendResponse(res, 200, { message: 'Link deleted successfully' });
    } else {
      sendResponse(res, 404, null, 'Link not found');
    }
  } catch (error) {
    sendResponse(res, 500, null, 'Failed to delete link');
  }
};

const updateLink = async (req, res) => {
  const userId = req.user?.sub;
  const { id, title, url } = req.body;

  if (!userId) {
    return sendResponse(res, 401, null, 'Unauthorized');
  }

  if (!id || !title || !url) {
    return sendResponse(res, 400, null, 'ID, Title, and URL are required');
  }

  try {
    const [updated] = await db.Link.update(
      { title, url },
      { where: { id, userId } }
    );

    if (updated) {
      const updatedLink = await db.Link.findOne({ where: { id, userId } });
      sendResponse(res, 200, updatedLink);
    } else {
      sendResponse(res, 404, null, 'Link not found');
    }
  } catch (error) {
    sendResponse(res, 500, null, 'Failed to update link');
  }
};
*/

module.exports = { getLinks, createLink };