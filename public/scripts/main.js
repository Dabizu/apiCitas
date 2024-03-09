import SuperClass from './motor/SuperClass.js';
const superClass = new SuperClass(document.querySelector('canvas.webgl'))

/*
import * as THREE from '../three.module.js';
//import VistaProducto from './VistaProducto.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 1000, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
*/
/*
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );*/
/*
const geometry = new THREE.PlaneGeometry( 5, 5 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );*/

//var vistaProducto = new VistaProducto();
/*
var plane;
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
        scene.add(plane);
        //plane.position.set(0,0,0)
        //this.scene.add(plane);
        //this.plane.position.y = 90;
        
        
        //canvas.toBlob(function(blob) {
        //  saveAs(blob, "Dashboard.png"); 
        //});
        
    }
});

camera.position.z = 80;

function animate() {
	requestAnimationFrame( animate );

	plane.rotation.x += 0.01;
	//plane.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();
*/
//theCanvas = canvas;
        //document.body.appendChild(canvas);
        /*
        var textura = new THREE.CanvasTexture(canvas);
        const geometry = new THREE.PlaneGeometry( 5, 5 );
        const material = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide, map:textura} );
        const plane = new THREE.Mesh( geometry, material );
        scene.add( plane );*/
        

/*
        var textura = new THREE.CanvasTexture(canvas);
        var material = new THREE.MeshBasicMaterial({  transparent: false, opacity: 0.5, side: THREE.DoubleSide, map: textura });
        var largo=10*5, ancho=10;*/