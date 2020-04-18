import * as THREE from 'three';
import Pilot from './Pilot';

const colors = {
  red: 0xf25346,
  white: 0xffffff,
  brown: 0x59332e,
  brownDark: 0x23190f,
};

class Plane {
  constructor() {
    this.mesh = new THREE.Object3D();

    // cockpit
    const geomCockPit = new THREE.BoxGeometry(80, 50, 50);
    const matCockPit = new THREE.MeshPhongMaterial({
      color: colors.red,
      flatShading: true,
    });

    geomCockPit.vertices[4].y -= 10;
    geomCockPit.vertices[4].z += 20;

    geomCockPit.vertices[5].y -= 10;
    geomCockPit.vertices[5].z -= 20;

    geomCockPit.vertices[6].y += 30;
    geomCockPit.vertices[6].z += 20;

    geomCockPit.vertices[7].y += 30;
    geomCockPit.vertices[7].z -= 20;

    const cockPit = new THREE.Mesh(geomCockPit, matCockPit);
    cockPit.castShadow = true;
    cockPit.receiveShadow = true;
    this.mesh.add(cockPit);

    // engine
    const geomEngine = new THREE.BoxGeometry(20, 50, 50);
    const matEngine = new THREE.MeshPhongMaterial({
      color: colors.white,
      flatShading: true,
    });
    const engine = new THREE.Mesh(geomEngine, matEngine);
    engine.castShadow = true;
    engine.receiveShadow = true;
    engine.position.x = 50;
    this.mesh.add(engine);

    // tail

    const geomTail = new THREE.BoxGeometry(15, 20, 5);
    const matTail = new THREE.MeshPhongMaterial({
      color: colors.red,
      flatShading: true,
    });
    const tail = new THREE.Mesh(geomTail, matTail);
    tail.castShadow = true;
    tail.receiveShadow = true;
    tail.position.set(-40, 20, 0);
    this.mesh.add(tail);

    // wings

    const geomWing = new THREE.BoxGeometry(40, 5, 120);
    const matSideWing = new THREE.MeshPhongMaterial({
      color: colors.red,
      flatShading: true,
    });
    const sideWing = new THREE.Mesh(geomWing, matSideWing);
    sideWing.position.set(0, 15, 0);
    sideWing.castShadow = true;
    sideWing.receiveShadow = true;
    this.mesh.add(sideWing);

    // wind shield

    const geomWindShield = new THREE.BoxGeometry(3, 15, 20);
    const matWindShield = new THREE.MeshPhongMaterial({
      color: colors.white,
      transparent: true,
      opacity: 0.3,
      flatShading: true,
    });
    const windShield = new THREE.Mesh(geomWindShield, matWindShield);
    windShield.position.set(5, 27, 0);
    windShield.castShadow = true;
    windShield.castShadow = true;
    this.mesh.add(windShield);

    // propeller

    const geomPropeller = new THREE.BoxGeometry(20, 10, 10);
    const matPropeller = new THREE.MeshPhongMaterial({
      color: colors.brown,
      flatShading: true,
    });
    this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
    this.propeller.position.set(60, 0, 0);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;

    this.mesh.add(this.propeller);

    // blade

    const geomBlade = new THREE.BoxGeometry(1, 80, 10);
    const matBlade = new THREE.MeshPhongMaterial({
      color: colors.brownDark,
      flatShading: true,
    });
    const blade1 = new THREE.Mesh(geomBlade, matBlade);
    blade1.position.set(8, 0, 0);
    blade1.castShadow = true;
    blade1.receiveShadow = true;
    this.propeller.add(blade1);

    const blade2 = blade1.clone();
    blade2.rotation.x = Math.PI / 2;
    blade2.castShadow = true;
    blade2.receiveShadow = true;
    this.propeller.add(blade2);

    // wheels

    const wheelProtectGeom = new THREE.BoxGeometry(30, 15, 10);
    const wheelProtectMat = new THREE.MeshPhongMaterial({
      color: colors.red,
      flatShading: true,
    });
    const wheelProtectR = new THREE.Mesh(wheelProtectGeom, wheelProtectMat);
    wheelProtectR.position.set(20, -20, 25);
    this.mesh.add(wheelProtectR);

    const wheelProtectL = wheelProtectR.clone();
    wheelProtectL.position.z = -wheelProtectR.position.z;
    this.mesh.add(wheelProtectL);

    // tire

    const wheelTireGeom = new THREE.BoxGeometry(24, 24, 4);
    const wheelTireMat = new THREE.MeshPhongMaterial({
      color: colors.brownDark,
      flatShading: true,
    });
    const wheelTireR = new THREE.Mesh(wheelTireGeom, wheelTireMat);
    wheelTireR.position.set(25, -28, 25);
    this.mesh.add(wheelTireR);

    const wheelAxisGeom = new THREE.BoxGeometry(10, 10, 6);
    const wheelAxisMat = new THREE.MeshPhongMaterial({
      color: colors.brown,
      flatShading: true,
    });
    const wheelAxis = new THREE.Mesh(wheelAxisGeom, wheelAxisMat);
    wheelTireR.add(wheelAxis);

    const wheelTireL = wheelTireR.clone();
    wheelTireL.position.z = -wheelTireR.position.z;
    this.mesh.add(wheelTireL);

    const wheelTireB = wheelTireR.clone();
    wheelTireB.scale.set(0.5, 0.5, 0.5);
    wheelTireB.position.set(-35, -5, 0);
    this.mesh.add(wheelTireB);

    const suspensionGeom = new THREE.BoxGeometry(4, 20, 4);
    suspensionGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 10, 0));
    const suspentionMat = new THREE.MeshPhongMaterial({
      color: colors.red,
      flatShading: true,
    });
    const suspension = new THREE.Mesh(suspensionGeom, suspentionMat);
    suspension.position.set(-35, -5, 0);
    suspension.rotation.z -= 0.3;
    this.mesh.add(suspension);

    this.pilot = new Pilot();
    this.pilot.mesh.position.set(-10, 27, 0);
    this.mesh.add(this.pilot.mesh);

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }

  updateHairs(angleHairs) {
    this.pilot.updateHairs(angleHairs);
  }
}

export default Plane;
