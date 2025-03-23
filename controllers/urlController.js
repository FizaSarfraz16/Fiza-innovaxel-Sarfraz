import {
  createUrl,
  findByShortCode,
  updateUrl,
  deleteUrl,
  incrementAccessCount,
  getStats
} from '../models/urlModel.js';

import generateShortCode from '../utils/generateshortcode.js';

export const createShortUrl = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });
  try {
    new URL(url);
    let shortCode;
    let exists;
    do {
      shortCode = generateShortCode();
      exists = await findByShortCode(shortCode);
    } while (exists);

    const now = new Date();
    const data = await createUrl(url, shortCode, now);
    res.status(201).json({ ...data, accessCount: 0 });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

export const getUrl = async (req, res) => {
  const data = await findByShortCode(req.params.shortCode);
  if (!data) return res.status(404).json({ error: 'Not found' });
  res.status(200).json(data);
};

export const updateShortUrl = async (req, res) => {
  const { shortCode } = req.params;
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });
  try {
    new URL(url);
    const data = await findByShortCode(shortCode);
    if (!data) return res.status(404).json({ error: 'Not found' });
    const now = new Date();
    await updateUrl(shortCode, url, now);
    res.status(200).json({ ...data, url, updatedAt: now });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteShortUrl = async (req, res) => {
  const success = await deleteUrl(req.params.shortCode);
  if (!success) return res.status(404).json({ error: 'Not found' });
  res.sendStatus(204);
};

export const getUrlStats = async (req, res) => {
  const data = await getStats(req.params.shortCode);
  if (!data) return res.status(404).json({ error: 'Not found' });
  res.status(200).json(data);
};

export const redirectToOriginal = async (req, res) => {
  const data = await findByShortCode(req.params.shortCode);
  if (!data) return res.status(404).send('Not found');
  await incrementAccessCount(req.params.shortCode);
  res.redirect(data.url);
};