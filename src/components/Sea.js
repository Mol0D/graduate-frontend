import * as THREE from 'three';

const colors = {
  wheat: 0xf7d9aa,
  blue: 0x68c3c0,
};

class Sea {
  constructor() {
    this.geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
    this.geom.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
    const l = this.geom.vertices.length;
    this.waves = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < l; i++) {
      const v = this.geom.vertices[i];
      this.waves.push({
        x: v.x,
        y: v.y,
        z: v.z,
        ang: Math.random() * Math.PI * 2,
        amp: 5 + Math.random() * 15,
        speed: 0.16 + Math.random() * 0.32,
      });
    }
    this.material = new THREE.MeshPhongMaterial({
      color: colors.blue,
      transparent: true,
      opacity: 0.8,
      flatShading: true,
    });

    this.mesh = new THREE.Mesh(this.geom, this.material);
    this.mesh.receiveShadow = true;
    this.mesh.geometry.verticesNeedUpdate = true;
  }

  movesWaves() {
    const verts = this.mesh.geometry.vertices;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < verts.length; i++) {
      const v = verts[i];
      const vprops = this.waves[i];

      v.x = vprops.x + Math.cos(vprops.ang) * vprops.amp;
      v.y = vprops.y + Math.sin(vprops.ang) * vprops.amp;

      vprops.ang += vprops.speed;
    }
  }
}

export default Sea;
