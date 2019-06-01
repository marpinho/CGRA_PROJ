class MyTerrain  extends CGFobject{

    constructor(scene){
        super(scene);
        this.scene = scene;
        this.initBuffers();
    }

    initBuffers() {
        this.plane = new Plane(this.scene,32);

        this.texture = new CGFtexture(this.scene, "images/terrain.jpg");
        this.textureMap = new CGFtexture(this.scene, "images/heightmap.jpg");

        this.testShaders = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");

        this.testShaders.setUniformsValues({ texture: 0 });
        this.testShaders.setUniformsValues({ textureMap: 1 });

    }
    display() {
        this.texture.bind(0);
        this.textureMap.bind(1);

        this.scene.setActiveShader(this.testShaders);
        this.scene.translate(0, -8, 0);

        this.scene.pushMatrix();

        this.scene.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scene.scale(250, 250, 25);
        this.plane.display();

        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }

}