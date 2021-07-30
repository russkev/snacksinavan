const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

const vanSchema = new mongoose.Schema(
    {
        vanName: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        readyForOrders: {
            type: Boolean,
            required: true,
            default: false,
        },
        locationDescription: {
            type: String
        },
        longitude: {
            type: Number,
            min: -180.0,
            max: 180.0,
        },
        latitude: {
            type: Number,
            min: -90.0,
            max: 90.0,
        },
    }
);

vanSchema.methods.generateHash = function(password) {
    return bcrypt.hash(password, saltRounds, null)
}

vanSchema.methods.validPassword = function(password) {
    return bcrypt.compare(password, this.password)
}

const Van = mongoose.model("Van", vanSchema);
module.exports = Van;