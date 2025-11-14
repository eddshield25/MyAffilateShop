const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const productRoutes = require('./routes/products');
const adminRoutes = require('./routes/admin');

app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

// serve static in combined/server mode if built client exists
const path = require('path');
if (process.env.COMBINED === '1') {
  const clientBuild = path.join(__dirname, 'client', 'dist');
  app.use(express.static(clientBuild));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuild, 'index.html'));
  });
}

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/affiliate_shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Mongo connected');
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}).catch(err => console.error(err));
