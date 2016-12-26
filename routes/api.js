var db = require('../lib/accessDB')
  , util = require('util');

var MagentoApiConfig = require('../lib/magentoRestApiClient.js');
var Magento2Client = require('magento2-rest-client').Magento2Client;

exports.category = function (req, res) {
//    console.log(req.params);
    // We need categoryId as GET parameter
    // CategoryId is constant now its 3
    var categoryId = 3;
 //   Check if category already exist in MongoDB the return data from MongoDB itself
  //   db.getCategory(21, function (err, categoryDetails) {
  //       if (err) {
  //           console.log('category err');
  //       } else if(categoryDetails.length != 0){
  //           console.log('*** Data from MDB ***');
  // //          console.log(categoryDetails)
  //           res.send(categoryDetails);
  //       } else{
        var client = Magento2Client(MagentoApiConfig.options);
            client.categories.getCategoryWithChild(21)
                .then(function (response) {
//                    console.log(response);
                  if ( response.length  != 0 ) {
                        db.insertCategory(response, function (err, categoryAfterInsert) {
//                            console.log(categoryAfterInsert);
                            if (err) {
                                console.log('error in insertCategory');
                            }
                        });
                    console.log("Data sending back as responce");
                    res.send(response);
                  }
            });
     //   }

   // });
};
