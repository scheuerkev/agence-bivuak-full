const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = schema({
    local: {
        email: {type: String, require: true, unique: true},
        password: {type: String, required: true},
    },
    username: {type: String, required: true, unique: true},
    avatar: {type: String, default: '/avatars/default.webp'},
    role: {type: Number, required: true, default: 0},
    createdAt : {type: Date, default: Date.now},
});

userSchema.statics.hashPassword = (password) => {
    console.log(password);
    return bcrypt.hash(password, 12);
}

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.local.password);
}

const User = mongoose.model('user', userSchema);

module.exports = User;