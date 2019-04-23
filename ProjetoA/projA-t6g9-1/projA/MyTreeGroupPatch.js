class MyTreeGroupPatch extends CGFobject{
    constructor(scene, maxOffset){
        super(scene);

        this.maxOffset = maxOffset;

        this.initBuffers();
    }
    
    initBuffers() {
        //armazenar posicao de cada arvore
        this.vX = [];
        this.vY = [];

        this.tree = [];

        for(var i = 0; i < 9; i++) {
            var th = 1 + Math.random()*this.maxOffset*3-this.maxOffset*3/2.0;
            var tr = 0.3 + Math.random()*this.maxOffset-this.maxOffset/2.0;
            var tth = 1.8 + Math.random()*this.maxOffset*4-this.maxOffset*4/2.0;
            var ttr = 1 + Math.random()*this.maxOffset*3-this.maxOffset*3/2.0;

            if(ttr < tr){
                ttr = tr;
            }

            this.tree.push(new MyTree(this.scene, th, tr, tth, ttr, 'images/trunk2.jpg', 'images/possibletree.jpg'));
        }

        var i = 0;
        for(var x = -1; x <= 1; x++){
            for(var y = -1; y <= 1; y++){
                // usar Math.Random() * maxOffset * 2 - maxoffset/2 para calc pos de cada arvore
                this.vX[i] = x * 2 + Math.random() * this.maxOffset * 2 - this.maxOffset;
                this.vY[i] = y * 2 + Math.random() * this.maxOffset * 2 - this.maxOffset;
                i++;
            }
        }
    }

    display() {
        for(var i = 0; i < 9; i++){
            this.scene.pushMatrix();

            this.scene.translate(this.vX[i], 0, this.vY[i]);

            this.tree[i].display();
            this.scene.popMatrix();
        }
    }

}
