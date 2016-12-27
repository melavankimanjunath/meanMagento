var mongoose = require('mongoose');
var Schema = mongoose.Schema;


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
module.exports = mongoose.model('childCategory', childCategorySchema);
