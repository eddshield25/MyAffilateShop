const Product = require('../models/Product');
const csv = require('csv-parse');
const fetch = require('node-fetch');

exports.createProduct = async (req, res) => {
  try {
    const p = new Product(req.body);
    const saved = await p.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { q, tag, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (q) filter.title = { $regex: q, $options: 'i' };
    if (tag) filter.tags = tag;
    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ featured: -1, createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.bulkFromCSVUrl = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'No url provided' });
    const r = await fetch(url);
    if (!r.ok) throw new Error('Failed to fetch CSV');
    const text = await r.text();
    csv.parse(text, { columns: true, trim: true }, async (err, records) => {
      if (err) return res.status(400).json({ error: err.message });
      const docs = records.map(rec => ({
        title: rec.title || 'Untitled',
        description: rec.description || '',
        price: rec.price ? parseFloat(rec.price) : undefined,
        currency: rec.currency || 'USD',
        images: rec.images ? rec.images.split('|').map(s => s.trim()) : [],
        affiliateLink: rec.affiliateLink || rec.link || '',
        source: rec.source || '',
        tags: rec.tags ? rec.tags.split(',').map(t => t.trim()) : []
      })).filter(d => d.affiliateLink);
      const inserted = await Product.insertMany(docs, { ordered: false }).catch(e => e);
      res.json({ imported: docs.length, result: inserted });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.bulkUploadCSVFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file' });
    const text = req.file.buffer.toString();
    csv.parse(text, { columns: true, trim: true }, async (err, records) => {
      if (err) return res.status(400).json({ error: err.message });
      const docs = records.map(rec => ({
        title: rec.title || 'Untitled',
        description: rec.description || '',
        price: rec.price ? parseFloat(rec.price) : undefined,
        currency: rec.currency || 'USD',
        images: rec.images ? rec.images.split('|').map(s => s.trim()) : [],
        affiliateLink: rec.affiliateLink || rec.link || '',
        source: rec.source || '',
        tags: rec.tags ? rec.tags.split(',').map(t => t.trim()) : []
      })).filter(d => d.affiliateLink);
      const inserted = await Product.insertMany(docs, { ordered: false }).catch(e => e);
      res.json({ imported: docs.length, result: inserted });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
