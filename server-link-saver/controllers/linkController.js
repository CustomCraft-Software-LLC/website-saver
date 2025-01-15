const { Link } = require('../models');

const sendResponse = (res, status, data, error = null) => {
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
  let userId = extractUserId(req);

  if (!userId) {
    return sendResponse(res, 401, null, 'Unauthorized');
  }

  try {
    const links = await Link.findAll({ where: { userId } });
    sendResponse(res, 200, links);
  } catch (error) {
    sendResponse(res, 500, null, 'Failed to fetch links');
  }
};

const createLink = async (req, res) => {
  let userId = extractUserId(req);

  if (!userId) {
    return sendResponse(res, 401, null, 'Unauthorized');
  }

  const { title, url } = req.body;

  if (!title || !url) {
    return sendResponse(res, 400, null, 'Title and URL are required');
  }

  try {
    const newLink = await Link.create({ title, url, userId });
    sendResponse(res, 201, newLink);
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
    const result = await .Link.destroy({ where: { id, userId } });
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
    const [updated] = await .Link.update(
      { title, url },
      { where: { id, userId } }
    );

    if (updated) {
      const updatedLink = await .Link.findOne({ where: { id, userId } });
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