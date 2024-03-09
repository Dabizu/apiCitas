import * as THREE from './three.module.js'
import SuperClass from './SuperClass.js';
export default class EventoClick {
    constructor(camera) {
        this.superClass = new SuperClass();

        var mouse = new THREE.Vector2();
        this.renderer = this.superClass.renderer;

        window.addEventListener('mousemove', function (e) {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
            var raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);
            this.scene = this.superClass.scene;
            const intersects = raycaster.intersectObjects(this.scene.children, true);
            if (intersects.length > 0) {
                if (this.INTERSECTED != intersects[0].object) {
                    console.log(intersects[0].object.name);
                    if (intersects[0].object.name === "cajaUser") {
                        window.superClass.banderaUser=true;
                        console.log(window.superClass.banderaUser);
                        window.superClass.banderaPassword=false;
                    }
                    if (intersects[0].object.name === "cajaPassword") {
                        window.superClass.banderaPassword=true;
                        console.log(window.superClass.banderaPassword);
                        window.superClass.banderaUser=false;
                    }
                } else {
                    if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
                    this.INTERSECTED = null;
                }
            }
        });
        window.addEventListener('click', function (e) {
            console.log("holas")
        })
    }
}
/*
export default class Punto {
    raycaster;
    INTERSECTED;
    pointer;
    div;
    camera;
    scene;
    constructor(nombreDiv, scene, camera, ray, pointerNuevo) {
        this.div = document.getElementById(nombreDiv);
        this.div.setAttribute("style", "position: absolute; background-color: none; width: 10px; height: 10px; -moz-border-radius: 50%;" +
            "-webkit-border-radius: 50%; border-radius: 50%;")
        this.scene = scene;
        this.camera = camera;
        this.raycaster = ray;
        this.pointer = pointerNuevo;
    }
    puntoGrafico(x, y, radio) {
        this.pointer.x = (x / window.innerWidth) * 2 - 1;
        this.pointer.y = -(y / window.innerHeight) * 2 + 1;
        this.div.style.left = x - radio + 'px';
        this.div.style.top = y - radio + 'px';
    }
    detect() {
        this.raycaster.setFromCamera(this.pointer, this.camera.instance);
        const intersects = this.raycaster.intersectObjects(this.scene.children, false);
        if (intersects.length > 0) {
            if (this.INTERSECTED != intersects[0].object) {
                //console.log("si detecto el objeto");
                //console.log(intersects[0].object.name)
                const found = arreglo.find(element => element === intersects[0].object.name);
                if ((found === undefined)&&(intersects[0].object.name==="aguilareal" || intersects[0].object.name==="periquitocatarino" || intersects[0].object.name==="halconperegrino" || intersects[0].object.name==="lavanderablanca" || intersects[0].object.name==="martinpescador" || intersects[0].object.name==="garzareal")) {
                    const Http = new XMLHttpRequest();
                    const url='/animales?alias='+intersects[0].object.name;
                    Http.open("GET", url);
                    Http.send();

                    Http.onreadystatechange = (e) => {
                        // console.log("la consulta fue realizada")
                        // console.log(Http.responseText)
                        try {
                            var jsonAnimales=JSON.parse(Http.responseText.toString())
                            dameVentana(jsonAnimales[0].nombre,jsonAnimales[0].imagen)
                        } catch (error) {
                            console.log(error)
                        }
                        
                    }
                    arreglo.push(intersects[0].object.name);
                    // console.log("nombre del objeto: "+intersects[0].object.name)
                    //pedirAve(intersects[0].object.name);
                    
                    if (arreglo.length === 5) {
                        document.getElementById("puntaje").style="display:block; transform:translateX(500px);"
                        window.stop();
                        var audio = document.createElement('audio');
                        audio.src = '../../static/audio/winner.mp3';
                        audio.setAttribute("id","audio");
                        audio.addEventListener('loadedmetadata', function () {
                            var duration = audio.duration;
                            const music = new Audio('../../static/audio/winner.mp3');
                            music.play();
                            music.loop = false;
                            music.playbackRate = 1;
                        }, false);
                        //alert("Haz encontrado todos los objetos!!");
                        //insertarDatos()
                    }
                }
            }
        } else {
            if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
            this.INTERSECTED = null;
        }
    }

}*/