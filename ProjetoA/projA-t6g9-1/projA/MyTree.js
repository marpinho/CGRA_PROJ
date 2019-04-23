class MyTree extends CGFobject {
    constructor(scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, trunkTexture,
                treeTopTexture){
        super(scene);

        this.trunkHeight = trunkHeight;
        this.trunkRadius = trunkRadius;
        this.treeTopHeight = treeTopHeight;
        this.treeTopRadius = treeTopRadius;
        this.trunkTexture = trunkTexture;
        this.treeTopTexture = treeTopTexture;

        this.initBuffers()
    }

    initBuffers() {
        this.trunk = new MyCylinder(this.scene,10);
        this.top = new MyCone(this.scene, 10);

        this.topTex = new CGFtexture(this.scene, this.treeTopTexture );
        this.trunkTex = new CGFtexture(this.scene, this.trunkTexture);

   
        this.topMaterial = new CGFappearance(this.scene);
        this.topMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.topMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.topMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.topMaterial.setShininess(10.0);
        this.topMaterial.setTexture(this.topTex);

        this.trunkMaterial = new CGFappearance(this.scene);
        this.trunkMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.trunkMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.trunkMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.trunkMaterial.setShininess(10.0);
        this.trunkMaterial.setTexture(this.trunkTex);
    }

    display(){
        //trunk
        this.scene.pushMatrix();
        this.trunkMaterial.apply();

        //this.scene.translate(0, 0.5, 0);
        this.scene.scale(this.trunkRadius, this.trunkHeight, this.trunkRadius);
        this.trunk.display();
        this.scene.popMatrix();


        //top
        this.topMaterial.apply();
        this.scene.pushMatrix();

        this.scene.translate(0, this.trunkHeight, 0);
        this.scene.scale(this.treeTopRadius, this.treeTopHeight, this.treeTopRadius);

        this.top.display();
        this.scene.popMatrix();

    }
}