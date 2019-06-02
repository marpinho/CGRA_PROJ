/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTriangle extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [
            0, 0, 1,	//0
            1, 0, 0,	//1
            0, 0, -1,	//2
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2, 2, 1, 0
        ];

        this.normals = [
            0, 1, 0,
            0, 1, 0,
            0, 1, 0
        ];

        this.texCoords = [
            0.5, 0,
            1, 0,
            1, 1
        ]; //nao tenho a certeza da ordem

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
