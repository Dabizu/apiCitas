import SuperClass from "./SuperClass.js";
import * as THREE from './three.module.js';
import Environment from "./Environment.js";
import { OrbitControls } from "./jsm/controls/OrbitControls.js";
/*
import Personaje from "./Personaje.js";
import Maxilar from "./Maxilar.js";
import ManoDerecha from "./ManoDerecha.js";
import Neptuno from "./planetas/Neptuno.js";
import Jupiter from "./planetas/Jupiter.js";
import Tierra from "./planetas/Tierra.js";
import Mercurio from "./planetas/Mercurio.js";
import Venus from "./planetas/Venus.js";
import Marte from "./planetas/Marte.js"
import Login from "./Login.js";
import Teclado from "./Teclado.js";
import CrearTexto from "./CrearTexto.js";
import EventoClick from "./EventoClick.js";
import CajaTexto from "./CajaTexto.js";

import EtiquetaPlaneta from "./planetas/EtiquetaPlaneta.js";
import Texto3d from "./Texto3d.js";
import Rana from "./Rana.js";
import CiudadVavidad from "./CiudadNavidad.js";
import Cabania from "./Cabania.js";
import Copo1 from "./Copo1.js";
import Reno from "./Reno.js";
import Series from "./Series.js";
import { RectAreaLightHelper } from "./jsm/helpers/RectAreaLightHelper.js"
import Cubo from "./Cubo.js";
import Pasto from "./Pasto.js";
import Duende from "./Duende.js";
import PoloNorte from "./PoloNorte.js";*/
//import {Lensflare} from "./jsm/objects/Lensflare.js";
//import Cargar from './Cargar.js'
//import {OrbitControls} from './jsm/controls/OrbitControls.js';
export default class World {
    
