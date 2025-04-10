const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
require("dotenv").config();


//connect with the DB
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";   //copy from mongooseejs.com

//calling main function..
main()
    .then(() =>{
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

    async function main() {
        await mongoose.connect(MONGO_URL);
    }

    const initDB = async () => { 
        await Listing.deleteMany({});
        initData.data = initData.data.map((obj)=>({...obj, owner:'67f662ea132eff19ab75a0ee'}))
        await Listing.insertMany(initData.data);
        console.log("data is initialized..");
    }

    initDB();