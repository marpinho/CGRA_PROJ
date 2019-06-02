class MyFinalScene extends CGFobject{
    constructor(scene){
        super(scene);
        this.scene = scene;
        this.initBuffers();
    }

    initBuffers() {  
        this.house = new MyHouse(this.scene);
        this.skybox = new MyCubeMap(this.scene);
        this.terrain = new MyTerrain(this.scene);
        this.bird = new MyBird(this.scene);
    }

    display() {

        //HOUSE 
        this.scene.pushMatrix();
        this.house.display();
        this.scene.popMatrix();
        
        //CUBE MAP
        this.scene.pushMatrix();
        this.skybox.display();
        this.scene.popMatrix();

        //TERRAIN
        this.scene.pushMatrix();
        this.terrain.display();
        this.scene.popMatrix();

        //BIRD
        this.scene.pushMatrix();
        this.scene.popMatrix();


    }
}