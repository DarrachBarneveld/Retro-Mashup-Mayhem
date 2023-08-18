import K from "../kaboom";

export default class Level {
    constructor(data, objectsMapping) {
        this.data = data;
        this.objectsMapping = objectsMapping;
    }

    loadLevel() {
        K.addLevel(this.data, {
          tileWidth: 32,
          tileHeight: 32, 
            ...this.objectsMapping
        });
    }
}