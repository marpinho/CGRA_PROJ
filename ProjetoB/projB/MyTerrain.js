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

        this.scene.testShaders = [
			new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag")
        ];

        this.scene.testShaders[0].setUniformsValues({ texMap: 0 });
        this.scene.testShaders[0].setUniformsValues({ texTerrain: 1 });

    }
    display() {
        this.textureMap.bind(1);
        this.texture.bind(0);

        this.scene.pushMatrix();
        this.scene.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scene.scale(60, 60, 1);
        this.plane.display();
		this.scene.popMatrix();
    }

}