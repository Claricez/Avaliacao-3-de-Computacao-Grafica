import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GUI } from 'dat.gui';
import TWEEN from '@tweenjs/tween.js';
import SceneInit from './lib/Scene';

function App() {
  let ghostObject, eyeObject, throneObject;

  const orbitBody = function (body, orbiter, speed, distanceFromBody) {
    const time = Date.now();
    orbiter.position.x = Math.cos((time * speed) / 1000) * distanceFromBody + body.position.x;
    orbiter.position.z = Math.sin((time * speed) / 1000) * distanceFromBody + body.position.z;
    orbiter.rotation.y += 0.01;
  };

  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();
    test.renderer.shadowMap.enabled = true;
    test.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const gui = new GUI();
    

    const ghostLoader = new GLTFLoader();
    ghostLoader.load('models/ghost_scene/scene.gltf', (sceneGhost) => {
      sceneGhost.scene.scale.set(40, 40, 40);
      sceneGhost.scene.position.x = 400;
      sceneGhost.scene.position.y = 60;
      sceneGhost.scene.position.z = 60;

      gui.add(sceneGhost.scene.rotation, 'x', 0, Math.PI).name('Rotation X');
      gui.add(sceneGhost.scene.rotation, 'y', 0, Math.PI).name('Rotation Y');
      gui.add(sceneGhost.scene.rotation, 'z', 0, Math.PI).name('Rotation Z');
      gui.add(sceneGhost.scene.position, 'x', 0, Math.PI).name('Position X');

      //SpotLight
      const spotLight = new THREE.SpotLight(0xB80000);
      spotLight.position.set(sceneGhost.scene.position.x, sceneGhost.scene.position.y, sceneGhost.scene.position.z);
      spotLight.target.position.set(
        sceneGhost.scene.position.x + 50,
        sceneGhost.scene.position.y - 40,
        sceneGhost.scene.position.z + 140

      );
      spotLight.castShadow = true;
      spotLight.shadow.mapSize.width = 1024;
      spotLight.shadow.mapSize.height = 1024;
      spotLight.shadow.camera.near = 0.5;
      spotLight.shadow.camera.far = 500;
      spotLight.intensity = 2
      
   

      sceneGhost.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      test.scene.add(spotLight);

      ghostObject = sceneGhost.scene;
      test.scene.add(ghostObject);
    });

    const eyeLoader = new GLTFLoader();
    eyeLoader.load('models/eye/scene.gltf', (sceneEye) => {
      sceneEye.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          const texture = new THREE.TextureLoader().load('pics/eye.jpeg');
          child.material = new THREE.MeshPhongMaterial({ map: texture });
        }
      });
    
      const eyeParent = new THREE.Object3D();
      eyeParent.position.x = 120;
      eyeParent.position.y = 60;
      eyeParent.scale.set(20, 20, 20);
      eyeParent.castShadow = true;
      eyeParent.receiveShadow = true;
      eyeParent.add(sceneEye.scene);

      eyeObject = eyeParent; 
      test.scene.add(eyeObject);

      // const tween = new TWEEN.Tween({ y: 0}).to({y: 2}).onUpdate((coords) => {
      //   eyeParent.position.y = coords.y
      // })

      // .repeat(Infinity)
      // .delay(500)
      // .yoyo(true)
      // tween.start()
      
      // const animate = (t) => {
      //   TWEEN.update(t);
      //   window.requestAnimationFrame(animate)
      // }
      // animate()
    });

    const throneLoader = new GLTFLoader();
    throneLoader.load('models/throne_scene/scene.gltf', (sceneThrone) => {
      sceneThrone.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      sceneThrone.scene.scale.set(1, 1, 1);
      sceneThrone.scene.position.y = -10;
      throneObject = sceneThrone.scene;
      test.scene.add(throneObject);
    });

    const animateOrbit = (t) => {
      TWEEN.update(t);
      window.requestAnimationFrame(animateOrbit);

      if (ghostObject && eyeObject) {
        orbitBody(eyeObject, ghostObject, 2, 60);
      }
    };

    animateOrbit();
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas"></canvas>
    </div>
  );
}

export default App;
