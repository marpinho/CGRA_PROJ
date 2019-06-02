/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyParallelogram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [
            0, 0, 0,	//0
            1, 1, 0,	//1 3
            3, 1, 0,    //2 2
            2, 0, 0,    //3 1

            0, 0, 0,	//0 4
            1, 1, 0,	//1 5
            3, 1, 0,    //2 6
            2, 0, 0,    //3 7
        ];

        this.texCoords=[
            1, 1,
            0.75, 0.75,
            0.25, 0.75,
            0.5, 1,
            
            1, 1,
            0.75, 0.75,
            0.25, 0.75,
            0.5, 1
        ];

       
         this.normals=[
            0,0,1,
            0,0,1,
            0,0,1,
            0,0,1,
          
            0,0,-1,
            0,0,-1,
            0,0,-1,
            0,0,-1,
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0,3,1,
            2,1,3,

            4, 5, 6,
            4, 6, 7
        ];
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}


