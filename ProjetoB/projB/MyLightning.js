class MyLightning extends MyLSystem {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        
        this.initBuffers();
    }

    initBuffers() {
        //init Texture
        this.whiteTex = new CGFtexture(this.scene, 'images/blue.png');
        this.ligthMaterial = new CGFappearance(this.scene);
        this.ligthMaterial.setTexture(this.whiteTex);

        this.depth = 0;
        this.time = 0;
    }


    initGrammar(){
        this.grammar = {
            "F": new MyQuad(this.scene),
            "X": new MyQuad(this.scene)
        };
    };

    update(){

    }

    startAnimation(t) {

    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(this.scale, this.scale, this.scale);

        var i;

            // percorre a cadeia de caracteres
            for (i=0; i<this.axiom.length; ++i){
                
                    // verifica se sao caracteres especiais
                    switch(this.axiom[i]){
                        case "+":
                            // roda a esquerda
                            this.scene.rotate(this.angle, 0, 0, 1);
                            break;

                        case "-":
                            // roda a direita
                            this.scene.rotate(-this.angle, 0, 0, 1);
                            break;

                        case "[":
                            // push
                            this.scene.pushMatrix();
                            break;

                        case "]":
                            // pop
                            this.scene.popMatrix();
                            break;
                        
                        case "\\":
                            // " \" rotação no sentido positivo sobre o eixo dos XX
                            this.scene.rotate(this.angle, 1, 0, 0);
                            break;

                        case "/":
                            //rotação no sentido negativo sobre o eixo dos XX
                            this.scene.rotate(-this.angle, 1, 0, 0);
                            break;

                        case "^":
                            // rotação no sentido positivo sobre o eixo dos YY
                            this.scene.rotate(this.angle, 0, 1, 0);
                            break;

                        case "&":
                            // rotação no sentido negativo sobre o eixo dos YY
                            this.scene.rotate(-this.angle, 0, 1, 0);
                            break;
                        
                        // processa primitiva definida na gramatica, se existir
                        default:
                            var primitive=this.grammar[this.axiom[i]];

                            if ( primitive )
                            {   
                                this.ligthMaterial.apply();
                                this.scene. pushMatrix();
                                this.scene.scale(0.5,1,1);
                                primitive.display();
                                this.scene.popMatrix();

                                this.scene.translate(0, 1, 0);
                            }
                            break;
                    }
                
            }
        
        
        this.scene.popMatrix();
    }

}