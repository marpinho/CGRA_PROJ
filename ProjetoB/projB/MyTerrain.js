class MyTerrain  extends CGFobject{

    constructor(scene){
        super(scene);
        this.scene = scene;
        this.initBuffers();
    }

    initBuffers() {
    
        this.plane = new Plane(this.scene,32);

        this.texTerrain = new CGFtexture(this.scene, "images/terrain.jpg");
        this.texTerrainMap = new CGFtexture(this.scene, "images/heightmap.jpg");
        this.texTerrainColors= new CGFtexture(this.scene, "images/altimetry.png");

        this.testShaders = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.testShaders.setUniformsValues({ texTerrain: 0 });
        this.testShaders.setUniformsValues({ texTerrainMap: 1 });
        this.testShaders.setUniformsValues({ texTerrainColors: 2 });

    }
    display() {
        this.texTerrain.bind(0);
        this.texTerrainMap.bind(1);
        this.texTerrainColors.bind(2);


        this.scene.setActiveShader(this.testShaders);

        this.scene.pushMatrix();
        this.scene.rotate(0.5*Math.PI, 0, 1, 0);
        this.scene.translate(0, -6.5, 0);
        this.scene.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scene.scale(60, 60, 20);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }

}