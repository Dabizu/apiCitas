const express = require("express");
const app = express();
//para todas las condiguraciones del server
const config=require("./config.js");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const pdf = require("html-pdf")
const MongoClient = require("mongodb").MongoClient;

//const url="mongodb+srv://rootdavid:"+pass+"@clusterazure.l92gg.mongodb.net/base"
const url = "mongodb+srv://rootdavid:" + config.PASSWORD + "@clusterazure.l92gg.mongodb.net/" + config.DATABASE + "?retryWrites=true&w=majority";
const jwt = require("jsonwebtoken");
var token = jwt.sign({ nombre: "david" }, "secret");
var decoded = jwt.verify(token, "secret");
console.log(decoded.nombre);
/*
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(base);
    dbo.createCollection("cita", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });
*/





var cadena='<script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>'+
'<div id="no" style="height: 500px; width: 500px; color:aliceblue;">'+
'<div id="codigo"></div>'+
'</div> '+
'<script>var qrcode=new QRCode(document.getElementById("codigo"),"9734jjdjj")</script> ';
pdf.create(cadena).toFile("./archivo.pdf",function(error,res){
    if(error){
        console.log(error)
    }else{
        console.log("no hay error")
    }
});
//const path = require("path");
app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));
/*
app.get("/video", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})*/

app.get("/login",(req,res)=>{
    res.sendFile(__dirname+"/public/Login.html")
})
app.get("/cita", (req, res) => {
    res.sendFile(__dirname + "/public/cita.html");
})
/*
app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/Login.html");
});*/

app.get("/modelo",(req,res)=>{
    res.sendFile(__dirname + "/public/modeloTarjeta.html");
})
app.post("/page", (req, res) => {
    var agregado = '<script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>'
    var contenedor = req.param("contenedor");
    console.log(typeof contenedor);
    pdf.create(agregado+contenedor).toFile("./archivo.pdf",function(error,res){
        if(error){
            console.log(error)
        }else{
            console.log("no hay error")
        }
    })
})

var messages = [

    {
        nombre: "carlos", descripcion: "Hola! que tal?", imagen: "https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png",
        hora: "1:35", fecha: "1/5/2023",
    },

    {
        author: "Carlos",
        text: "Hola! que tal?",
    },
    {
        author: "Pepe",
        text: "Muy bien! y tu??",
    },
    {
        author: "Paco",
        text: "Genial!",
    },
];

/*
const moment = require("moment-timezone")
var mo = new moment()*/

//console.log("fecha de mexico: "+mo.tz("America/Mexico_City").format())

//moment().tz("America/Mexico_City").format()

//data= moment().tz("America/Mexico_City").format()
//tz("America/Mexico").format();



//date=new Date("es-mx",mo.tz("America/Mexico_City").format())

var dateViejo = new Date();
dateViejo.setDate(0)
dateViejo.setFullYear(0)
dateViejo.setMonth(0)
dateViejo.setHours(0)
dateViejo.setMinutes(0)

io.on("connection", function (socket) {

    socket.on("rest", function (data) {
        console.log("respuesta del emisor rest: " + data);
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db(config.DATABASE);
            var myquery = { numero_seguro_social: data };
            var newvalues = { $set: { confirmacion_cita: 1 } };
            dbo.collection("cita").updateOne(myquery, newvalues, function (err, res) {
                if (err) throw err;
                console.log("1 document updated");
                var elementIndex = messages.findIndex((obj => obj.numero_seguro_social == data));
                console.log("indice del array: "+elementIndex)
                messages[elementIndex].confirmacion_cita=1;
                socket.emit("messages", messages);
                db.close();
            });
        });
        
        /*
        element.confirmacion_cita=1;
        messages.find(element=>element.=)*/



        /*
        messages.push(data)
        socket.emit("messages", messages);
        
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db(base);
            dbo.collection("cita").insertOne(data, function (err, res) {
                if (err) { throw err; }
                console.log("se inserto correctamente");
                db.close();
            });
        });*/
    });
    console.log("Un cliente se ha conectado");

    /*
    app.post("/entrada", (req, res) => {
        var data = {
            nombre: req.param("nombre"),
            descripcion: req.param("descripcion"),
            imagen: req.param("imagen"),
            hora: req.param("hora"),
            fecha: req.param("fecha"),
        }
        console.log("data: " + data)
        messages.push(data)
        socket.emit("messages", messages);
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db(base);
            dbo.collection("cita").insertOne(data, function (err, res) {
                if (err) { throw err; }
                console.log("se inserto correctamente");
                db.close();
            });
        });
        res.send("listo")
    });*/
    const multer = require("multer");
    // SET STORAGE
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/fotos')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
    var upload = multer({ storage: storage })

    app.post("/subirImagen", upload.single('archivo'), (req, res) => {
        const file = req.file
        if (!file) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            return next(error)
        }
        res.send(file)
    })

    app.get("/dameConsultorio",(req,res)=>{
        var consultorio=parseInt(req.param("numeroConsultorio"));
        //socket.emit("messages", messages.find(element=>element.numero_consultorio==consultorio));
        res.json(messages.find(element=>element.numero_consultorio==consultorio))
    })
    socket.emit("messages", messages);

    function funcionCalendarcio() {
        //var numero=parseInt("1");
        //console.log("tipo: "+ typeof numero)
        //console.log("si")
        var date = new Date();
        var newDate = date.getTime();
        var timepoRestado = 60 * 60000;
        date = new Date(newDate - timepoRestado)
        /*
        date.toLocaleString('es-MX',{
            timeZone: 'America/Mexico_City',
        })*/
        /*
        console.log("tipo: "+ date.getHours() +":"+date.getMinutes()+ "   tipo viejo:"+ dateViejo.getHours() )
        if(date.getHours() == dateViejo.getHours() && date.getMinutes() == dateViejo.getMinutes()){
            console.log("ya es la hora");
            dateViejo.setHours(date.getHours())
            dateViejo.setMinutes(date.getMinutes()+2)
        }*/

        var mes = date.getMonth() + 1;
        var mesViejo = dateViejo.getMonth() + 1;
        if ((date.getDate() + "/" + mes + "/" + date.getFullYear()) != (dateViejo.getDate() + "/" + mesViejo + "/" + dateViejo.getFullYear())) {
            console.log("si son distintos")
            //fijamos dia mes y año
            dateViejo.setDate(date.getDate())
            dateViejo.setMonth(date.getMonth())
            dateViejo.setFullYear(date.getFullYear())
            //eliminando registros
            console.log("tenia: " + messages.length + " registros")
            var tamanio = messages.length;
            for (var i = 0; i < tamanio; i++) {
                messages.pop();
                console.log("eliminando")
            }
            //creamos la consulta y llenamos el array con las citas
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db(config.DATABASE);
                var query = { fecha: date.getDate() + "/" + mes + "/" + date.getFullYear() };
                dbo.collection("cita").find(query).sort({ hora: 1 }).toArray(function (err, result) {
                    if (err) throw err;
                    //namos el array
                    result.forEach(element => {
                        messages.push(element)
                    });

                    console.log(messages)
                    //mandamos los datos a la vista
                    socket.emit("messages", messages);
                    db.close();
                });
            });
        }
        /* else {
            //console.log("son iguales")
            
        }*/
        setTimeout(funcionCalendarcio, 1000);
    }
    funcionCalendarcio()

});

server.listen(config.PORT, () => {
    console.log("server activo desde el puerto: "+config.PORT);
});