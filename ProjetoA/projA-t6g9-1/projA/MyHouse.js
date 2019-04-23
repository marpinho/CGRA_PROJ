class MyHouse extends CGFobject {
    constructor(scene){
        super(scene);
        this.initBuffers();
    }
    

    initBuffers() {
        var textures = [ 'images/walltex.jpg','images/houseWall.png' ];
        this.roof = new MyPyramid(this.scene, 4, 5);
        this.base = new MyUnitCubeQuad(this.scene);
        this.column = new MyPrism(this.scene, 8);

        this.wallpaper = new CGFtexture(this.scene, 'images/walltex.jpg');
        this.roofBricks = new CGFtexture(this.scene, 'images/redRoof.jpg');
        this.columnTex = new CGFtexture(this.scene, 'images/colBrick.jpg');
   
        this.wallMaterial = new CGFappearance(this.scene);
        this.wallMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.wallMaterial.setDiffuse(0.5, 0.5, 0.5, 1);
        this.wallMaterial.setSpecular(0.9, 0.9, 0.9, 1);
        this.wallMaterial.setShininess(10.0);
        this.wallMaterial.setTexture(this.wallpaper);

        this.roofMaterial = new CGFappearance(this.scene);
        this.roofMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.roofMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.roofMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.roofMaterial.setShininess(10.0);
        this.roofMaterial.setTexture(this.roofBricks);

        this.columnMaterial = new CGFappearance(this.scene);
        this.columnMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.columnMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.columnMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.columnMaterial.setShininess(10.0);
        this.columnMaterial.setTexture(this.columnTex);
        
    }

    display(){
        this.rad45 = Math.PI / 4;
        this.roofMaterial.apply();


        //draw roof
        this.scene.pushMatrix();
        this.scene.scale(1.2,1,1.2);
        this.scene.rotate(this.rad45,0,1,0);
        this.scene.translate(0,1,0);
        this.roof.display();
        this.scene.popMatrix();
        

        this.wallMaterial.apply();

        //draw base
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.base.display();
        this.scene.popMatrix();

        //draw columns
        this.columnMaterial.apply();
        
        //front rigth
        this.scene.pushMatrix();
        this.scene.translate(0.7,0,0.7);
        this.scene.scale(0.1,1,0.1);
        this.column.display();
        this.scene.popMatrix();

        //front left
        this.scene.pushMatrix();
        this.scene.translate(-0.7,0,0.7);
        this.scene.scale(0.1,1,0.1);
        this.column.display();
        this.scene.popMatrix();

        //back rigth
        this.scene.pushMatrix();
        this.scene.translate(0.7,0,-0.7);
        this.scene.scale(0.1,1,0.1);
        this.column.display();
        this.scene.popMatrix();

        //back left
        this.scene.pushMatrix();
        this.scene.translate(-0.7,0,-0.7);
        this.scene.scale(0.1,1,0.1);
        this.column.display();
        this.scene.popMatrix();
            
    }
    updateBuffers(){}
}