class MyNest extends CGFobject {
    constructor(scene, x, z){
        super(scene);
        this.scene = scene;
        this.pos[x, 0.2, z];
        this.initBuffers();
    }

    getPos(){ return this.pos; }

    initBuffers() {

    }
}