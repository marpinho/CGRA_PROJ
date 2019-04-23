/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;


        // Interface elements

        this.gui.add(this.scene, 'textures').name("Display textures");

        this.gui.add(this.scene, 'displayNormals').name("Display normals");

        this.gui.add(this.scene, 'selectedObject', this.scene.objectIDs).name('Selected Object');

        this.gui.add(this.scene, 'selectedTime', this.scene.timeID).name('Time');

        this.gui.add(this.scene, 'scaleFactor', 0.1, 10.0).name('Scale');


        return true;
    }
}