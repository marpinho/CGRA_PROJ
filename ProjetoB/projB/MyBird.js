class MyBird extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.initBuffers();
    }


    degToRad(deg){
        return deg * Math.PI / 180.0;
    }

    initBuffers() {
        this.square = new MyUnitCubeQuad(this.scene);
        this.beak = new MyPyramid(this.scene, 3, 3);
        this.wing = new MyQuad(this.scene);
        this.wingTip = new MyTriangle(this.scene);

        this.position = [0, 3, 0];
        this.lastPosition = this.position;
        this.orientation = 0; //degrees with axis Oz
    }

    display() {

        //animacao cima/baixo
        var t = parseInt("" + ((new Date()).getTime() % 1000) / 100);

        var oscilacao;

        if(t < 5){
            oscilacao = - t / 10.0 + 0.25;
        }
        else{
            oscilacao = -(10 - t) / 10.0 + 0.25;
        }

        //animacao bater asas
        var speed = Math.abs(this.position[0] - this.lastPosition[0]) + Math.abs(this.position[2] - this.lastPosition[2]);
        var ang = oscilacao * 10 * (2 * speed + 1) / 2;

        //console.log(speed);


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
    }

    move(dir){

        this.lastPosition = this.position;

        if(dir < 0){
            this.position[2] -= Math.cos(-this.degToRad(this.orientation % 360));
            this.position[0] += Math.sin(-this.degToRad(this.orientation % 360));
        }
        else{
            this.position[2] += Math.cos(-this.degToRad(this.orientation % 360));
            this.position[0] -= Math.sin(-this.degToRad(this.orientation % 360));
        }

    }

    turn(dir){
        if(dir < 0){
            this.orientation += 13;
        }
        else{
            this.orientation -= 13;
        }
    }

}