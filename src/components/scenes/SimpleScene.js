import * as Dat from 'dat.gui';
import { Scene, Color, Plane } from 'three';
import { SphereBufferGeometry, MeshPhongMaterial, BufferAttribute, Mesh, DoubleSide, ShaderMaterial} from 'three';
import { Flower, Land, Wall } from 'objects';
import { BasicLights } from 'lights';
import { CustomShader } from 'shaders'
import { Vector4, Vector3, PlaneBufferGeometry, BoxBufferGeometry, AxesHelper} from 'three';


class SimpleScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 0,
            updateList: [],
            color: new Color('white'),
        };

        const lights = new BasicLights();


        this.add( new AxesHelper(3));



        let width = 40;
        let height = 7;
        let spacing = 7;
        let wall1 = new Wall({width: width, height:height, segments:32, color: 0x000000, wallPos: new Vector3(-width*0.35, 0, spacing), margin: 0.3, padding: 0.2, n:8});
        let wall2 = new Wall({width: width, height:height, segments:32, color: 0x000000, wallPos: new Vector3(-width*0.35, 0, -spacing), margin: 0.3, padding: 0.2, n:8});

        this.wall1 = wall1;

        this.wall2 = wall2;
        this.add(wall1, wall2, lights);

        this.addToUpdateList(wall1);
        this.addToUpdateList(wall2);


        // // Set background to a nice color
        this.background = new Color(0x7ec0ee);
        let radius = 1.5;
        const sphereGeom = new SphereBufferGeometry(radius, 16, 16);
        const material = new MeshPhongMaterial( { color: 0xff1124, specular: 0x666666, emissive: 0xff0000, shininess: 100, opacity: 1, transparent: false } );
        const sphere = new Mesh( sphereGeom, material );
        sphere.position.x -= 4;
        sphere.position.y -= height/2 - radius;
    

        // now populate the array of attributes

        class ColorGUIHelper {
            constructor(object, prop) {
                this.object = object;
                this.prop = prop;
            }

            get value() {
                return `#${this.object[this.prop].getHexString()}`;
            }

            set value(hexString) {
                debugger;
                // this.object[this.prop].set(hexString);
                // let colorAsVec4 = new Vector4(  this.object[this.prop].r,
                //                                 this.object[this.prop].g,
                //                                 this.object[this.prop].b, 1.0);
                // this.object['uniforms']['color_dark']['value'] = colorAsVec4
            }
        }

        this.delta = 0;
        this.intDel = 0;
        this.add( sphere );
        // Populate GUI
        this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
        this.state.gui.addColor(new ColorGUIHelper(this.state, 'color'), 'value').name('color')
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        this.delta += 0.1;
        const { rotationSpeed, updateList, uniforms } = this.state;
        // this.rotation.y = (rotationSpeed * timeStamp) / 10000;

        // uniforms.delta.value = 0.5 + Math.sin(this.delta) * 0.5;

        this.intDel += 1;
        if (this.intDel % 30 == 0){
        //     let vertexDisplacement = new Float32Array(this.geometry.attributes.position.count);
        //     for (let i = 0; i < vertexDisplacement.length; i++) {
        //         vertexDisplacement[i] = Math.random()/5.0;
        //     }
    
        //     this.geometry.setAttribute('vertexDisplacement', new BufferAttribute(vertexDisplacement, 1));
        // }
            let newInts = new Float32Array(this.wall1.stripNum);
            for (let i = 0; i < this.wall1.stripNum; i++ ) {
                newInts[i] = Math.random();
            }

            this.wall1.setStripIntensities(newInts);
            this.wall2.setStripIntensities(newInts);
        }   
        

        //Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}

export default SimpleScene;
