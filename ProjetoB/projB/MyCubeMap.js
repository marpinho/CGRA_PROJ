class MyCubeMap extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        this.time = 0;

        this.quad = new MyQuad(this.scene);
        this.rad90 = Math.PI / 2;

        //create textures daytime
        this.location = "Text/";
        this.texturePack = "siege";
        this.topText = new CGFtexture(this.scene, this.location + this.texturePack + '_up.png');
        this.botText = new CGFtexture(this.scene, this.location + this.texturePack + '_dn.png');
        this.frontText = new CGFtexture(this.scene, this.location + this.texturePack + '_ft.png');
        this.backText = new CGFtexture(this.scene, this.location + this.texturePack + '_bk.png');
        this.rightText = new CGFtexture(this.scene, this.location + this.texturePack + '_rt.png');
        this.leftText = new CGFtexture(this.scene, this.location + this.texturePack + '_lf.png');


        //create materials with textures night
        this.frontMaterial = new CGFappearance(this.scene);
        this.frontMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.frontMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.frontMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.frontMaterial.setShininess(10.0);
        this.frontMaterial.setTexture(this.frontText);

        this.leftMaterial = new CGFappearance(this.scene);
        this.leftMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.leftMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.leftMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.leftMaterial.setShininess(10.0);
        this.leftMaterial.setTexture(this.leftText);

        this.rightMaterial = new CGFappearance(this.scene);
        this.rightMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.rightMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.rightMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.rightMaterial.setShininess(10.0);
        this.rightMaterial.setTexture(this.rightText);

        this.backMaterial = new CGFappearance(this.scene);
        this.backMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.backMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.backMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.backMaterial.setShininess(10.0);
        this.backMaterial.setTexture(this.backText);

        this.botMaterial = new CGFappearance(this.scene);
        this.botMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.botMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.botMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.botMaterial.setShininess(10.0);
        this.botMaterial.setTexture(this.botText);

        this.topMaterial = new CGFappearance(this.scene);
        this.topMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.topMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.topMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.topMaterial.setShininess(10.0);
        this.topMaterial.setTexture(this.topText);



        //create textures nighttime
        this.texturePackN = "badomen";
        this.topTextN = new CGFtexture(this.scene, this.location + this.texturePackN + '_up.png');
        this.botTextN = new CGFtexture(this.scene, this.location + this.texturePackN + '_dn.png');
        this.frontTextN = new CGFtexture(this.scene, this.location + this.texturePackN + '_ft.png');
        this.backTextN = new CGFtexture(this.scene, this.location + this.texturePackN + '_bk.png');
        this.rightTextN = new CGFtexture(this.scene, this.location + this.texturePackN + '_rt.png');
        this.leftTextN = new CGFtexture(this.scene, this.location + this.texturePackN + '_lf.png');

        //create materials with textures
        this.frontMaterialN = new CGFappearance(this.scene);
        this.frontMaterialN.setAmbient(0.1, 0.1, 0.1, 1);
        this.frontMaterialN.setDiffuse(0.9, 0.9, 0.9, 1);
        this.frontMaterialN.setSpecular(0.1, 0.1, 0.1, 1);
        this.frontMaterialN.setShininess(10.0);
        this.frontMaterialN.setTexture(this.frontTextN);

        this.leftMaterialN = new CGFappearance(this.scene);
        this.leftMaterialN.setAmbient(0.1, 0.1, 0.1, 1);
        this.leftMaterialN.setDiffuse(0.9, 0.9, 0.9, 1);
        this.leftMaterialN.setSpecular(0.1, 0.1, 0.1, 1);
        this.leftMaterialN.setShininess(10.0);
        this.leftMaterialN.setTexture(this.leftTextN);

        this.rightMaterialN = new CGFappearance(this.scene);
        this.rightMaterialN.setAmbient(0.1, 0.1, 0.1, 1);
        this.rightMaterialN.setDiffuse(0.9, 0.9, 0.9, 1);
        this.rightMaterialN.setSpecular(0.1, 0.1, 0.1, 1);
        this.rightMaterialN.setShininess(10.0);
        this.rightMaterialN.setTexture(this.rightTextN);

        this.backMaterialN = new CGFappearance(this.scene);
        this.backMaterialN.setAmbient(0.1, 0.1, 0.1, 1);
        this.backMaterialN.setDiffuse(0.9, 0.9, 0.9, 1);
        this.backMaterialN.setSpecular(0.1, 0.1, 0.1, 1);
        this.backMaterialN.setShininess(10.0);
        this.backMaterialN.setTexture(this.backTextN);

        this.botMaterialN = new CGFappearance(this.scene);
        this.botMaterialN.setAmbient(0.1, 0.1, 0.1, 1);
        this.botMaterialN.setDiffuse(0.9, 0.9, 0.9, 1);
        this.botMaterialN.setSpecular(0.1, 0.1, 0.1, 1);
        this.botMaterialN.setShininess(10.0);
        this.botMaterialN.setTexture(this.botTextN);

        this.topMaterialN = new CGFappearance(this.scene);
        this.topMaterialN.setAmbient(0.1, 0.1, 0.1, 1);
        this.topMaterialN.setDiffuse(0.9, 0.9, 0.9, 1);
        this.topMaterialN.setSpecular(0.1, 0.1, 0.1, 1);
        this.topMaterialN.setShininess(10.0);
        this.topMaterialN.setTexture(this.topTextN);
    }

    display(time) {

        this.time = time; // true if night

        this.scene.pushMatrix();

        this.size = 300;

        this.scene.scale(this.size, this.size, this.size);

        // face y-

        this.scene.pushMatrix();
        this.applyMat('bot');
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(0, -0.5, 0);

        this.scene.rotate(-this.rad90, 1, 0, 0);
        this.quad.display();

        this.scene.popMatrix();

        //face y+
        this.scene.pushMatrix();

        this.applyMat('top');
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(0, 0.5, 0);

        this.scene.rotate(this.rad90, 1, 0, 0);
        this.quad.display();

        this.scene.popMatrix();

        //face z+

        this.scene.pushMatrix();
        this.applyMat('right');

        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);

        this.quad.display();

        this.scene.popMatrix();

        //face z-
        this.scene.pushMatrix();
        this.applyMat('left');

        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(0, 0, -0.5);
        this.quad.display();

        this.scene.popMatrix();

        //face x+

        this.scene.pushMatrix();
        this.applyMat('back');
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(0.5, 0, 0);

        this.scene.rotate(-this.rad90, 0, 1, 0);
        this.quad.display();

        this.scene.popMatrix();

        //face x-

        this.scene.pushMatrix();
        this.applyMat('front');
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(-0.5, 0, 0);

        this.scene.rotate(this.rad90, 0, 1, 0);
        this.quad.display();

        this.scene.popMatrix();

        this.scene.popMatrix();

    }

    applyMat(position){
        switch (position) {
            case 'top':
                if(!this.time) this.topMaterial.apply();
                else this.topMaterialN.apply();
                return;

            case 'bot':
                if(!this.time) this.botMaterial.apply();
                else this.botMaterialN.apply();
                break;

            case 'right':
                if(!this.time) this.rightMaterial.apply();
                else this.rightMaterialN.apply();
                break;

            case 'left':
                if(!this.time) this.leftMaterial.apply();
                else this.leftMaterialN.apply();
                break;

            case 'front':
                if(!this.time) this.frontMaterial.apply();
                else this.frontMaterialN.apply();
                break;

            case 'back':
                if(!this.time) this.backMaterial.apply();
                else this.backMaterialN.apply();
                break;
        }
    }

    updateBuffers(){}
}

