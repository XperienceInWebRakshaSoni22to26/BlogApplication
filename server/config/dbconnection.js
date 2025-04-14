const mongoose = require('mongoose');
const colors = require('colors');
const connectdb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`connected to mongodb database ${mongoose.connection.host}`.bgMagenta.white);

    } catch (error) {
        console.log(`MONGO Connect Error ${error}`.bgRed.white);
        console.log(`Name: ${error.name}`.red);
        console.log(`Message: ${error.message}`.red);
        console.log(`Stack:\n${error.stack}`.gray);
    }
}

module.exports = connectdb;