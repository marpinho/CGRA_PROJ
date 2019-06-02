/**
* MyPyramid
* @constructor
*/
class MyPrism extends CGFobject {
    constructor(scene, slices, ) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }

    degToRad(deg){
        return deg * Math.PI / 180;
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(ca, 0, -sa);
            this.vertices.push(caa, 0, -saa);

            this.vertices.push(ca, 1, -sa);
            this.vertices.push(caa, 1, -saa);

            // triangle normal computed by cross product of two edges
            var normal= [
                saa-sa,
                0,
                caa-ca
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(4*i, (4*i+1) , (4*i+3) );
            this.indices.push( (4*i+3), (4*i+1), 4*i);

            this.indices.push(4*i, (4*i+3) , (4*i+2) );
            this.indices.push((4*i+2), (4*i+3), 4*i);
            
            
            this.texCoords.push(0,1);
            this.texCoords.push(1,1);
            this.texCoords.push(0,0);
            this.texCoords.push(1,0);
            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();

    }
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
   
}
