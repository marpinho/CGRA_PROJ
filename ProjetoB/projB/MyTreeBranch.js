class MyTreeBranch extends CGFobject {
    constructor(scene, x, z){
        super(scene);
        this.scene = scene;
        this.pos = [x, 0.17, z];
        this.initBuffers();
    }

    initBuffers() {
        this.ramo = new MyCylinder(this.scene, 6);
        this.orientation = 0;

        //Texture
        this.nestTex = new CGFtexture(this.scene, 'images/nest.jpg');
        this.nestMaterial = new CGFappearance(this.scene);
        this.nestMaterial.setTexture(this.nestTex);
    }

    getPos(){ return this.pos; }

    setPos(x, z, o) {
        this.pos[0] = x;
        this.pos[2] = z;

        this.orientation = o;
    }

    display() {

        this.nestMaterial.apply();

        this.scene.pushMatrix();

        if(this.pos[0] != null && this.pos[2] != null && this.orientation != null) {
            this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
            this.scene.rotate(this.degToRad(this.orientation % 360 + 90 ), 0, 1, 0);
            this.scene.translate(0, 0, -0.75);
        }
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(0.2, 1, 0.2);

        this.ramo.display();

        this.scene.popMatrix();
    }

    degToRad(deg){
        return deg * Math.PI / 180.0;
    }
}