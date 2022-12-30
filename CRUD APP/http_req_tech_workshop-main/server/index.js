const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

let nameArray = []

function getRandomName (){
    let size = nameArray.length;//6
    let randomIndex = Math.floor(Math.random()*size);//0-5
    return nameArray[randomIndex];
}
// getById
app.get("/getByIndex/:index",(req,res)=>{
    console.log(req.params);
    let index = parseInt(req.params.index);
    console.log("index = ",nameArray[index]);
    let size = nameArray.length;
    if(nameArray[index]){
        return res.status(200).json({
            name:nameArray[index]
        })
    }
    return res.status(404).json({
        name:"I am not there !!!"
    })
})
// addName
app.post("/addName",(request,response)=>{
    let name = request.body.name;
    console.log(name);
    nameArray.push(name);
     response.status(200).json({
        message:`New Name Added ${name}`
    })
})

app.get('/home', (request, response) => {
    return response.status(200).json({
        message:`Hello 4rm ${getRandomName()} !!!`
    })
})

app.get("/allNames",(req,res)=>{
    console.log("inside /allNames backend");
    return res.status(200).json({
        message:"success",
        data:nameArray
    })
})

// DeleteByIndex
app.delete("/deleteByIndex/:index",(req,res)=>{
    let index = parseInt(req.params.index);
    let size = nameArray.length;
    let delteName;
    if(index<size && index>=0){
        delteName = nameArray[index];
        nameArray.splice(index,1);
    }
    return res.status(200).json({
        message:`${delteName} name removed successfully`
    })
})

// put
app.put("/editName",(req,res)=>{
    let {index,name} = req.body;
    console.log(name);
    let oldName = nameArray[index];
    nameArray[index]=name;
    return res.status(200).json({
        message: `${oldName} -> ${nameArray[index]}`
    })
})




app.listen(5294, () => {
    console.log('app listening on port 5294');
})