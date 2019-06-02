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
        var fps = 60; //frame rate


        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clearDepth(1000.0);
        this.gl.clearColor(1, 1, 1, 1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);
        this.setUpdatePeriod(1000/fps);

        //other variables
        this.scaleFactor = 1.0;
        this.grabState = 0; //0-> normal  1-> holding branch
        this.birdScale = 1
        this.birdAcceleration = 2;

        this.axiom = "X"; // "X"; //
        this.ruleF = "FF"; // "FF"; //
        this.angle = 30.0;
        
        //Trees
        this.iterations = 4;
        this.rule_X = [];
        this.rule_X.push("F[-X][X]F[-X]+X");
        this.rule_X.push("F[-X][x]+X");
        this.rule_X.push("F[+X]-X");
        this.rule_X.push("F[/X][X]F[\\X]+X");
        this.rule_X.push("F[\X][X]/X");
        this.rule_X.push("F[/X]\X");
        this.rule_X.push("F[^X][X]F[&X]^X");
        this.rule_X.push("F[^X]&X");
        this.rule_X.push("F[&X]^X");

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.skybox = new MyCubeMap(this);
        this.house = new MyHouse(this);
        this.terrain = new MyTerrain(this);
        this.bird = new MyBird(this, fps);
        this.nest = new MyNest(this, 3, 7);
        this.stick = new MyTreeBranch(this, 0, 0);  
        this.LSPlant = new MyLSPlant(this);
        this.lightning = new MyLightning(this);

        // do initial plant generation
        this.LSPlant.generate(
            this.axiom,
            {
                "F": [ this.ruleF ],
                "X":  this.rule_X,
            },
            this.angle,
            this.iterations,
            this.scaleFactor
        );

        this.ruleX = "F[-X][X]F[-X]+FX";

        // do initial ligthning generation
        this.lightning.generate(
            this.axiom,
            {
                "F": [ this.ruleF ],
                "X":  [this.ruleX],
            },
            25.0,
            3,
            0.5
        );
        
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
        this.checkKeys(t);
    }

    goDown(){
        this.bird.moveVerticaly();
    }

    grabDrop(x, z){
        var margem = 6;

        if(this.grabState == 0) {
            var dist = Math.pow(Math.abs(this.stick.getPos()[0] - this.bird.getPos()[0]), 2) + Math.pow(Math.abs(this.stick.getPos()[2] - this.bird.getPos()[2]), 2);
            if ( dist < margem * margem ) {
                console.log("grabed");
                this.bird.grabedStick(this.stick);
                this.stick = null;
                this.grabState = 1;
            }
        }
        else{
            var dist = Math.pow(Math.abs(this.nest.getPos()[0] - this.bird.getPos()[0]), 2) + Math.pow(Math.abs(this.nest.getPos()[2] - this.bird.getPos()[2]), 2);
            if ( dist < margem * margem ) {
                console.log("droped");
                this.stick = this.bird.dropedStick();
                this.grabState = 0;
            }
            console.log("" + Math.sqrt(dist));
        }
    }

    checkKeys(t) {
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
        if (this.gui.isKeyPressed("KeyL")) {
            text+=" L ";
            keysPressed=true;     
            this.lightning.display();
        }
        if (this.gui.isKeyPressed("KeyR")) {
            text+=" L ";
            keysPressed=true;
            this.bird.resetPos();
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

        //Geral scale
        this.pushMatrix();
        this.scale(2,2,2);

        //TREES
        this.pushMatrix();
        this.translate(-12,0,-7);
        this.scale(0.4,0.4,0.4);
        for(var i = 0; i<4; i++){
            this.pushMatrix();

            this.translate(i*6,0,0);
            this.pushMatrix();
            this.rotate(-0.3*i*Math.PI, 0, 1, 0);
            this.LSPlant.display();
            this.popMatrix();

            for(var j = 1; j<3; j++){
                this.translate(0,0,9+i*5);
                this.pushMatrix();
                this.rotate(-0.3*i*Math.PI, 0, 1, 0);
                this.LSPlant.display();
                this.popMatrix();
            }
            this.popMatrix();
        }
        this.popMatrix();
        

        //HOUSE
        this.pushMatrix();
        this.translate(5,0,-5);
        this.scale(3,3,3);
        this.house.display();
        this.popMatrix();

        // LIGHTNING
        //this.pushMatrix();
        //this.translate(-10,10,-9);
        //this.rotate(0.2 *Math.PI, 0, 1, 1);
        //this.rotate(Math.PI, 0, 0, 1);
        //this.lightning.display();
        //this.popMatrix();


        //TERRAIN
        this.pushMatrix();
        this.terrain.display();
        this.popMatrix();

        //final gral scene scale
        this.popMatrix();


        //BIRD
        this.pushMatrix();
        this.bird.setScale(this.birdScale);
        this.bird.setAcceleration(this.birdAcceleration);
        this.bird.display();
        this.popMatrix();

         //STICK
        if(this.stick != null) {
            this.pushMatrix();
            this.scale(0.5,0.5,0.5);
            this.stick.display();
            this.popMatrix();
        }

        //NEST
        this.pushMatrix();
        this.nest.display();
        this.popMatrix();

        //CUBE MAP
        this.pushMatrix();
        this.skybox.display();
        this.popMatrix();

        this.popMatrix();

        // ---- END Primitive drawing section
    }
}