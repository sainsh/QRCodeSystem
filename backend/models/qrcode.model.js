const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const qrcodeSchema = new Schema({
    username: {type: String, required: true},
    description: {type: String, required: true},
    code: {type: String, required: true},
    date: {type: Date, required: true},
}, {timestamps: true});

const QRcode = mongoose.model('QRcode', qrcodeSchema);

module.exports = QRcode;