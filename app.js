// Task1: initiate app and run server at 3000
require('dotenv').config();
const express=require('express');
const app=express();
app.use(express.json());
const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 
const mongoose=require('mongoose');
mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log('MongoDB connected'))
  .catch(err=>console.error('MongoDB connection error:',err));

const employeeSchema=new mongoose.Schema({name:String,location:String,position:String,salary:String});
const Employee=mongoose.model('Employee',employeeSchema);

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below



//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist',function(req,res){
  Employee.find().then(data=>res.json(data)).catch(err=>res.status(500).json({error:err.message}));
});


//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id',function(req,res){
  Employee.findById(req.params.id).then(data=>res.json(data)).catch(err=>res.status(500).json({error:err.message}));
});


//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post('/api/employeelist',function(req,res){
  const emp=new Employee(req.body);
  emp.save().then(data=>res.json(data)).catch(err=>res.status(500).json({error:err.message}));
});


//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id',function(req,res){
  Employee.findByIdAndDelete(req.params.id).then(data=>res.json(data)).catch(err=>res.status(500).json({error:err.message}));
});


//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist',function(req,res){
  Employee.findByIdAndUpdate(req.body._id,req.body,{new:true}).then(data=>res.json(data)).catch(err=>res.status(500).json({error:err.message}));
});

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

app.listen(3000,()=>console.log('Server running on port 3000'));

