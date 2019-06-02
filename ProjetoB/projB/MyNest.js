class MyNest extends CGFobject {
    constructor(scene, x, z){
        super(scene);
        this.scene = scene;
        this.pos = [x, 0.2, z];
        this.initBuffers();
    }

    getPos(){ return this.pos; }

    initBuffers() {
        this.cylinder = new MyCylinder(this.scene, 8);

        //Texture
        this.nestTex = new CGFtexture(this.scene, 'images/nest.jpg');
        this.nestMaterial = new CGFappearance(this.scene);
        this.nestMaterial.setTexture(this.nestTex);

        this.branches = [];
    }

    addBranch(branch){
        this.branches.push(branch);
    }

    pickupBranch(x, z, margem){

        var dist = Math.pow(Math.abs(this.pos[0] - x), 2) + Math.pow(Math.abs(this.pos[2] - z), 2);

        for(var i = 0; i < this.branches.length; i++){
            if ( dist < margem * margem ) {
                console.log("grabed");
                var temp = this.branches[this.branches.length-1-i];
                if(temp != null) this.branches.pop();
                return temp;
            }
            else return null;
        }
        return null;
    }

    display() {
        this.nestMaterial.apply();

        this.scene.pushMatrix();

        this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);

        for(var i = 0; i < this.branches.length; i++){
            this.branches[i].display();
        }

        this.scene.scale(1.5, 1.1, 1.5);
        this.cylinder.display();

        this.scene.popMatrix();
    }
}