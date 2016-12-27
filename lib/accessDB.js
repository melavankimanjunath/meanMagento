// Module dependencies
var util = require('util'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Category = require('../models/category'),
    childCategory = require('../models/childcategory'),
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
    insertCategory: function (req_body, callback) {
        this.startup();
        console.log("INSERT");
        //
        var parentCategory = req_body[0],
            childCategories = req_body[2],
            category = new Category();

        category.entityId  = parentCategory.entityId,
        category.parentId = parentCategory.parentId,
        category.name = parentCategory.name,
        category.isActive = parentCategory.isActive,
        category.image = parentCategory.image;

        for(var i = 0; i < childCategories.length; i++) {
            var categoryTwo = new childCategory();
            categoryTwo.entityId = childCategories[i].entityId;
            categoryTwo.name = childCategories[i].name;
            categoryTwo.parentId = childCategories[i].parentId;
            categoryTwo.isActive = childCategories[i].isActive;
            categoryTwo.image = childCategories[i].image;
            category.children.push(categoryTwo);
        }
//        console.log(category);
        category.save(function(err){
                if (err) {
                    console.log('Error while saving category: '+ err);
                } else {
                    console.log('Category Created Successfully !');
                }
            });

        Category.find({ $or:[ {'entityId':parentCategory.entityId}, {'parentId':parentCategory.entityId} ]}, {}, function (err, categoryDetails) {
            callback(null, categoryDetails);
            mongoose.connection.close();
        });

    },


    // get Category details
    getCategory: function (id, callback) {
        console.log('getCategory() is working..');
        this.startup();
        Category.find({'entityId':id}, {}, function (err, categoryDetails) {
            if(err){
                console.log("Error in getCategory() " + err);
            } else if(categoryDetails.length){
                console.log('getCategory() executed Successfully..');
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
