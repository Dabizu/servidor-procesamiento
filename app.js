/*
const express =require('express');
const app=express();
const cors=require("cors");
const fileUpload = require('express-fileupload');
const port = process.env.PORT || 3000;
app.use(cors());
app.use(fileUpload());
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/pagina.html");
})
app.post("/imagen",(req,res)=>{
    let archivo=req.files.archivo
    archivo.mv('./documentos/'+archivo.name,err => {
        if(err)return res.status(500).send({message : err})

        return res.status(200).send({message : "File Upload"})
    })
    //res.send("se paso el archivo");
});

app.get("/eliminar",(req,res)=>{
    try{
        fs.unlinkSync('./'+app.locals.nombreArchivo);
        console.log("se elimino el archivo");
        res.send("se elimino");
    }catch(err){
        console.err('error no se elimino'.err);
    }
});

app.listen(port,()=>{console.log("se inicio servidor")});
*/




const express = require('express');
const app=express();
const cors=require("cors");
const port = process.env.PORT || 3000;
app.use(cors());

app.get("/juego",(req,res)=>{
    res.sendFile(__dirname+"juego.html");
});



app.listen(port,()=>{console.log("se inicio el servidor");});