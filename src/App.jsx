import { useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js'
import Stats from 'three/examples/jsm/libs/stats.module';

// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { VOXLoader } from 'three/examples/jsm/loaders/VOXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


import SceneInit from './lib/Scene';
import { GUI } from 'dat.gui';

function App() {
  let spotlightAngle = Math.PI / 4; 
  var light = new THREE.SpotLight()

  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();


    //Guia
    const gui = new GUI()
    let spotLight
    function guia(sceneGuia){
     
      gui.add(sceneGuia.scene.rotation, 'x', 0, Math.PI).name('Rotação X')
      gui.add(sceneGuia.scene.rotation, 'y', 0, Math.PI).name('Rotação Y')
      gui.add(sceneGuia.scene.rotation, 'z', 0, Math.PI).name('Rotação Z')

       //SpotLight
       const sl = new THREE.SpotLight(0x00ff00, 1, 8, Math.PI / 8, 0);
       spotLight.position.set(sceneGuia.scene.position.x, sceneGuia.scene.position.y, sceneGuia.scene.position.z);
      spotLight.target.position.set(sceneGuia.scene.position.x, sceneGuia.scene.position.y - 40, sceneGuia.scene.position.z - 10);
      
    
    // Add spotlight target
    const target = new THREE.Object3D();
    target.position.set(- sceneGuia.scene.position.x -60, - sceneGuia.scene.position.y , - sceneGuia.scene.position.z);
    sceneGuia.scene.add(target);
    spotLight.target = target;

    // Add spotlight to the scene
    test.scene.add(spotLight);

    // Add helper to visualize the spotlight
    lightHelper = new THREE.SpotLightHelper(spotLight);
    test.scene.add(lightHelper);
      const slSettings = {
        visible: true,
      };
      const slFolder = gui.addFolder('spot light');
      slFolder.add(slSettings, 'visible').onChange((value) => {
        sl.visible = value;
        slHelper.visible = value;
      });
      slFolder.add(sl, 'intensity', 0, 4, 0.5);
      slFolder.add(sl, 'angle', Math.PI / 16, Math.PI / 2, Math.PI / 16);
      slFolder.add(sl, 'castShadow');
      slFolder.open();
  
     
    }
    

    //Fantasma
    const ghostLoader = new GLTFLoader();
    ghostLoader.load('models/ghost_scene/scene.gltf', (sceneGhost) => {
      sceneGhost.scene.scale.set(40,40,40)
      sceneGhost.scene.position.x = 120
      sceneGhost.scene.position.y = 60

      
      // sceneGhost.scene.traverse((child) => {
      //   if (child.isMesh) {
      //     child.castShadow = true;
      //     child.receiveShadow = true;
      //   }
      // });

     
      guia(sceneGhost)
    
          //Animação
    const animate = (t) => {
      TWEEN.update(t);
      window.requestAnimationFrame(animate);

      // if (spotLight && sceneGhost) {
      //   // Update spotlight position and target based on the ghost's position
      //   const ghostPosition = sceneGhost.scene.position;
      //   spotLight.position.set(ghostPosition.x, ghostPosition.y, ghostPosition.z);
      //   spotLight.target.position.set(ghostPosition.x, ghostPosition.y, ghostPosition.z);
      // }

      // if (spotLight && spotLight.angle !== spotlightAngle) {
      //   spotLight.angle = spotlightAngle;
      // }
    };

    animate()
    

    const tween = new TWEEN.Tween({x:0, y: 0, z : 0, xRotation: 0}).to({x:5, y:8, z: 40, xRotation: Math.PI / 2}, 2000).onUpdate((coords) => {
  
      sceneGhost.scene.position.z = coords.z;
        })
        .repeat(Infinity)
        .delay(500)
        .yoyo(true)
    tween.start()

    test.scene.add(sceneGhost.scene)

    // spotLight = new THREE.SpotLight(0xffffff, 1, 200, Math.PI / 4);
    // spotLight.position.set(sceneGhost.scene.position.x, sceneGhost.scene.position.y, sceneGhost.scene.position.z);
    // spotLight.target.position.set(sceneGhost.scene.position.x, sceneGhost.scene.position.y - 40, sceneGhost.scene.position.z - 10);
    
  
  // // Add spotlight target
  // const target = new THREE.Object3D();
  // target.position.set(- sceneGhost.scene.position.x -60, - sceneGhost.scene.position.y , - sceneGhost.scene.position.z);
  // sceneGhost.scene.add(target);
  // spotLight.target = target;

  // // Add spotlight to the scene
  // test.scene.add(spotLight);

  // // Add helper to visualize the spotlight
  // lightHelper = new THREE.SpotLightHelper(spotLight);
  // test.scene.add(lightHelper);
     })


    //Trono
    const throneLoader = new GLTFLoader();
    throneLoader.load('models/throne_scene/scene.gltf', (sceneThrone) => {
     
      // sceneThrone.scene.traverse((child) => {
      //   if (child.isMesh) {
      //     child.castShadow = true;
      //     child.receiveShadow = true;
      //   }
      // });
      sceneThrone.scene.scale.set(1,1,1)
      test.scene.add(sceneThrone.scene);
    })


  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas">
      
      </canvas>
    </div>
    
  );
}

export default App;