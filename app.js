const express = require('express');
const app=express();
const multer =require('multer');
const port = process.env.PORT || 3000;
const fs=require('fs')

app.get("/",(req,res)=>{
    res.send("hola");
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
    storage: storageArchivo
    /*,
    fileFilter: function(req, file, cb) {
        if (!file.originalname.match(/\.(pdf)$/)) {
            app.locals.banderaTipoArchivo = "false";
            return cb(new Error('Error en el tipo de archivo.'));
        }
        app.locals.banderaTipoArchivo = "true";
        cb(null, true);
    }*/
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