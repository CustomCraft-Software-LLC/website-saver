const { db } = require('../models');

const sendResponse = (res, status, data, error = null) => {
  console.log(`[sendResponse] Status: ${status}, Data: ${data ? JSON.stringify(data) : 'None'}, Error: ${error}`);
  res.status(status).json(error ? { error } : data);
};

const getLinks = async (req, res) => {
  console.log('[getLinks] Request received');
  
  let userId = null;

  if (req.auth?.payload?.sub) {
    const subParts = req.auth.payload.sub.split('|');
    if (subParts.length > 1) {
      userId = subParts[1];
    } else {
      console.warn('[getLinks] Invalid sub format: Missing userId');
    }
  } else {
    console.warn('[getLinks] Missing sub field in JWT');
  }

  if (!userId) {
    return sendResponse(res, 401, null, 'Unauthorized');
  }

  try {
    console.log('[getLinks] userId: ' + userId);
    const links = await db.Link.findAll({ where: { userId } });
    sendResponse(res, 200, links);
  } catch (error) {
    sendResponse(res, 500, null, 'Failed to fetch links');
  }
};

const createLink = async (req, res) => {
  let userId = null;

  if (req.auth?.payload?.sub) {
    const subParts = req.auth.payload.sub.split('|');
    if (subParts.length > 1) {
      userId = subParts[1];
    } else {
      console.warn('[createLink] Invalid sub format: Missing userId');
    }
  } else {
    console.warn('[createLink] Missing sub field in JWT');
  }

  const { title, url } = req.body;

  if (!userId) {
    return sendResponse(res, 401, null, 'Unauthorized');
  }

  if (!title || !url) {
    return sendResponse(res, 400, null, 'Title and URL are required');
  }

  try {
    const link = await db.Link.create({ title, url, userId });
    sendResponse(res, 201, link);
  } catch (error) {
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