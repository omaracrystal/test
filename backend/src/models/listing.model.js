//require('mongoose-type-url');

// module.exports = function (app) {
//   const mongooseClient = app.get('mongooseClient');
//   const listing = new mongooseClient.Schema({
//     title: {
//       type: String,
//       required: [true, 'Please give your url a Name']
//     },
//     url: {
//       //type: mongooseClient.SchemaTypes.Url,
//       type: String,
//       required: [true, 'Url link is required']
//     },
//     createdAt: { type: Date, 'default': Date.now },
//     updatedAt: { type: Date, 'default': Date.now }
//   });
//
//   return mongooseClient.model('listing', listing);
// };

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


var Listing = new Schema({
  title: {
    type: String,
    required: [true, 'Please give your url a Name']
  },
  url: {
    type: String,
    required: [true, 'Url link is required']
  },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});


mongoose.connect(process.env.MONGO_URI);

module.exports = mongoose.model('counters', Listing);