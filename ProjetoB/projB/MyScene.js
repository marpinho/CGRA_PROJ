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

        var fps = 20; //frame rate

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);
        this.setUpdatePeriod(1000/fps);

        

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.selectedObject = 0;
        this.skybox = new MyCubeMap(this);


        //Objects connected to MyInterface
        this.house = new MyHouse(this);
        this.bird = new MyBird(this);
        this.finalScene = new MyFinalScene(this);


        //objects vector
        this.objects = [ this.house, this.bird, this.finalScene, ];
        this.objectIDs = {'House' : 0, 'Bird': 1, 'FinalScene' : 2};

        //other variables
        this.scaleFactor = 1.0;
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
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

    update(t){
        this.checkKeys();
    }

    checkKeys() {
        var text="Keys pressed: ";
        var keysPressed=false;
// Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            text+=" W ";
            keysPressed=true;
            this.bird.move(1);
        }
        if (this.gui.isKeyPressed("KeyS")) {
            text+=" S ";
            keysPressed=true;
            this.bird.move(-1);
        }
        if (this.gui.isKeyPressed("KeyA")) {
            text+=" A ";
            keysPressed=true;
            this.bird.turn(-1);
        }
        if (this.gui.isKeyPressed("KeyD")) {
            text+=" D ";
            keysPressed=true;
            this.bird.turn(1);
        }
        if (keysPressed)
            console.log(text);
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

        // Draw axis
        this.axis.display();

        //Apply default appearance
        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section


        this.pushMatrix();
        this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
        this.objects[this.selectedObject].display();
        this.popMatrix();

        // ---- BEGIN Primitive drawing section

        this.bird.display();


        // ---- END Primitive drawing section

        //display skybox
        //this.skyBox.display();

        // ---- END Primitive drawing section

        
    }
}