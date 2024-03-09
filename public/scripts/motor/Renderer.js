import * as THREE from './three.module.js';
import SuperClass from './SuperClass.js';

export default class Renderer
{
    constructor()
    {
        this.superClass = new SuperClass()
        this.canvas = this.superClass.canvas
        this.sizes = this.superClass.sizes
        this.scene = this.superClass.scene
        this.camera = this.superClass.camera

        this.setInstance()
    }
    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha:true
        })
        //this.instance.setClearColor(0x000000, 0);
        this.instance.physicallyCorrectLights = true
        this.instance.outputEncoding = THREE.sRGBEncoding
        this.instance.toneMapping = THREE.CineonToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor('#211d20')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        //this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    update()
    {
        this.instance.render(this.scene, this.camera.instance)
    }
}