import db from '../config/db.js';

export const findByShortCode = async (shortCode) => {
  const [rows] = await db.execute('SELECT * FROM urls WHERE short_code = ?', [shortCode]);
  return rows[0];
};

export const createUrl = async (url, shortCode, now) => {
  const [result] = await db.execute(
    'INSERT INTO urls (url, short_code, created_at, updated_at) VALUES (?, ?, ?, ?)',
    [url, shortCode, now, now]
  );
  return { id: result.insertId, url, shortCode, createdAt: now, updatedAt: now };
};

export const updateUrl = async (shortCode, newUrl, now) => {
  await db.execute(
    'UPDATE urls SET url = ?, updated_at = ? WHERE short_code = ?',
    [newUrl, now, shortCode]
  );
};

export const deleteUrl = async (shortCode) => {
  const [result] = await db.execute('DELETE FROM urls WHERE short_code = ?', [shortCode]);
  return result.affectedRows > 0;
};

export const incrementAccessCount = async (shortCode) => {
  await db.execute('UPDATE urls SET access_count = access_count + 1 WHERE short_code = ?', [shortCode]);
};

export const getStats = async (shortCode) => {
  const [rows] = await db.execute('SELECT * FROM urls WHERE short_code = ?', [shortCode]);
  return rows[0];
};
