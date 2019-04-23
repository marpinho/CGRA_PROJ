/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.textures = true;

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.displayNormals = false;
        this.selectedObject = 7;
        this.selectedTime = 0;

        //Objects connected to MyInterface
        this.skybox = new MyCubeMap(this);
        this.prism = new MyPrism(this,6);
        this.cylinder = new MyCylinder(this,6);
        this.tree = new MyTree(this,2, 0.5, 1.8, 1, 'images/trunk2.jpg', 'images/possibletree.jpg');
        this.treeGroup = new MyTreeGroupPatch(this, 0.3);
        this.treeRow = new MyTreeRowPatch(this, 0.3);
        this.house = new MyHouse(this);
        this.hills = new MyVoxelHill(this, 4);
        this.finalScene = new MyFinalScene(this);


        //objects vector
        this.objects = [this.prism, this.cylinder, this.tree, this.treeGroup, this.treeRow, this.house, this.hills, this.finalScene];
        this.objectIDs = { 'Prism' : 0, 'Cylinder' : 1, 'Tree' : 2, 'Tree Group' : 3, 'Tree Row' : 4, 'House' : 5, 'Hills': 6, 'FinalScene' : 7};

        //other variables
        this.scaleFactor = 1.0;
        this.time = [false, true];
        this.timeID = {'Day' : 0, 'Night' : 1};

    }

    hexToRgbA(hex)
    {
        var ret;
        //either we receive a html/css color or a RGB vector
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            ret=[
                parseInt(hex.substring(1,3),16).toPrecision()/255.0,
                parseInt(hex.substring(3,5),16).toPrecision()/255.0,
                parseInt(hex.substring(5,7),16).toPrecision()/255.0,
                1.0
            ];
        }
        else
            ret=[
                hex[0].toPrecision()/255.0,
                hex[1].toPrecision()/255.0,
                hex[2].toPrecision()/255.0,
                1.0
            ];
        return ret;
    }

    initLights() {
        this.light = 0.7;

        //sol
        this.lights[0].setPosition(5, 50, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setSpecular(1, 1, 1, 1);
        this.lights[0].setAmbient(this.hexToRgbA('#ffd633'));
        this.lights[0].constant_attenuation = 0.1;
        this.lights[0].enable();
        this.lights[0].setVisible(true);
        this.lights[0].update();

        //lua
        this.lights[1].setPosition(15, 50, -7.5, 1.0);
        this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].setSpecular(1, 1, 1, 1);
        this.lights[1].setAmbient(this.hexToRgbA('#b3ffff'));
        this.lights[1].linear_attenuation = 0.05;
        this.lights[1].disable();
        this.lights[1].setVisible(true);
        this.lights[1].update();

        //lanterna
        this.lights[2].setPosition(0, 0.5, 3, 1.0);
        this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[2].setSpecular(1, 1, 1, 1);
        this.lights[2].setAmbient(this.hexToRgbA('#fffd33'));
        this.lights[2].linear_attenuation = 0.1;
        this.lights[2].disable();
        this.lights[2].setVisible(true);
        this.lights[2].update();


    }
    initCameras() {
        this.camera = new CGFcamera(0.5, 0.1, 500, vec3.fromValues(4, 18, 60), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    updateLightTime(){

        if(this.time[this.selectedTime]) { // aka noite
            this.light = 2;

            this.lights[0].disable();
            this.lights[1].enable();
            this.lights[2].enable();

            this.lights[0].update();
            this.lights[1].update();
            this.lights[2].update();

        }
        else{ // aka dia
            this.light = 4;

            this.lights[0].enable();
            this.lights[1].disable();
            this.lights[2].disable();

            this.lights[0].update();
            this.lights[1].update();
            this.lights[2].update();

        }

        this.setGlobalAmbientLight(this.light, this.light, this.light, 1.0);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        if(this.textures)
            this.enableTextures(true);
        else
            this.enableTextures(false);

        // Draw axis
        this.axis.display();

        //Apply default appearance
        this.setDefaultAppearance();

        //updates day/night lightning
        this.updateLightTime();


        // ---- BEGIN Primitive drawing section

        //this.materials[this.selectedMaterial].apply();

        this.pushMatrix();
        this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);

        if (this.displayNormals){
            if(this.objects[this.selectedObject] == this.prism
            ||this.objects[this.selectedObject] == this.cylinder){
                 this.objects[this.selectedObject].enableNormalViz();
            }
        }
            
        else
            this.objects[this.selectedObject].disableNormalViz();

        this.objects[this.selectedObject].display();
        this.popMatrix();


        // Display Skybox
        this.skybox.display(this.time[this.selectedTime]);


        // ---- END Primitive drawing section
    }
}