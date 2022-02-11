const mongoose = require('mongoose');
const db= 'mongodb+srv://jrachako:Jaya%40251997@cluster0.gtcv4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const connectDB = async () => {
    try{
        await mongoose.connect(db,{ useNewUrlParser: true });

        console.log('Connected to Mongo DB');
    }
    catch(err){
        console.error(`Unable to connect Mongo DB ${err.message}`);
        process.exit(1);
    }

};

module.exports = connectDB;
