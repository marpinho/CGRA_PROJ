class MyBranch extends CGFobject {
    constructor(scene){
        super(scene);
        this.initBuffers();
    }
  
    initBuffers() {
        this.trunk = new MyCylinder(this.scene,4);

        this.trunkTex = new CGFtexture(this.scene, 'images/trunk2.jpg');
        this.trunkMaterial = new CGFappearance(this.scene);
        this.trunkMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.trunkMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.trunkMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.trunkMaterial.setShininess(10.0);
        this.trunkMaterial.setTexture(this.trunkTex);
    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(0.5,1,0.5);
        this.trunkMaterial.apply();
        this.trunk.display();
        this.scene.popMatrix()
    }

}