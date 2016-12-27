var mongoose = require('mongoose');
var Schema = mongoose.Schema;
console.log('categorySchema');

var childCategorySchema = new Schema({
    entityId: {
        type : Number, required : true, unique: true
        },
    parentId: {
        type : Number, required : false,
        },
    name: {
        type : String, required : false,
        },
    isActive: {
        type : Number, required : false,
        },
    image: {
        type : String, required : false,
        }
});

var categorySchema = new Schema({
    entityId: {
        type : Number, required : true, unique: true
        },
    parentId: {
        type : Number, required : false,
        },
    name: {
        type : String, required : false,
        },
    isActive: {
        type : Number, required : false,
        },
    image: {
        type : String, required : false,
        },
   children: [childCategorySchema],
});

module.exports = mongoose.model('category', categorySchema);
