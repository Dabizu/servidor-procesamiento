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

app.listen(port,()=>{console.log("se inicio servidor")});
*/




const express = require('express');
const app=express();
const multer =require('multer');
const cors=require("cors");
const port = process.env.PORT || 3000;
const fs=require('fs')
app.use(cors());

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"juego.html");
});

app.locals.nombreArchivo='unnamed.jpg';
//pedimos una imagen
const storageArchivo = multer.diskStorage({
    destination: 'documentos/',
    filename: function(req, file, cb) {
        cb("", file.originalname);
        app.locals.nombreArchivo = file.originalname;
    }
});
const uploadArchivo = multer({
    storage: storageArchivo,
    fileFilter: function(req, file, cb) {
        if (!file.originalname.match(/\.(pdf)$/)) {
            app.locals.banderaTipoArchivo = "false";
            return cb(new Error('Error en el tipo de archivo.'));
        }
        app.locals.banderaTipoArchivo = "true";
        cb(null, true);
    }
});
app.get("/imagen",uploadArchivo.single('archivo'),(req,res)=>{
    res.send("se paso el archivo");
});

//esto es para mostrar una imagen
app.get("/imagenes/:id", (req, res) => {
    const file = `${__dirname}` + req.params.id;
    res.sendFile(file); //muestra el archivo
});

app.get("/eliminar",(req,res)=>{
    try{
        fs.unlinkSync('./'+app.locals.nombreArchivo);
        console.log("se elimino el archivo");
        res.send("se elimino");
    }catch(err){
        console.err('error no se elimino'.err);
    }
})
app.listen(port,()=>{console.log("se inicio el servidor");});

