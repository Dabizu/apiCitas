import * as THREE from './three.module.js';
import SuperClass from './SuperClass.js'
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor()
    {
        this.superClass = new SuperClass()
        this.sizes = this.superClass.sizes
        this.scene = this.superClass.scene
        //this.canvas = this.superClass.canvas

        //this.setInstance()
        //this.setControls()
        this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 5000)
        //this.instance.position.set(6, 4, 8)
        this.instance.position.x=0;
        this.instance.position.y=0;
        //alejate o ve al fondo
        this.instance.position.z=5;
        //this.scene.add(this.instance)
        this.setInstance()
    }

    setInstance()
    {
        //this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 1000)
        //this.instance.position.set(6, 4, 8)
        //this.instance.position.z=5;
        this.scene.add(this.instance)
    }
/*
    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }*/

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        //this.controls.update()
    }
}