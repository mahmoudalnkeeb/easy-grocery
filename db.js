const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const dbURI = process.env.DB_URI || 'mongodb://127.0.0.1:27017/groceryList';

mongoose
  .connect(dbURI)
  .then((v) => console.log(`Mongoose connected to > ${v.connection.name}`))
  .catch((e) => {
    console.error(`Mongoose failed to connect to ${dbURI}`, e);
    process.exit(1);
  });

 const List = mongoose.model(
  'List',
  new mongoose.Schema(
    {
      ID: {
        type: String,
        unique: true,
        required: true,
        default: () => nanoid(8),
      },
      essentials: {
        type: [String],
        required: true,
        default: [],
      },
      less_essentials: {
        type: [String],
        required: true,
        default: [],
      },
      non_essentials: {
        type: [String],
        required: true,
        default: [],
      },
    },
    { timestamps: true }
  )
);

module.exports = List
