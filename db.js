const mongoose = require('mongoose');

const connection = async () => { 
    try {
        const connect = await mongoose.connect('mongodb://localhost:27017/user', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`connected mongoDB: ${connect.connection.host}`);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connection;