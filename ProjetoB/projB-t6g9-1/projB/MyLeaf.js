
class MyLeaf extends CGFobject{
  constructor(scene){
    super(scene);
    this.initBuffers();
  }

  initBuffers() {
    this.leaf = new MyParallelogram(this.scene);

    this.folhaText = new CGFtexture(this.scene, 'images/possibletree.jpg');
    this.folhaMaterial = new CGFappearance(this.scene);
    this.folhaMaterial.setAmbient(0.1, 0.1, 0.1, 1);
    this.folhaMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.folhaMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.folhaMaterial.setShininess(10.0);
    this.folhaMaterial.setTexture(this.folhaText);
  }

  display(){
    this.folhaMaterial.apply();
    this.leaf.display();
  }
}
