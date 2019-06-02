class MyVoxelHill extends CGFobject{
    constructor(scene, level){
        super(scene);

        this.level = level;

        this.initBuffers();
    }

    initBuffers() {
        

        this.cube = new MyUnitCubeQuad(this.scene, 2, 0.5, 1.8, 1, 0, 0);

        this.hillTex = new CGFtexture(this.scene, 'images/penas6.jpg');
   
        this.hillMaterial = new CGFappearance(this.scene);
        this.hillMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.hillMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.hillMaterial.setShininess(10.0);
        this.hillMaterial.setTexture(this.hillTex);

    }

    display() {
        this.hillMaterial.apply();

        if(this.level == 4){
            this.level4();
        }
        else if(this.level == 3){
            this.level3();
        }
        else if(this.level == 2){
            this.level2();
        }
        else if(this.level == 1){
            this.level1();
        }
         
    }

    level1(){
        
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.cube.display();
        this.scene.popMatrix();

    }

    level2(){
        //elevate previous level
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.level1();
        this.scene.popMatrix();

        //draw new cubes
        this.scene.pushMatrix();

        this.scene.translate(1, 0.5, 0);
        this.cube.display();
        this.scene.translate(0, 0, 1);
        this.cube.display();

        this.scene.translate(-1, 0, 0);
        this.cube.display();
        this.scene.translate(-1, 0, 0);
        this.cube.display();

        this.scene.translate(0, 0, -1);
        this.cube.display();
        this.scene.translate(0, 0, -1);
        this.cube.display();

        this.scene.translate(1, 0, 0);
        this.cube.display();
        this.scene.translate(1, 0, 0);
        this.cube.display();

        this.scene.popMatrix();
        
    }

    level3(){
         //elevate previous level
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.level2();
        this.scene.popMatrix();

        //draw new cubes
        this.scene.pushMatrix();

        this.scene.translate(0, 0.5, 0);

        this.scene.translate(0, 0, 2);
        this.cube.display();
        this.scene.translate(-1, 0, 0);
        this.cube.display();
        this.scene.translate(-1, 0, 0);
        this.cube.display();

        for(var i = 0; i<4; i++){
            this.scene.translate(0, 0, -1);
            this.cube.display();
        }

        for(var i = 0; i<4; i++){
           this.scene.translate(1, 0, 0);
            this.cube.display();
        }
 
        for(var i = 0; i<4; i++){
            this.scene.translate(0, 0, 1);
            this.cube.display();
        }

        this.scene.translate(-1, 0, 0);
        this.cube.display();

        this.scene.popMatrix();

    }

    level4(){
        //elevate previous level
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.level3();
        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(0, 0.5, 3);
        this.cube.display();

        for(var i= 0;i<3; i++){
            this.scene.translate(-1, 0, 0);
            this.cube.display();
        }

        for(var i= 0;i<6; i++){
            this.scene.translate(0, 0, -1);
            this.cube.display();
        }

        for(var i= 0;i<6; i++){
            this.scene.translate(1, 0,0 );
            this.cube.display();
        }

        for(var i= 0;i<6; i++){
            this.scene.translate(0, 0,1);
            this.cube.display();
        }

        this.scene.translate(-1, 0,0);
        this.cube.display();
        this.scene.translate(-1, 0,0);
        this.cube.display();
        this.scene.popMatrix();

    }

}


