//import Experience from '../Experience/Experience/Experience.js'
import * as THREE from './three.module.js';
//import { GLTFLoader } from './lib/GLTFLoader.js';
import EventEmitter from './EventEmitter.js';
import { FBXLoader } from './jsm/loaders/FBXLoader.js';
import { OBJLoader } from './jsm/loaders/OBJLoader.js';
import { STLLoader } from './jsm/loaders/STLLoader.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';

import { FontLoader } from './jsm/loaders/FontLoader.js';

export default class Resources extends EventEmitter {
    constructor(sources) {
        super()
        //Option

        this.sources = sources

        //Setup
        this.items = []
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()

    }


    setLoaders() {
        this.loaders = {}
        this.loaders.fbxLoader = new FBXLoader()
        this.loaders.objLoader = new OBJLoader()
        this.loaders.stlLoader = new STLLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTexture = new THREE.CubeTextureLoader()

        this.loaders.fontLoader=new FontLoader()
        this.loaders.gltfLoader=new GLTFLoader()

    }

    startLoading() {
        //Load each source
        for (const source of this.sources) {
            if (source.type === 'fbxModel') {
                console.log("entro 1")
                this.loaders.fbxLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                        //console.log(source, file)
                    }
                )
                /*this.items[source.name]=source.path
                console.log("direccion de nuestro personaje: "+this.items["personaje"])*/
            }
            else if (source.type === 'gltfModel') {
                console.log("entro 1")
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                        //console.log(source, file)
                    }
                )
                /*this.items[source.name]=source.path
                console.log("direccion de nuestro personaje: "+this.items["personaje"])*/
            }
            else if (source.type === 'objModel') {
                console.log("entro 2")
                this.loaders.objLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                        //console.log(source, file)
                    }
                )
                /*this.items[source.name]=source.path
                console.log("direccion de nuestro personaje: "+this.items["personaje"])*/
            } 
            else if (source.type === 'stlModel') {
                console.log("se crgo modelo stl")
                this.loaders.stlLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                        //console.log(source, file)
                    }
                )
                /*this.items[source.name]=source.path
                console.log("direccion de nuestro personaje: "+this.items["personaje"])*/
            } 
            else if (source.type === 'material') {
                console.log("material")
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                        //console.log("meterial cargado")
                    }
                )
            } 
            else if (source.type === 'cubeTexture') {
                this.loaders.cubeTexture.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    }
                )
            }
            else if (source.type === 'json') {
                this.loaders.fontLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    }
                )
            }
        }
    } //END startLoading()

    sourceLoaded(source, file) {
        this.items[source.name] = file
        this.loaded++

        if (this.loaded === this.toLoad) {
            this.trigger('ready')
        }

    } //END sourceLoaded()

}