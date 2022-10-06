const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BookSchema = new Schema({
    name: {type: String, required: true},
    publish:{type: String},
    genres: {type: [String]},
    author: {type: mongoose.Schema.Types.ObjectId, ref : "Author"},
});

let AuthorSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number},
    books : [{type: mongoose.Schema.Types.ObjectId, ref : "Book"},], // liên kết
});

let Book  = mongoose.model('Book', BookSchema);
let Author  = mongoose.model('Author', AuthorSchema);

// Export the model
module.exports = {Book,Author};