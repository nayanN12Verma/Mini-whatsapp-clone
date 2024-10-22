const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
.then(()=>{
console.log("connection successfull");
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

let allChats = [
    {
       from:"neha",
       to:"vijay",
       msg:"send me the assignment",
       created_at: new Date(),
   },
   {
    from:"pritam",
    to:"gouty",
    msg:"keep calm",
    created_at: new Date(),
   },
  {
    from:"sourabh",
    to:"sumit",
    msg:"send me the money",
    created_at: new Date(),
  },
 { from:"shraddha",
  to:"nayan",
  msg:"Never message me again",
  created_at: new Date(),
},
]

Chat.insertMany(allChats);



