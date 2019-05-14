class MyFinalScene extends CGFobject{
    constructor(scene){
        super(scene);
        this.scene = scene;
        this.initBuffers();
    }

    initBuffers() {  

        this.plane = new Plane(this.scene, 32);
        this.house = new MyHouse(this.scene);
        this.skybox = new MyCubeMap(this.scene);

    }

    display() {

        //PLANE
        this.scene.pushMatrix();
        this.scene.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scene.scale(60, 60, 1);
        this.plane.display();
        this.scene.popMatrix();
        
        //HOUSE 
        this.scene.pushMatrix();
        this.house.display();
        this.scene.popMatrix();

        this.skybox.display();
    

    }
}