import * as THREE from './three.module.js'

//import Debug from './Debug.js'
import Sizes from './Sizes.js';
import Time from './Time.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import World from './World.js';

import Resources from './Resources.js'

import sources from './sources.js'
/*
import Enviroment from './Environment.js'
*/

let instance = null;

export default class SuperClass {
    constructor(_canvas) {
        // Singleton
        if (instance) {
            return instance
        }
        instance = this

        // Global access
        window.superClass= this

        // Options
        this.canvas = _canvas

        // Setup
        //this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)

        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        //el contador determinara la posicion de la letra que se usa
        this.contador=0;
        this.posicionY=0;
        this.posicionZ=0;
        this.banderaUser=false;
        this.banderaPassword=false;
        let banderaLetreros=false;
        
        //control orbitl
        //sthis.controls = new THREE.OrbitControls(this.camera, this.renderer);
        // Resize event
        this.sizes.on('resize', () => {
            console.log("resize")
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () => {
            this.update()
        })

    }

    crearEscenario(_name, _scala, _alias, _posY) //names: nivelBusqueda / scene / escenaBosqueAves
    {
        this.resource = this.resources.items[_name]
        console.log(this.resource)
        this.mapa = this.resource.scene
        this.mapa.scale.set(_scala, _scala, _scala)
        this.mapa.name = _alias
        this.mapa.position.y = _posY
        this.scene.add(this.mapa)

        /*
        this.Escenarios.push({
            mesh: this.mapa
        })
        */
        //this.experience.navegacion.prepararEntorno(_alias)
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    destroy() {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) => {
            // Test if it's a mesh
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose()

                // Loop through the material properties
                for (const key in child.material) {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if (value && typeof value.dispose === 'function') {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if (this.debug.active)
            this.debug.ui.destroy()
    }
}