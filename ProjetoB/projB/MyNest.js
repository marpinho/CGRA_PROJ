class MyNest extends CGFobject {
    constructor(scene, x, z){
        super(scene);
        this.scene = scene;
        this.pos = [x, 0.2, z];
        this.initBuffers();
    }

    getPos(){ return this.pos; }

    initBuffers() {
        this.cylinder = new MyCylinder(this.scene, 8);

        //Texture
        this.nestTex = new CGFtexture(this.scene, 'images/nest.jpg');
        this.nestMaterial = new CGFappearance(this.scene);
        this.nestMaterial.setTexture(this.nestTex);
    }

    display() {
        this.nestMaterial.apply();

        this.scene.pushMatrix();

        this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
        this.scene.scale(2, 2, 2);
        this.cylinder.display();

        this.scene.popMatrix();
    }
}