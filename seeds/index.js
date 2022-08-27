const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,   
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random()* array.length)]


const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++){
        const random1000 =Math.floor (Math.random() * 1000);
        const price =Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            author: '62fabc372e947e894ec17a5a',
            location: `${cities[random1000].city},  ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'orem Ipsum is simply dummy text of the printing and typesetting industry.',
            price,
            "geometry":{
                "type":"Point",
                "coordinates":[
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
                     
            
            },
            images:  [
                {
                  url: 'https://res.cloudinary.com/dmeywe5lx/image/upload/v1660810277/YelpCamp/fuzyowk2n76z2pruswl5.jpg',
                  filename: 'YelpCamp/fuzyowk2n76z2pruswl5'
                 
                },
                {
                  url: 'https://res.cloudinary.com/dmeywe5lx/image/upload/v1660810277/YelpCamp/mzd4vweswshpbkmhd1ii.webp',
                  filename: 'YelpCamp/mzd4vweswshpbkmhd1ii'
                }
              ]
            
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
 