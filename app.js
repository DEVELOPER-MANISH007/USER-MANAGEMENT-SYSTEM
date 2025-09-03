const express = require('express')
const app = express()
const path  = require('path')

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
const userModel = require('./models/user')

app.get('/',(req,res)=>{
    // res.send('Hey')
    res.render('index')
})
app.get('/read', async (req,res)=>{
    let users = await userModel.find();
    res.render('read',{users})
})


app.get('/edit/:userid', async (req,res)=>{
    let user = await userModel.findOne({_id: req.params.userid});
    res.render('edit',{user})
})
app.post('/update/:userid', async (req,res)=>{
    let {Image,Name,Email} = req.body;
    let user = await userModel.findOneAndUpdate({_id: req.params.userid},{Image,Name,Email},{new:true});
    res.redirect('/read')
})

 

app.get('/delete/:id', async (req,res)=>{
    let users = await userModel.findOneAndDelete({_id:req.params.id});
    res.redirect('/read')
})

app.post('/create', async (req,res)=>{
        let {Name, Email, Image} = req.body;
      let createdUser = await userModel.create({
            Name:Name,
            Email:Email,
            Image:Image
    })
    res.redirect('/read');

})

  
app.listen(3000);
