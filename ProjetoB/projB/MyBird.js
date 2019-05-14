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
        this.head = new MyUnitCubeQuad(this.scene);
        this.body = new MyUnitCubeQuad(this.scene);
        this.eye = new MyCubeMap(this.scene);
        this.beak = new MyPyramid(this.scene, 3, 3);
        this.position = [0, 5, 0];
        this.orientation = 45; //degrees with axis Oz
    }

    display() {
        //corpo
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.rotate(this.degToRad(this.orientation % 360),0,1,0);
        this.scene.scale(2,1.5,2);
        this.body.display();
        this.scene.popMatrix();

        //cabeca
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.rotate(this.degToRad(this.orientation % 360),0,1,0);
        this.scene.translate(0, 1, 1);
        this.scene.scale(1,1,1);
        this.body.display();
        this.scene.popMatrix();


    }

    move(dir){
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