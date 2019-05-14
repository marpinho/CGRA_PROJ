class MyUnitCubeQuad extends CGFobject {
    constructor(scene, text) {
        super(scene);
        this.textures = text;
        this.initBuffers();
    }
    initBuffers() {
        this.quad = new MyQuad(this.scene);
        this.rad90 = Math.PI / 2;
  
    }

    display() {
        // face y-
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(this.rad90, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        //face y+
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-this.rad90, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        //face z+
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        //face z-

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        //face x+

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(this.rad90, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        //face x-

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-this.rad90, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

    }

    updateBuffers(){}
}

