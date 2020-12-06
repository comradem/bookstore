const {Schema, model} =  require('mongoose');

const schema = new Schema({
    title: {type:String, required: true},
    subtitle: {type:String, required: false},
    isbn13: {type:String, required: true, unique: true},
    price: {type:String, required: true},
    image: {type:String, required: true},
    url: {type:String, required:false},
    searchKeywords: {type:String, required: true}
});

module.exports = model('Book', schema);
