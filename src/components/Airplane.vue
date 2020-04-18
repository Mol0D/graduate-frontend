<template>
  <div class="box" id="world">

  </div>
</template>

<script>
import * as THREE from 'three';
import Sea from './Sea';
import Sky from './Sky';
import Plane from './Plane';

const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;

const scene = new THREE.Scene();
let camera;
let renderer;
// let light;

const colors = {
  wheat: 0xf7d9aa,
  blue: 0x68c3c0,
};

export default {

  mounted() {
    this.createScene();
    this.createLights();
    this.createSea();
    this.createSky();
    this.createPlane();

    this.loop();
  },

  data() {
    return {
      seaPositionX: 0,
      seaPositionY: 0,
      sea: new Sea(),
      sky: new Sky(),
      plane: new Plane(),
      angleHairs: 0,
    };
  },

  methods: {
    createScene() {
      scene.fog = new THREE.Fog(colors.wheat, 100, 950);

      const fieldOfView = 60;
      const aspectRatio = WIDTH / HEIGHT;
      const nearPlane = 1;
      const farPlane = 10000;

      camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane,
      );

      camera.position.set(0, 100, 200);


      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });

      renderer.setSize(WIDTH, HEIGHT);

      renderer.shadowMap.enabled = true;

      const world = document.getElementById('world');
      world.appendChild(renderer.domElement);
    },

    createSea() {
      this.sea.mesh.position.y = -600;
      scene.add(this.sea.mesh);
    },

    createLights() {
      // light = new THREE.PointLight(0xffffff, 1, 100, 2);
      // light.position.set(4, 4, 6);

      const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
      scene.add(hemisphereLight);

      const ambientLight = new THREE.AmbientLight(0xdc8874, 0.5);
      scene.add(ambientLight);

      const shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
      shadowLight.position.set(150, 350, 350);
      shadowLight.castShadow = true;
      shadowLight.shadow.camera.left = -400;
      shadowLight.shadow.camera.right = 400;
      shadowLight.shadow.camera.top = 400;
      shadowLight.shadow.camera.bottom = -400;
      shadowLight.shadow.camera.near = 1;
      shadowLight.shadow.camera.far = 1000;
      shadowLight.shadow.mapSize.width = 2048;
      shadowLight.shadow.mapSize.height = 2048;
      scene.add(shadowLight);
    },

    createSky() {
      this.sky.mesh.position.y = -600;
      scene.add(this.sky.mesh);
    },

    createPlane() {
      this.plane.mesh.scale.set(0.25, 0.25, 0.25);
      this.plane.mesh.position.y = 100;
      scene.add(this.plane.mesh);
    },

    loop() {
      this.seaPositionX += 0.01;
      this.seaPositionY += 0.02;

      // console.log(this.seaPositionX, this.seaPositionY, 'dataPosition');

      // this.sea.mesh.rotation.x += 0.01;
      this.sea.movesWaves();
      this.sea.mesh.rotation.z += 0.005;
      this.sky.mesh.rotation.z += 0.01;
      this.plane.propeller.rotation.x += 0.3;
      this.plane.updateHairs(this.angleHairs);
      this.angleHairs += 0.16;

      // console.log(this.sea.mesh.rotation.x, this.sea.mesh.rotation.y, 'rotation');

      renderer.render(scene, camera);

      requestAnimationFrame(this.loop);

      // setInterval(() => {
      //   window.requestAnimationFrame(this.loop);
      // }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
    height: 100vh;
    width: 100vw;
    background: linear-gradient(#e4e0ba, #f7d9aa);
}
</style>
