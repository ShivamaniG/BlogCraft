const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const fileUpload = require('express-fileupload');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload());

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes); // Ensure this path is correct

app.use(notFound);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server started on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.error('Connection error:', error);
  });
