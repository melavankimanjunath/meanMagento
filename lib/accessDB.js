// Module dependencies
var util = require('util'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Category = require('../models/category'),
    dbConfig = require('./configLoader').databaseConfig,
    connectionString = 'mongodb://' + dbConfig.host + '/' + dbConfig.database,
    connection = null;

// connect to database
module.exports = {

    // initialize DB
    startup: function (callback) {
        mongoose.connect(connectionString);
        connection = mongoose.connection;
        mongoose.Promise = global.Promise;
        mongoose.connection.on('open', function () {
            console.log('We have connected to mongodb');

        });

    },

    // disconnect from database
    closeDb: function () {
        connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    },
// var Parent = mongoose.model('Parent', parentSchema);
// var parent = new Parent({ children: [{ name: 'Matt' }, { name: 'Sarah' }] })
// parent.children[0].name = 'Matthew';
// parent.save(callback);
    insertCategory: function (req_body, callback) {
        this.startup();
        console.log("INSERT");
//        console.log(req_body[2]);
        var parentCategory = req_body[0];
        var childCategories = req_body[2];
        var category = new Category();
        category.entityId  = parentCategory.entityId;
        category.parentId = parentCategory.parentId;
        category.name = parentCategory.name;
        category.isActive = parentCategory.isActive;
        category.image = "image.jpg";
        category.childrens = req_body[1];
        category.save(function(err){
            console.log('Error while saving kulghuyg: ');
                if (err) {
                    console.log('Error while saving category: '+ err);
                } else {
                    console.log('Category Created Successfully !');
                }
            });
        for(var i = 0; i < childCategories.length; i++) {
            var categoryTwo = new Category();
            console.log(childCategories[i].entityId);
            categoryTwo.entityId  = childCategories[i].entityId;
            categoryTwo.parentId = childCategories[i].parentId;
            categoryTwo.name = childCategories[i].name;
            categoryTwo.isActive = childCategories[i].isActive;
            categoryTwo.image = "image.jpg";
            categoryTwo.save(function(err){
            console.log('Error while saving : ');
                if (err) {
                    console.log('Error while saving category: '+ err);
                } else {
                    console.log('Category Created Successfully !');
                }
            });
        }

//        var child = [];
//         for(var i = 0; i < childCategories.length; i++) {
//             console.log(childCategories[i]['entityId']);
//             //category.childrens.entityId = childCategories[i]['entityId'];
//             var cSchema = "{ entityId: "+childCategories[i]['entityId']+" },{ name: "+childCategories[i]['name']+" },{ parentId: "+childCategories[i]['parentId']+" },{ image: "+childCategories[i]['image'] +"},{ isActive: "+childCategories[i]['isActive'] +"}";
//             category.childrens.push(cSchema);
// //            console.log(cSchema);
// //              child.push(cSchema);
//         }

        // category.childrens.entityId=23;
        // category.childrens.parentId=21;
        // category.childrens.name='DontKnow';
        // category.childrens.isActive=1;
//        for(var j=0; j < child.length; j++){
//            console.log(child[j]);
//            category.childrens.push(child[j]);
//        }
//        category.childrens = child;
//        console.log(category);
//        console.log("BEFORE SAVE");

        //});
        callback(null, category);
        mongoose.connection.close();
    },
    // insert a  Category
    // insertCategory: function (req_body, callback) {
    //     this.startup();
    //     req_body.forEach(function (item) {
    //         console.log(item.childrens);

    //     var category = new Category();
    //     category.entityId  = item.entityId;
    //     category.attributeSetId = item.attributeSetId;
    //     category.parentId = item.parentId;
    //     category.path = item.path;
    //     category.position = item.position;
    //     category.level = item.level;
    //     category.childrenCount = item.childrenCount;
    //     category.name = item.name;
    //     category.urlKey = item.urlKey;
    //     category.urlPath = item.urlPath;
    //     category.isActive = item.isActive;
    //     category.isAnchor = item.isAnchor;
    //     category.includeInMenu = item.includeInMenu;
    //     category.image = item.image;
    //     category.childrens = item.childrens;

    //     category.save(function(err){
    //             if (err) {
    //                 console.log('Error while saving category: '+ err);
    //             } else {
    //                 console.log('Category Created Successfully !');
    //             }
    //         });
    //     });
    //     callback(null, req_body);
    //     mongoose.connection.close();
    // },

    // get Category details
    getCategory: function (id, callback) {
        console.log('getCategory() is working..');
        this.startup();
        Category.find({ 'entityId': id }, {}, function (err, categoryDetails) {
            if(err){
                console.log("Error in getCategory() " + err);
            } else if(categoryDetails.length){
                console.log('getCategory() executed Successfully..');
                 for(var i = 0; i < categoryDetails.length; i++) {
                    //categoryDetails[i].childrens
                    console.log(categoryDetails[i].childrens.split(','));
                    var childIds = categoryDetails[i].childrens.split(',');
                    childIds.forEach(function (cid) {
                        console.log(cid);
                        // Category.find({ 'entityId': cid }, function (err, childCategoryDetails) {
                        //     console.log(childCategoryDetails);
                        //     if(err){
                        //         console.log("Err child Category" + err);
                        //     }
                        // });
                    });
                 }
                callback(null, categoryDetails);
                mongoose.connection.close();
            } else {
            console.log('getCategory() executed Successfully.. But No data found');
            callback(null, categoryDetails);
            mongoose.connection.close();
            }
        });
    }
}
