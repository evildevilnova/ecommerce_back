const  express = require('express');
const app = express();
const env = require("dotenv");
const path = require('path');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin/uath');
const uathRoutes = require('./routes/uath');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const addressRoutes = require('./routes/address');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const initalDataRoutes = require('./routes/admin/initalData');
const pageRoutes = require('./routes/admin/page');
const adminOrderRoute = require("./routes/admin/oder.admin");
const cors = require('cors');

// env
env.config();

// mongodb connection

mongoose.connect(
    `mongodb+srv://${process.env.MONGOUSER}:${process.env.PASSWORD}@cluster0.gp1be.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
     {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
        }
        ).then(() => {
            console.log('database is connected')
        });

app.use(express.json());
app.use('/public',express.static(path.join(__dirname, 'uploads')));

//middle ware of api 
app.use(cors());
app.use('/api',adminRoutes);
app.use('/api',uathRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',initalDataRoutes);
app.use('/api',cartRoutes);
app.use('/api',pageRoutes);
app.use('/api',addressRoutes);
app.use('/api',orderRoutes);
app.use('/api',adminOrderRoute);


app.listen(process.env.PORT,() => {
    console.log(`connected and port no ${process.env.PORT}.`);
});