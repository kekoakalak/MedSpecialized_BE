const mongoose = require(`mongoose`);

const userScheme = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
    },

    role: {
        type: String,
        enum: ['Admin', 'Trainer', 'Trainee'],
        default: 'Trainee',
      },

});

module.exports = mongoose.model('User', userScheme);