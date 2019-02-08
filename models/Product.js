var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
  productName: String,
  store_ID: Number,
  kind: String,
  size: String,
  inventory_amount : Number,
  price : Number,
  img: String,
  description: String,
});
module.exports = mongoose.model('Product', ProductSchema);