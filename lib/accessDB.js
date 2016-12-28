// Module dependencies
var util = require('util'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Category = require('../models/category'),
    //childCategory = require('../models/childcategory'),
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
        /**
        # @var, that store @function @parameters data.
        # @category create new @object of Category @schema.
        */
        var parentCategory = req_body[0],
            childCategories = req_body[2],
            category = new Category();
        /**
        # Asign parameter values to @category @object. Its parent category
        */
        category.entityId  = parentCategory.entityId,
        category.parentId = parentCategory.parentId,
        category.description = parentCategory.description;
        category.name = parentCategory.name,
        category.isActive = parentCategory.isActive,
        category.image = parentCategory.image;
        /**
        # Loop the parameter values.
        # create child category object to store the parameter
        */
        for(var i = 0; i < childCategories.length; i++) {
            category.children.push({
                entityId: childCategories[i].entityId,
                name: childCategories[i].name,
                parentId:childCategories[i].parentId,
                description:childCategories[i].description,
                isActive:childCategories[i].isActive,
                image:childCategories[i].image
            });
        }
        /**
        # @PUSH(), @function asigned @prameters data to category @object as parent and child.
        # Save @category object.
        */
        category.save(function(err){
                if (err) {
                    console.log('Error while saving category: '+ err);
                } else {
                    console.log('Category Created Successfully !');
                }
            });
            callback(null, category);
            mongoose.connection.close();
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
