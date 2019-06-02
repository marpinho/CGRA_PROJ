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

        var fps = 50; //frame rate

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(10000.0);
        this.gl.clearColor(1, 1, 1, 1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);
        this.setUpdatePeriod(1000/fps);

    
        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.selectedObject = 2;
        this.skybox = new MyCubeMap(this);


        //Objects connected to MyInterface
        this.house = new MyHouse(this);
        this.bird = new MyBird(this, fps);
        this.finalScene = new MyFinalScene(this);
        this.nest = new MyNest(this, 0, 0);
        this.stick = new MyTreeBranch(this, 0, 0);


        //objects vector
        this.objects = [ this.house, this.bird, this.finalScene, ];
        this.objectIDs = {'House' : 0, 'Bird': 1, 'FinalScene' : 2};

        //other variables
        this.scaleFactor = 1.0;
        this.grabState = 0; //0-> normal  1-> holding branch
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.5, 0.1, 500, vec3.fromValues(2, 50, 2), vec3.fromValues(0, 0, 0));
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

    goDown(){
        this.bird.moveVerticaly();
    }

    grabDrop(x, z){
        var margem = 2;

        if(this.grabState == 0) {
            if (Math.abs(this.stick.getPos()[0] - this.bird.getPos()[0]) < margem && Math.abs(this.stick.getPos()[2] - this.bird.getPos()[2]) < margem) {
                console.log("grabed");
                this.bird.grabedStick(this.stick);
                this.stick = null;
                this.grabState = 1;
            }
        }
        else{
            if (Math.abs(this.nest.getPos()[0] - this.bird.getPos()[0]) < margem && Math.abs(this.nest.getPos()[2] - this.bird.getPos()[2]) < margem) {
                console.log("droped");
                this.stick = this.bird.dropedStick();
                this.grabState = 0;
            }
        }
    }

    checkKeys() {
        var text="Keys pressed: ";
        var keysPressed=false;
// Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            text+=" W ";
            keysPressed=true;
            this.bird.updateSpeed(1);
        }
        if (this.gui.isKeyPressed("KeyS")) {
            text+=" S ";
            keysPressed=true;
            this.bird.updateSpeed(-1);
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
        if (this.gui.isKeyPressed("KeyP")) {
            text+=" P ";
            keysPressed=true;
            this.goDown();
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

        if(this.stick != null) {
            this.stick.display();
        }

        this.popMatrix();

        this.pushMatrix();
        this.bird.display();
        this.popMatrix();


        // ---- END Primitive drawing section

        //display skybox
        //this.skyBox.display();

        // ---- END Primitive drawing section

        
    }
}