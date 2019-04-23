class MyPlane extends CGFobject {
    constructor(scene, slices) {
        super(scene);

        //se slices = 0 as normais sao perpendiculares a face, senao tem uma inclinacao para serem usadas num cone con slices faces
        this.slices = slices;


        this.initBuffers();
    }

    initBuffers() {

        this.vertices = [
            -0.5, 0, 0,	//0
            0.5, 0, 0,	//1
            -0.5, 1, 0,	//2
            0.5, 1, 0,   //3
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2, 2, 1, 0,
            1, 3, 2, 2, 3, 1,
        ];

        if(this.slices == 0) {
            this.normals = [
                0, 0, 1,
                0, 0, 1,
                0, 0, 1,
                0, 0, 1,
            ];
        }
        else{
            var ang = Math.PI / this.slices;

            this.normals = [
                -Math.sin(ang), 0, Math.cos(ang),
                Math.sin(ang), 0, Math.cos(ang),
                -Math.sin(ang), 0, Math.cos(ang),
                Math.sin(ang), 0, Math.cos(ang),
            ];
        }

        /*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */

        this.texCoords = [
            0, 1,
            1, 1,
            0, 0,
            1, 0
        ]
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }


    /**
     * @method updateTexCoords
     * Updates the list of texture coordinates of the quad
     * @param {Array} coords - Array of texture coordinates
     */
    updateTexCoords(coords) {
        this.texCoords = [...coords];
        this.updateTexCoordsGLBuffers();
    }
}