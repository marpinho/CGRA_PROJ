class MyFinalScene extends CGFobject{
    constructor(scene){
        super(scene);
        this.initBuffers();
    }

    initBuffers() {

        var coords = [
            0,40,
            40,40,
            0,0,
            40,0
        ]
        
        this.field = new MyQuad(this.scene,coords);
        this.firebase = new MyUnitCubeQuad(this.scene);
        this.house = new MyHouse(this.scene);
        this.hill1 = new MyVoxelHill(this.scene,1);
        this.hill2 = new MyVoxelHill(this.scene,2);
        this.hill3 = new MyVoxelHill(this.scene,3);
        this.hill4 = new MyVoxelHill(this.scene,4);
        this.treeLine = new MyTreeRowPatch(this.scene, 0.2);
        this.treeGroup = new MyTreeGroupPatch(this.scene, 0.2);

        this.fieldTex = new CGFtexture(this.scene, 'images/softGrass.jpg');
        this.firebaseTex = new CGFtexture(this.scene, 'images/woodFire.jpg');


        this.fielsMaterial = new CGFappearance(this.scene);
        this.fielsMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.fielsMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.fielsMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.fielsMaterial.setShininess(10.0);
        this.fielsMaterial.setTexture(this.fieldTex);
        this.fielsMaterial.setTextureWrap('REPEAT', 'REPEAT');
   
        this.firebaseMaterial = new CGFappearance(this.scene);
        this.firebaseMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.firebaseMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.firebaseMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.firebaseMaterial.setShininess(10.0);
        this.firebaseMaterial.setTexture(this.firebaseTex);

    }

    display() {
        
        //HOUSE 
        this.scene.pushMatrix();
        this.house.display();
        
        this.scene.translate(12, 0, -3);
        this.house.display();
        this.scene.translate(2, 0, 0);
        this.house.display();

        this.scene.translate(-26, 0, 0);
        this.house.display();
        this.scene.translate(-2, 0, 0);
        this.house.display();

        this.scene.popMatrix();

        //FOREST back
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -3);
        this.treeLine.display();

        this.scene.translate(-21, 0, -5);
        for (var i = 0; i <5;i++){
            this.scene.translate(7, 0, 0);
            this.treeGroup.display();
        }
        this.scene.popMatrix();

        //FOREST front
        this.scene.pushMatrix();

        this.scene.translate(0, 0, 12);
        this.treeLine.display();

        this.scene.translate(-21, 0, 5);
        for (var i = 0; i <5;i++){
            this.scene.translate(7, 0, 0);
            this.treeGroup.display();
        }
        this.scene.popMatrix();


        //HILLS back
        this.scene.pushMatrix();
        
        this.scene.translate(13, 0, -15);
        this.hill4.display();

        for(var i = 0; i<2; i++){
            this.scene.translate(-7, 0, 0);
            this.hill2.display();
    
            this.scene.translate(-7, 0, 0);
            this.hill3.display();
        }
        this.scene.popMatrix();

        //-----
        this.scene.pushMatrix();
        
        this.scene.translate(9, 0, -3);
        this.hill1.display();

        this.scene.translate(-17, 0, 0);
        this.hill1.display();
    
        this.scene.popMatrix();

        //small fire
        this.firebaseMaterial.apply();

        this.scene.pushMatrix();
        this.scene.scale(0.8, 0.3, 0.6);
        this.scene.translate(0, 0.5, 5);
        this.firebase.display();
        this.scene.popMatrix();



        //draw field
        this.fielsMaterial.apply();
        this.scene.pushMatrix();
        this.scene.scale(40, 1, 40);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.field.display();
        this.scene.popMatrix();

    }
}