class MyTreeRowPatch extends CGFobject{
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

        for(var x = -3; x <= 3; x++){
            this.vX[x+3] = x * 2 + Math.random() * this.maxOffset * 2 - this.maxOffset/2.0;
            this.vY[x+3] = Math.random() * this.maxOffset * 2 - this.maxOffset/2.0;
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