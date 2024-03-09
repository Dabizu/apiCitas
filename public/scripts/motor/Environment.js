import SuperClass from "./SuperClass.js";
import * as THREE from "./three.module.js";
export default class Environment {
    constructor() {
        this.superClass = new SuperClass()
        this.scene = this.superClass.scene
        //this.renderer=this.superClass.renderer
        //añadimos las luces
        this.scene.add(this.getLuzAmbiental());
        //this.scene.add(this.setSunLight())
        this.scene.add(this.getLuzClara())
        //this.setSunLight()
        this.date=new Date();
        //atardecer
        //this.scene.background = new THREE.Color( "#FCE251" );
        //this.scene.background = new THREE.Color( "#FCCD51" );
        //this.scene.background = new THREE.Color( "#FCBE51" );
        //this.scene.background = new THREE.Color( "#F9AD29" );
        //this.scene.background = new THREE.Color( "#F99429" );
        //this.scene.background = new THREE.Color( "#FB8202" );

        //dia plano
        //this.scene.background = new THREE.Color( "#85EBF9" );

        //noche
        //this.scene.background = new THREE.Color( "#07014F" );
        //this.scene.background = new THREE.Color( "#FCE251" );
        //this.scene.background = new THREE.Color( "#FCE251" );
        //this.scene.background = new THREE.Color( "#FCE251" );
        //this.scene.background = new THREE.Color( "#FCE251" );
        //this.scene.background = new THREE.Color( "#FCE251" );
        //this.scene.background = new THREE.Color( "#FCE251" );
    }
    setSunLight() {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(3, 3, - 2.25)
        return this.sunLight;
        //this.scene.add(this.sunLight)
    }
    getLuzAmbiental() {
        const luzAmbiental = new THREE.AmbientLight(0x404040);
        return luzAmbiental;
    }
    getLuzClara() {
        var hemiLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.6);
        hemiLight.position.set(0, 500, 0);
        return hemiLight;
    }
    getAmbiente(){
        //console.log(this.date.getHours())
        
    }
}