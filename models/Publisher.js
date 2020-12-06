export {Schema, model, Types} from 'mongoose'

const schema = new Schema({
    year: {type: Number, required: true},
    name: {type:String, required: true},
    publisherId: {type:String, required: true, unique:true},
    books: [{type: Types.ObjectId, ref: 'Book'}]
});

module.exports = model('Publisher', schema);