    constructor() {
        //let banderaLetreros=false;
        this.superClass = new SuperClass()
        this.scene = this.superClass.scene;
        this.camera = this.superClass.camera.instance;
        this.renderer = this.superClass.renderer;

        this.environment = new Environment()
        this.resources = this.superClass.resources
        const controls = new OrbitControls(this.camera, this.renderer.canvas);
        controls.update();
        this.personaje = null;
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        this.scene.add( cube );

        //crear tarjeta
        var plane;
        html2canvas(document.getElementById("contenido"), {
            onrendered: function (canvas) {
                
                document.body.appendChild(canvas);
                var img=canvas.toDataURL("image/png");
                //document.getElementById("imagen").src=img;
                var image=new Image();
                image.src=img;
                var texture = new THREE.CanvasTexture(canvas);
                //var loader = new THREE.TextureLoader();
                //var texture = loader.load(img); // Cambia la ruta a tu imagen
                var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, });
                
                
                const geometry = new THREE.PlaneGeometry(40,40);
                //const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
                plane = new THREE.Mesh(geometry, material);
                //plane.rotation.z=3.15
                //plane.position.x=-40;
                
                window.superClass.scene.add( plane );
            
                
                //plane.position.set(0,0,0)
                //this.scene.add(plane);
                //this.plane.position.y = 90;
                
                
                //canvas.toBlob(function(blob) {
                //  saveAs(blob, "Dashboard.png"); 
                //});
                
            }
        });

        //se ejecutara cuano se ejecute el evento ready
        this.resources.on('ready', () => {
            //aqui esta el codigo de escena y las instancias de los objetos
            const geometry = new THREE.BoxGeometry( 100, 100, 100 );
            const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
            const cube = new THREE.Mesh( geometry, material );
            this.scene.add( cube );
            console.log("se ejecuto algo aqui")
            /*var plane;
            html2canvas(document.getElementById("contenido"), {
                onrendered: function (canvas) {
                    
                    
                    var img=canvas.toDataURL("image/png");
                    //document.getElementById("imagen").src=img;
                    var image=new Image();
                    image.src=img;

                    var loader = new THREE.TextureLoader();
                    var texture = loader.load(img); // Cambia la ruta a tu imagen
                    var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, });

                    
                    const geometry = new THREE.PlaneGeometry(300,60);
                    //const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
                    plane = new THREE.Mesh(geometry, material);
                    plane.rotation.z=3.15
                    plane.position.x=-40;
                    this.scene.add(plane);
                    //plane.position.set(0,0,0)
                    //this.scene.add(plane);
                    //this.plane.position.y = 90;
                    
                    
                    //canvas.toBlob(function(blob) {
                    //  saveAs(blob, "Dashboard.png"); 
                    //});
                    
                }
            });*/

        })
    }

    update() {
        
        /*
        if(this.duende!=null){
            this.duende.update();
        }
        if(this.environment!=null){
            this.environment.getAmbiente()
        }
        if (this.maxilar != null) {
            this.maxilar.update()
        }
        if (this.manoDerecha != null) {
            this.manoDerecha.update()
        }
        if (this.personaje != null) {
            this.personaje.update()
        }
        if (this.rana != null) {
            this.rana.update()
        }
        if (this.moverCopos != null) {
            this.updateCopo()
        }
        if (this.texto3dChristmas != null && this.texto3dPlayng != null) {
            //console.log(this.texto3dChristmas.mesh.position.z)
            //console.log(this.texto3dPlayng.mesh.position.z)
            //posiciones perfectas -300,100,800
            if (this.texto3dChristmas.mesh.position.x > -300) {
                this.texto3dChristmas.mesh.position.x -= 10
                this.texto3dChristmas.mesh.rotation.x -= 1;
                if (this.texto3dChristmas.mesh.position.x == -300) {
                    //console.log("posicion de rotacion en x: "+this.texto3dChristmas.mesh.rotation.x)
                    this.texto3dChristmas.mesh.rotation.x = 0;
                }
            }
            if (this.texto3dChristmas.mesh.position.z < 800) {
                this.texto3dChristmas.mesh.position.z += 20
            }
            //posicion perfecta -180,-100,800
            if (this.texto3dPlayng.mesh.position.x > -180) {
                this.texto3dPlayng.mesh.position.x -= 10
                this.texto3dPlayng.mesh.rotation.x -= 1;
                if (this.texto3dPlayng.mesh.position.x == -180) {
                    //console.log("posicion de rotacion en x: "+this.texto3dChristmas.mesh.rotation.x)
                    this.texto3dPlayng.mesh.rotation.x = 0;
                }
            }
            if (this.texto3dPlayng.mesh.position.z < 800) {
                this.texto3dPlayng.mesh.position.z += 20
            }

            if (this.texto3dChristmas.mesh.position.z == 800 && this.texto3dPlayng.mesh.position.z == 800) {
                //console.log("entro?")
                //this.superClass.banderaLetreros=true;
                this.texto3dChristmas.mesh.position.y += 1;
                this.texto3dPlayng.mesh.position.y -= 1;
                if (this.texto3dChristmas.mesh.position.y == 400 && this.texto3dPlayng.mesh.position.y == -400) {
                    if (this.texto3dChristmas.mesh.position.y == 400) {
                        for (var i = 0; i < this.scene.children.length; i++) {
                            var elemento = this.scene.children[i];
                            if (elemento.name === "titulo-christmas") {
                                this.scene.remove(elemento)
                            }
                        }
                    }
                    if (this.texto3dPlayng.mesh.position.y == -400) {
                        for (var i = 0; i < this.scene.children.length; i++) {
                            var elemento = this.scene.children[i];
                            if (elemento.name === "titulo-playing") {
                                this.scene.remove(elemento)
                            }
                        }
                    }
                }
            }
            //this.texto3dChristmas.mesh.position.z+=0.1
            //this.texto3dChristmas.mesh.rotation.x+=0.1
            if(this.reno!=null){
                this.reno.update()
            }
        }*/


        /*
        //this.cube.rotation.x += 0.01;
        if (this.neptuno != null) {
            this.neptuno.up();
        }
        if (this.jupiter != null) {
            this.jupiter.up()
        }
        if (this.tierra != null) {
            this.tierra.up()
        }
        if (this.mercurio != null) {
            this.mercurio.up();
            console.log("se ejecuto mercurio")
        }
        console.log("se ejecuto mercurio")*/

    }

}

//contenido comentdo del evento ready
//this.a=new A();
            //creamos un panel como login
/*this.login=new Login();
this.login.position.z=80
this.scene.add(this.login)*/

            //this.personaje=new Personaje();
            //lista de planetas
            //sol

/*
//mercurio,
this.mercurio = new Mercurio();
//venus,
this.venus=new Venus();
//tierra,
//listo y con movimiento
this.tierra = new Tierra();
//marte,
this.marte=new Marte();
//jupiter,
this.jupiter = new Jupiter();
//saturno,

//urano,

//neptuno
this.neptuno = new Neptuno();*/

//contenido del constructor
//this.control=new OrbitControls(this.superClass.camera,this.superClass.renderer.domElement);
        //funcion de teclado


/*const testMesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ wireframe: true })
)
this.scene.add(testMesh)

//este si funciona

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
this.cube = new THREE.Mesh(geometry, material);
this.scene.add(this.cube);*/

//metodo ready
/*this.resources.on('ready',()=>{
            //setub
            this.environment=new Environment()
        })*/