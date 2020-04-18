import * as THREE from 'three';
import Cloud from './Cloud';

class Sky {
  constructor() {
    this.mesh = new THREE.Object3D();

    this.nClouds = 20;
    this.clouds = [];

    // eslint-disable-next-line no-mixed-operators
    const stepAngle = Math.PI * 2 / this.nClouds;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.nClouds; i++) {
      const c = new Cloud();
      this.clouds.push(c);
      this.mesh.add(c.mesh);
      const a = stepAngle * i;
      const h = 750 + Math.random() * 200;
      c.mesh.position.x = Math.cos(a) * h;
      c.mesh.position.y = Math.sin(a) * h;
      c.mesh.position.z = -400 - Math.random() * 400;
      c.mesh.rotation.z = a + Math.PI / 2;
      const s = 1 + Math.random() * 2;
      c.mesh.scale.set(s, s, s);
    }
  }
}

export default Sky;
