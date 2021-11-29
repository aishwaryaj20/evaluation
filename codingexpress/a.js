const express = require("express")
const mongoose = require("mongoose");

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/test2");
  };
  



const userSchema = new mongoose.Schema({
    id:{type:Number,required:true},
    notice:{type:Number, required:true},
    location:{type:String,required:true},
    city:{type:String,required:true},
    skills:{type:String,required:true},
    ratings:{type:Number,required:true},
    opportunity:{type:String, required:true},
    
})



const jobsSchema=new mongoose.Schema({
   // id:{type:Number,required:true},
    mode:{type:String,required:true},
    city:{type:String,required:true},
    skills:{type:String,required:true},
    ratings:{type:Number,required:true}
    
})



const companySchema=new mongoose.Schema({
  //  id:{type:Number,required:true},
  opportunity:{type:String, required:true},
    email:{type:String,required:true},
    notice:{type:Number, required:true},
    details:{type:String, required:true},
    
})
const Company =mongoose.model("company",companySchema);

const Job =mongoose.model("job",jobsSchema);

const User=mongoose.model("user",userSchema);

const app = express();

app.use(express.json());



app.get("/users", async (req, res) => {
    const users = await User.find().lean().exec();
  
    res.send({ users });
  });

  

 

  app.post("/users", async (req, res) => {
    try {
      const user = await User.create(req.body);
  
     return res.status(201).send(user);
    } catch (e) {
      res.status(500).json({ status: e.message });
    }
  });



  ////

  app.post("/company",async(req,res)=>{
    const company=await Company.create(req.body)
    return res.status(201).send({company});
})
app.get("/company",async(req,res)=>{
    const company=await Company.find().lean().exec()
    return res.status(200).send({company});
})
app.get("/company/:id",async(req,res)=>{
    const company=await Company.findById(req.params.id).lean().exec()
    return res.status(200).send({company});
})
app.patch("/company/:id",async(req,res)=>{
    const company=await Company.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
    return res.status(200).send({company});
})
app.delete("/company/:id",async(req,res)=>{
    const company=await Company.findByIdAndDelete(req.params.id).lean().exec()
    return res.status(200).send({company});
})


app.get("/company/opportunity",async(req,res)=>{
    const company=await Company.find({opportunity:{$eq :"2"}}).lean().exec()
    return res.status(200).send({company});
})
/////////////


app.get("/users/city",async(req,res)=>{
    const users=await User.find({city:{$eq:"pune"}} && {skills:{$eq:"java"}}).lean().exec()
    
    return res.status(200).send({users});
})
////job
app.post("/jobs",async(req,res)=>{
    const jobs=await Job.create(req.body)
    return res.status(201).send({jobs});
})

app.get("/users/city",async(req,res)=>{
    const users=await User.find({mode:{$eq:"WFH"}}).lean().exec()
    return res.status(200).send({jobs});
})

app.get("/users/location",async(req,res)=>{
    const users=await User.find({location:{$eq:"WFH"}} ).lean().exec()
    return res.status(200).send({users});
})


app.get("/users/notice",async(req,res)=>{
    const users=await User.find({notice:{$eq:"2"}} ).lean().exec()
    return res.status(200).send({users});
})



app.get("/users/ratings",async(req,res)=>{
    const users=await User.find().sort({ratings:1}).lean().exec()
    return res.status(200).send({users});
})


app.get("/users/opportunity",async(req,res)=>{
    const users=await User.find({opportunity:{$eq :"2"}}).lean().exec()
    return res.status(200).send({users});
})





  app.patch("/users/:id", async  (req, res) => {
 
    try {
    const user = await User.findByIdAndUpdate(req.params.id,req.body, {
      new:true,
    
    }) 
     .lean().exec();
   
  return res.status(201).send(user);
    } catch(e)
    {
      return res.status(500).json({message:e.message, status: "failed"})
    }
  });

app.listen(1111, async () =>
{
    await connect();
    console.log("port listening 1111")
})