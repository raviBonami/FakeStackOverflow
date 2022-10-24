import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/fakeStackOverflow",
    {
        useNewUrlParser: true,
    }
)
.then((response) => {
    console.log("Mongo db connected ...")
})