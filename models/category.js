var mongoose = require('mongoose');
var Schema = mongoose.Schema;
console.log('categorySchema');
var childSchema = new Schema({
    entityId: {
        type : Number, required : true,
        },
    attributeSetId: {
        type : Number, required : false,
        },
    parentId: {
        type : Number, required : false,
        },
    path: {
        type : String, required : false,
        },
    position: {
        type : Number, required : false,
        },
    level: {
        type : Number, required : false,
        },
    childrenCount: {
        type : Number, required : false,
        },
    name: {
        type : String, required : false,
        },
    urlKey: {
        type : String, required : false,
        },
    urlPath: {
        type : String, required : false,
        },
    isActive: {
        type : Number, required : false,
        },
    isAnchor: {
        type : Number, required : false,
        },
    includeInMenu: {
        type : Number, required : false,
        },
    image: {
        type : String, required : false,
        }
});
var parentSchema = new Schema({
    entityId: {
        type : Number, required : true, unique: true
        },
    attributeSetId: {
        type : Number, required : false,
        },
    parentId: {
        type : Number, required : false,
        },
    path: {
        type : String, required : false,
        },
    position: {
        type : Number, required : false,
        },
    level: {
        type : Number, required : false,
        },
    childrenCount: {
        type : Number, required : false,
        },
    name: {
        type : String, required : false,
        },
    urlKey: {
        type : String, required : false,
        },
    urlPath: {
        type : String, required : false,
        },
    isActive: {
        type : Number, required : false,
        },
    isAnchor: {
        type : Number, required : false,
        },
    includeInMenu: {
        type : Number, required : false,
        },
    image: {
        type : String, required : false,
        },
    childrens:[childSchema]
});
module.exports = mongoose.model('category', parentSchema);
//module.exports = mongoose.model('childrens', childSchema);
