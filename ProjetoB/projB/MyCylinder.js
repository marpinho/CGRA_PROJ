class MyCylinder extends CGFobject {
    constructor(scene, slices) {
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

        var s = 0;
        var sinc = 1/this.slices;

        for(var i = 0; i <= this.slices; i++){
           
            var ca = Math.cos(ang);
            var sa = Math.sin(ang);

            this.vertices.push(ca, 0, -sa);
            this.vertices.push(ca, 1, -sa);

            // vertices normal
            var normal= [
                Math.cos(ang),
                0,
                -Math.sin(ang),
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

            this.normals.push(...normal);
            this.normals.push(...normal);
            
            //this.texCoords.push(i/(this.slices-1),1);
            //this.texCoords.push(i/(this.slices-1),0);

            this.texCoords.push(s,1);
            this.texCoords.push(s,0);

            s+=sinc;
            ang+=alphaAng;
        }

        for(var i = 0; i < this.slices ; i++){
            this.indices.push(i*2, i*2 +2 , i*2 + 3);
            this.indices.push(i*2, i*2 +3 , i*2 + 1 );
        } 
        //draw last slice
        //this.indices.push((this.slices - 1)*2, 0, 1);
        //this.indices.push((this.slices - 1)*2, 1 , (this.slices - 1)*2 + 1 );
        

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