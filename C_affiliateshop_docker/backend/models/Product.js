const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  currency: { type: String, default: 'USD' },
  images: [String],
  affiliateLink: { type: String, required: true },
  source: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  featured: { type: Boolean, default: false }
});

module.exports = mongoose.model('Product', ProductSchema);
