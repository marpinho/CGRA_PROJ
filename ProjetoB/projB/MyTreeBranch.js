class MyTreeBranch extends CGFobject {
    constructor(scene, x, z){
        super(scene);
        this.scene = scene;
        this.pos = [x, 0.17, z];
        this.initBuffers();
    }

    initBuffers() {
        this.ramo = new MyCylinder(this.scene, 6);
    }

    getPos(){ return this.pos; }

    display() {
        this.scene.pushMatrix();

        this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(0.15, 2, 0.15);

        this.ramo.display();

        this.scene.popMatrix();
    }
}