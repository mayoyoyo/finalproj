import { Group, Vector3 } from 'three';
import { SphereBufferGeometry, TorusGeometry, ConeGeometry, MeshPhongMaterial, Mesh } from 'three';

class Powerup extends Group {
    constructor(data){
        let {xPos, speed, bounds, type} = data;
        super();

        this.state = {
          visible: true,
          speed: speed,
          type: type,
          color: 0xFFFFFF
        }

        this.radius = 0.5;

        var geometry;
        switch(type) {
          case "Magnet":
            geometry = new ConeGeometry(0.8, 1);
            this.state.color = 0x07E4F0;
            break;
          case "Double":
            geometry = new TorusGeometry(0.7, 0.2, 8, 8);
            this.state.color = 0x00FF3C;
            break;
        }

        const material = new MeshPhongMaterial( { color: this.state.color, opacity: 0.4, transparent: true} );

        let powerupMesh = new Mesh(geometry, material);
        powerupMesh.rotation.y = Math.PI / 2
        powerupMesh.rotation.z = Math.PI;
        this.powerupMesh = powerupMesh;

        this.add(powerupMesh);
        this.position.set(xPos, -1.2, this.randomZ(bounds));
    }

    // returns a random z-value bound by [-bounds, bounds]
    randomZ(bounds) {
      let min = -bounds + 0.35;
      let max = bounds - 0.35;
      return Math.random() * (max - min) + min;
    }

    update() {
      // console.log(this.position.x)
      this.position.x += this.state.speed;
      if (!this.state.visible) {
        this.children[0].material.opacity = 0;
      }
    }
}

export default Powerup;