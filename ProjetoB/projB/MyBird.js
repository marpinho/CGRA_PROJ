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
        this.position = [0, 5, 0];
        this.orientation = 45; //degrees with axis Oz
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.rotate(this.degToRad(this.orientation % 360),0,1,0);
        this.scene.scale(2,1.5,2);
        this.body.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.rotate(this.degToRad(this.orientation % 360),0,1,0);
        this.scene.translate(0, 1, 1);
        this.scene.scale(1,1,1);
        this.body.display();
        this.scene.popMatrix();
    }

    move(dir){
        if(dir > 0){
            this.position[3] -= Math.cos(this.degToRad(this.orientation % 360));
            this.position[0] += Math.sin(this.degToRad(this.orientation % 360));
        }
        else{
            this.position[3] += Math.cos(this.degToRad(this.orientation % 360));
            this.position[0] -= Math.sin(this.degToRad(this.orientation % 360));
        }
    }

    turn(dir){
        if(dir > 0){
            this.orientation += 10;
        }
        else{
            this.orientation -= 10;
        }
    }

}