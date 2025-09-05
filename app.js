const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors");


const app = express()
const path = require('path')
require('dotenv').config()
app.use(cors()); // quick fix
// optional tighter config:
// app.use(cors({ origin: ["https://<tera-frontend-domain>", "http://localhost:5173"], credentials: true }));
// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // timeout after 10s
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB connection error:", err.message));


app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const userModel = require('./models/user')

app.get('/',(req,res)=>{
    // res.send('Hey')
    res.render('index')
})
app.get('/read', async (req,res)=>{
    try {
        let users = await userModel.find();
        res.render('read',{users})
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
})


app.get('/edit/:userid', async (req,res)=>{
    try {
        let user = await userModel.findOne({_id: req.params.userid});
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('edit',{user})
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Error fetching user');
    }
})
app.post('/update/:userid', async (req,res)=>{
    try {
        let {Image,Name,Email} = req.body;
        let user = await userModel.findOneAndUpdate({_id: req.params.userid},{Image,Name,Email},{new:true});
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.redirect('/read')
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Error updating user');
    }
})

 

app.get('/delete/:id', async (req,res)=>{
    try {
        let user = await userModel.findOneAndDelete({_id:req.params.id});
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.redirect('/read')
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Error deleting user');
    }
})

app.post('/create', async (req,res)=>{
    try {
        let {Name, Email, Image} = req.body;
        let createdUser = await userModel.create({
            Name:Name,
            Email:Email,
            Image:Image
        })
        res.redirect('/read');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user');
    }
})

  
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
