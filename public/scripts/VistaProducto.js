import * as THREE from './motor/three.module.js';
//import SuperClass from '../SuperClass.js';
export default class VistaProducto {
    constructor(){
        html2canvas(document.getElementById("contenido"), {
            onrendered: function (canvas) {
                //theCanvas = canvas;
                //document.body.appendChild(canvas);
                this.textura = new THREE.CanvasTexture(canvas);
                this.material = new THREE.MeshBasicMaterial({ map: this.textura, transparent: true, opacity: 0.5 });
                var longitudTotal = 10 * 10;
                const geometry = new THREE.PlaneGeometry(longitudTotal, 10);
                //const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
                this.plane = new THREE.Mesh(geometry, this.material);
                //this.scene.add(plane);
                //this.plane.position.y = 90;
                
                /*
                canvas.toBlob(function(blob) {
                  saveAs(blob, "Dashboard.png"); 
                });
                */
            }
        });
        console.log(this.plane)
        return this.plane;
    }

    /*
    constructor(texto, longitud) {
        
        this.ctx = document.createElement("canvas").getContext("2d");
        
        var size = 32;
        //codigo que pone texto
        this.ctx.font = `${size}px bold sans-serif`;
        // measure how long the name will be
        const borderSize = 2;
        const doubleBorderSize = borderSize * 2;
        //var texto="hola";

        const width = this.ctx.measureText(texto).width + doubleBorderSize;
        const height = size + doubleBorderSize;
        this.ctx.canvas.width = width;
        this.ctx.canvas.height = height;

        // need to set font again after resizing canvas
        this.ctx.font = `${size}px bold sans-serif`;
        this.ctx.textBaseline = 'top';
        //se agrega color al canvas si se deja vacio queda negro
        this.ctx.fillStyle = '';
        //aqui se especifica el tamaño de canvas
        this.ctx.fillRect(0, 0, width, height);
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(texto, borderSize, borderSize);
        //hasta aqui pone texto

        this.textura = new THREE.CanvasTexture(this.ctx.canvas);
        this.material = new THREE.MeshBasicMaterial({ map: this.textura, transparent: true, opacity: 0.5 });
        var longitudTotal = longitud * texto.length;
        const geometry = new THREE.PlaneGeometry(longitudTotal, longitud);
        //const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        this.plane = new THREE.Mesh(geometry, this.material);
        //this.scene.add(plane);
        //this.plane.position.y = 90;
        return this.plane;
    }*/
}