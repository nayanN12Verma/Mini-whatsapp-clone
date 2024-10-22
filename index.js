const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path  = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");


app.set("views" , path.join(__dirname , "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extented:true}));
app.use(methodOverride("_method"));

main()
.then(()=>{
console.log("connection successfull");
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}


app.get("/",(req, res)=>{
    res.send("Root is working");
})
//index route

app.get("/chats",async (req,res)=>{
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs" ,{chats});

})
//new route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});
//Create route
app.post("/chats",(req,res)=>{
    let {from, to ,msg} = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at : new Date(),

    })
    newChat
    .save()
    .then((res)=>{
        console.log("Chat was saved");
    }).catch((err)=>{
        console.log(err);
    })
    res.redirect("/chats");
});
//edit route
app.get("/chats/:id/edit", async (req,res)=>{
    let{id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat})
});

//update route
app.put("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let{ msg: newMsg} = req.body;
    let updateChat = await Chat.findByIdAndUpdate(id,
        {msg: newMsg},{runValidators:true, new:true}
    );
    console.log(updateChat);
    res.redirect("/chats");
})
//destroy chats
app.delete("chats/:id", async (req,res)=>{
    let {id} = req.params;
    let  deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");

})
app.listen(port,()=>{
    console.log("Port is listening to server");
})