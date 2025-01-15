const { Link } = require('../models');

const sendResponse = (res, status, data = null, error = null) => {
  res.status(status).json(error ? { error } : data);
};

const extractUserId = (req) => {
  if (req.auth?.payload?.sub) {
    const subParts = req.auth.payload.sub.split('|');
    if (subParts.length > 1) {
      return subParts[1];
    }
  }
  return null;
};

const getLinks = async (req, res) => {
  const userId = extractUserId(req);

  if (!userId) {
    console.log('[getLinks] [ERROR] User ID extraction failed. Unauthorized access attempt');
    return sendResponse(res, 401, null, 'Unauthorized');
  }

  try {
    const links = await Link.findAll({ where: { userId } });
    console.log(`[getLinks] [INFO] UserId: ${userId} - Fetched ${links.length} links`);
    sendResponse(res, 200, links);
  } catch (error) {
    console.error(`[getLinks] [ERROR] UserId: ${userId} - Failed to fetch links: ${error.message}`);
    sendResponse(res, 500, null, 'Failed to fetch links');
  }
};

const createLink = async (req, res) => {
  const userId = extractUserId(req);

  if (!userId) {
    console.log('[createLink] [ERROR] User ID extraction failed. Unauthorized access attempt');
    return sendResponse(res, 401, null, 'Unauthorized');
  }

  const { title, url } = req.body;

  if (!title || !url) {
    console.log(`[createLink] [ERROR] UserId: ${userId} - Missing Title or URL in the request`);
    return sendResponse(res, 400, null, 'Title and URL are required');
  }

  try {
    const newLink = await Link.create({ title, url, userId });
    console.log(`[createLink] [INFO] UserId: ${userId} - Created new link: ${newLink.title} (ID: ${newLink.id})`);
    sendResponse(res, 201, newLink);
  } catch (error) {
    console.error(`[createLink] [ERROR] UserId: ${userId} - Failed to create link: ${error.message}`);
    sendResponse(res, 500, null, 'Failed to create link');
  }
};

const deleteLink = async (req, res) => {
  const userId = extractUserId(req);
  const { id } = req.params;

  if (!userId) {
    console.log('[deleteLink] [ERROR] User ID extraction failed. Unauthorized access attempt');
    return sendResponse(res, 401, null, 'Unauthorized');
  }

  try {
    const result = await Link.destroy({ where: { id, userId } });
    if (result) {
      console.log(`[deleteLink] [INFO] UserId: ${userId} - Link deleted successfully. LinkId: ${id}`);
      sendResponse(res, 200, { message: 'Link deleted successfully' });
    } else {
      console.log(`[deleteLink] [INFO] UserId: ${userId} - Link not found. LinkId: ${id}`);
      sendResponse(res, 404, null, 'Link not found');
    }
  } catch (error) {
    console.error(`[deleteLink] [ERROR] UserId: ${userId} - Failed to delete link. LinkId: ${id}: ${error.message}`);
    sendResponse(res, 500, null, 'Failed to delete link');
  }
};

const updateLink = async (req, res) => {
  const userId = extractUserId(req);
  const { id } = req.params;
  const { title, url } = req.body;

  if (!userId) {
    console.log('[updateLink] [ERROR] User ID extraction failed. Unauthorized access attempt');
    return sendResponse(res, 401, null, 'Unauthorized');
  }

  if (!id || !title || !url) {
    console.log(`[updateLink] [ERROR] UserId: ${userId} - Missing ID, Title, or URL in the request`);
    return sendResponse(res, 400, null, 'ID, Title, and URL are required');
  }

  try {
    const [updated] = await Link.update({ title, url }, { where: { id, userId } });

    if (updated) {
      const updatedLink = await Link.findOne({ where: { id, userId } });
      console.log(`[updateLink] [INFO] UserId: ${userId} - Link updated successfully. LinkId: ${id} - New Title: ${updatedLink.title}`);
      sendResponse(res, 200, updatedLink);
    } else {
      console.log(`[updateLink] [INFO] UserId: ${userId} - Link not found. LinkId: ${id}`);
      sendResponse(res, 404, null, 'Link not found');
    }
  } catch (error) {
    console.error(`[updateLink] [ERROR] UserId: ${userId} - Failed to update link. LinkId: ${id}: ${error.message}`);
    sendResponse(res, 500, null, 'Failed to update link');
  }
};

module.exports = { getLinks, createLink, deleteLink, updateLink };