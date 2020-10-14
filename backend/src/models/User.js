const { Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    fname: {
        type: String,
        required: true,
        trim: true,
    },
    lname: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true, //Para que no tenga espacios en blanco
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    points: {
        type: Number
    }
}, {
    timestamps: true
});

// Método para encriptar la contraseña del usuario
userSchema.methods.encrypt = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
}

// Método que permite comparar la contraseña ingresada con la que
// se encuentra en la base de datos, es un boolean
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = model('User', userSchema);