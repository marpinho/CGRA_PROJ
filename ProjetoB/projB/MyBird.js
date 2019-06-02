class MyBird extends CGFobject {
    constructor(scene, fps) {
        super(scene);
        this.scene = scene;
        this.fps = fps;
        this.initBuffers();
    }

    h = 3;
    state = -this.h;

    degToRad(deg){
        return deg * Math.PI / 180.0;
    }

    initBuffers() {
        this.maxSpeed = 35/this.fps;
        this.acceleration = 2/this.fps;
        this.square = new MyUnitCubeQuad(this.scene);
        this.beak = new MyPyramid(this.scene, this.h, 3);
        this.wing = new MyQuad(this.scene);
        this.wingTip = new MyTriangle(this.scene);
        this.stick;

        this.position = [0, 3, 0];
        this.orientation = 0; //degrees with axis Oz

        this.speed = 0;
        this.lastIterationTime = (new Date()).getTime() % 1000;

        //Textures 
        this.penasTex = new CGFtexture(this.scene, 'images/penas6.jpg'); 
        this.penasMaterial = new CGFappearance(this.scene); 
        this.penasMaterial.setTexture(this.penasTex); 
       
        this.bicoTex = new CGFtexture(this.scene, 'images/bico1.jpg');
        this.bicoMaterial = new CGFappearance(this.scene); 
        this.bicoMaterial.setTexture(this.bicoTex); 
        
        this.olhoTex = new CGFtexture(this.scene, 'images/olho1.jpg'); 
        this.olhoMaterial = new CGFappearance(this.scene); 
        this.olhoMaterial.setTexture(this.olhoTex);

        this.scale = 1;
    }

    setAcceleration(a){
        this.acceleration = a/this.fps;
    }

    setScale(s){this.scale = s;}

    resetPos(){
        this.speed = 0;
        this.orientation = 0;
        this.position = [0, 3, 0];
    }

    getPos(){
        return this.position;
    }

    moveVerticaly(){
        this.state = this.h;
    }

    onFloor(){
        //console.log("test");
        this.scene.grabDrop();
    }

    grabedStick(stick) {
        this.stick = stick;

        this.stick.setPos(null, null, null);
    }
    dropedStick(){
        var x = this.position[0] + 1.5 * Math.sin(this.degToRad(this.orientation));
        var z = this.position[2] + 1.5 * Math.cos(this.degToRad(this.orientation));

        this.stick.setPos(x, z, this.orientation%360);

        var temp = this.stick;
        this.stick = null;

        return temp;
    }

    display() {

        //animacao cima/baixo
        var ms = (new Date()).getTime() % 1000;
        var t = parseInt("" + (ms) / 100);

        var oscilacao;

        if(t < 5){
            oscilacao = - t / 10.0 + 0.25;
        }
        else{
            oscilacao = -(10 - t) / 10.0 + 0.25;
        }

        if(this.state > -this.h) {

            var s = Math.sign(this.state);
            if(s == 0) s = -1;
            this.position[1] -= s / 20;
            if(this.position[1] + oscilacao < 0.75) this.position[1] = 0.75 - oscilacao;
            this.state -= 1 / 20;

            if(Math.abs(this.state) < 0.03) this.onFloor();
        }
        if(ms < this.lastIterationTime){


            ms += 1000;
        }
        var elapsedTime = ms - this.lastIterationTime;

        this.lastIterationTime = ms % 1000;

        this.move(elapsedTime);

        //animacao bater asas
        var ang = -oscilacao * 5 * (this.acceleration * this.fps) * ((5 * Math.abs(this.speed) * 10 / (this.fps * 2) ) + 0.5);

        oscilacao *= 1.5;


        this.position[1] = this.position[1] < 0 ? 0 : this.position[1];

        this.scene.pushMatrix();
        this.scene.scale(this.scale, this.scale, this.scale);

        this.penasMaterial.apply();
        //corpo
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1] + oscilacao, this.position[2]);
        this.scene.rotate(this.degToRad(this.orientation % 360),0,1,0);
        this.scene.scale(2,1.5,2);
        this.square.display();
        this.scene.popMatrix();

        //cabeca
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1] + oscilacao, this.position[2]);
        this.scene.rotate(this.degToRad(this.orientation % 360),0,1,0);
        this.scene.translate(0, 1, 1);
        this.scene.scale(1,1,1);
        this.square.display();
        this.scene.popMatrix();

        this.bicoMaterial.apply();
        //bico
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1] + oscilacao, this.position[2]);
        this.scene.rotate(this.degToRad(this.orientation % 360),0,1,0);
        this.scene.translate(0, 0.8, 1.5);
        this.scene.scale(0.2, 0.2, 0.5);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(-Math.PI/6, 0, 1, 0);
        this.beak.display();
        this.scene.popMatrix();

        this.olhoMaterial.apply();
        //olho esquerdo
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1] + oscilacao, this.position[2]);
        this.scene.rotate(this.degToRad(this.orientation % 360),0,1,0);
        this.scene.translate(-0.2, 1.15, 1.5);
        this.scene.scale(0.1, 0.1, 0.1);
        this.square.display();
        this.scene.popMatrix();

        //olho direito
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1] + oscilacao, this.position[2]);
        this.scene.rotate(this.degToRad(this.orientation % 360),0,1,0);
        this.scene.translate(0.2, 1.15, 1.5);
        this.scene.scale(0.1, 0.1, 0.1);
        this.square.display();
        this.scene.popMatrix();
        
        this.penasMaterial.apply();
        //asa esquerda
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1] + oscilacao, this.position[2]);
        this.scene.rotate(this.degToRad(this.orientation % 360),0,1,0);

        this.scene.rotate(this.degToRad(-ang*10), 0, 0, 1);
        this.scene.translate(-1, 0.2, -0.1);

        this.scene.rotate(-0.2, 0, 1, 0);
        this.scene.translate(-0.5, 0, 0);
        this.scene.scale(1.5, 1, 1);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.wing.display();
        this.scene.popMatrix();

        //asa direita
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1] + oscilacao, this.position[2]);
        this.scene.rotate(this.degToRad(this.orientation % 360),0,1,0);

        this.scene.rotate(this.degToRad(ang*10), 0, 0, 1);
        this.scene.translate(1, 0.2, -0.1);

        this.scene.rotate(0.2, 0, 1, 0);
        this.scene.translate(0.5, 0, 0);
        this.scene.scale(1.5, 1, 1);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.wing.display();
        this.scene.popMatrix();

        //ponta asa esquerda
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1] + oscilacao, this.position[2]);
        this.scene.rotate(this.degToRad(this.orientation % 360),0,1,0);

        this.scene.rotate(this.degToRad(-ang*10), 0, 0, 1);
        this.scene.translate(-1, 0.2, -0.1);
        this.scene.rotate(-0.2, 0, 1, 0);

        this.scene.translate(-1.2, 0, 0);
        this.scene.rotate(this.degToRad(-2.5*ang*10), 0, 0, 1);
        this.scene.scale(1.5, 1, 0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.wingTip.display();
        this.scene.popMatrix();

        //ponta asa direita
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1] + oscilacao, this.position[2]);
        this.scene.rotate(this.degToRad(this.orientation % 360),0,1,0);

        this.scene.rotate(this.degToRad(ang*10), 0, 0, 1);
        this.scene.translate(1, 0.2, -0.1);
        this.scene.rotate(0.2, 0, 1, 0);

        this.scene.translate(1.2, 0, 0);
        this.scene.rotate(this.degToRad(2.5*ang*10), 0, 0, 1);
        this.scene.scale(1.5, 1, 0.5);
        this.wingTip.display();
        this.scene.popMatrix();

        //pau
        if(this.stick != null){
            this.scene.pushMatrix();
            this.scene.translate(this.position[0], this.position[1] + oscilacao, this.position[2]);
            this.scene.rotate(this.degToRad(this.orientation % 360),0,1,0);
            this.scene.translate(-0.75, 0.8, 1.8);
            this.scene.rotate(Math.PI/2, 0, 1, 0);
            this.stick.display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();
    }

    move(time){
        this.position[2] -= Math.cos(-this.degToRad(this.orientation % 360)) * (this.speed * time / (1000/this.fps));
        this.position[0] += Math.sin(-this.degToRad(this.orientation % 360)) * (this.speed * time / (1000/this.fps));
    }


    updateSpeed(dir){
        if(dir < 0){
            this.speed += this.acceleration;
            if(this.speed > this.maxSpeed){
                this.speed = this.maxSpeed;
            }
        }
        else{
            this.speed -= this.acceleration;
            if(this.speed < -this.maxSpeed){
                this.speed = -this.maxSpeed;
            }
        }

    }

    turn(dir){
        this.orientation += 400/this.fps * Math.sign(-dir);
    }

}