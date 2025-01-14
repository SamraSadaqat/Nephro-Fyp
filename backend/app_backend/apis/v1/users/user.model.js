var mongoose = require('mongoose');
var service = require('../../../services/app.services');
// Account-Type 0---> Admin/ 1---> User


// const UserModel = new mongoose.Schema({
//     avatar: String,
//     firstName: {
//         type: String,
//         maxlength: 100,
//         required: [true, 'Name is required'],
//     },

//     lastName: {
//         type: String,
//         maxlength: 100,
//         required: [true, 'Name is required'],
//     },
//     email: {
//         type: String,
//         //maxlength: 100,
//         unique: true,
//         required: [true, 'Email is required'],
//     },
//     mobile: {
//         type: String,
//         // maxlength: 100,
//         required: [true, 'Mobile is required'],
//     },
//     password: {
//         type: String,
//         maxlength: 100,
//         required: [true, 'Password is required'],
//     },
//     gender: {
//         type: String,
//         enum: ['Male', 'Female'],
//         // maxlength: 100,
//         required: [true, 'Gender is required'],
//     },
//     role: {
//         type: Number,
//         enum: [0, 1],
//         default: 0
//     },
//     access_token: String,
//     reset_password_token: String,
//     reset_expiry: Date,
//     creationDate: {
//         type: Date,
//         default: Date.now
//     },
//     device_token: String,
// }, {
//     collection: "users"
// })



const UserModel = new mongoose.Schema({
    avatar: String,
    firstName: {
        type: String,
        maxlength: 100,
        required: [true, 'Name is required'],
    },
    lastName: {
        type: String,
        maxlength: 100,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
    },
    mobile: {
        type: String,
        required: [true, 'Mobile is required'],
    },
    password: {
        type: String,
        maxlength: 100,
        required: [true, 'Password is required'],
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: [true, 'Gender is required'],
    },
    role: {
        type: Number,
        enum: [0, 1],
        default: 0,
    },
    access_token: String,
    reset_password_token: String,
    reset_expiry: Date,
    creationDate: {
        type: Date,
        default: Date.now,
    },
    device_token: String,
    // New field: "Users-id"
    "Users-id": {
        type: String,
        unique: true, // Ensures that the Users-id is unique
        required: [true, 'Users-id is required'], // Makes the field mandatory
    },
}, {
    collection: "users"
});

module.exports = mongoose.model("User", UserModel);




UserModel.pre("save", async function (next) {
    let user = this;
    if (!this.isModified("password")) {
        return next();
    }
    try {
        let result = await service.incryptData(user.password);
        user.password = result;
        next();
    } catch (error) {
        next(error);
    }
});



module.exports = mongoose.model("users", UserModel)