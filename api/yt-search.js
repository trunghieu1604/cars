const ytSearch = require('yt-search');

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const q = req.query.q || req.query.query;
  if (!q || !q.trim()) {
    return res.status(400).json({ error: 'Missing query parameter q' });
  }

  try {
    const results = await ytSearch(q.trim());
    const videos = (results.videos || []).slice(0, 25).map((v) => ({
      videoId: v.videoId,
      title: v.title,
      thumbnail: v.thumbnail || `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`,
      author: v.author ? v.author.name : '',
      duration: v.timestamp || '',
      views: v.views || 0,
      ago: v.ago || ''
    }));

    res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    return res.status(200).json({ videos });
  } catch (err) {
    console.error('yt-search error:', err);
    return res.status(500).json({ error: err.message || 'Search failed' });
  }
};

