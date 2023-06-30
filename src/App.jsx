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
  
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();
    test.renderer.shadowMap.enabled = true;
    test.renderer.shadowMap.type = THREE.PCFSoftShadowMap;


    //Guia
    const gui = new GUI()
    const spotLight = new THREE.SpotLight()
   


    //Fantasma
    const ghostLoader = new GLTFLoader();
    ghostLoader.load('models/ghost_scene/scene.gltf', (sceneGhost) => {
      sceneGhost.scene.scale.set(40,40,40)
      sceneGhost.scene.position.x = 200
      sceneGhost.scene.position.y = 60
      sceneGhost.scene.position.z = 60


     
      gui.add(sceneGhost.scene.rotation, 'x', 0, Math.PI).name('Rotação X')
      gui.add(sceneGhost.scene.rotation, 'y', 0, Math.PI).name('Rotação Y')
      gui.add(sceneGhost.scene.rotation, 'z', 0, Math.PI).name('Rotação Z')
      gui.add(sceneGhost.scene.position, 'x', 0, Math.PI).name('Posição X')
      

       //SpotLight
      const sl = new THREE.SpotLight(0x00ff00, 1, 8, Math.PI / 8, 0);
      spotLight.position.set(sceneGhost.scene.position.x, sceneGhost.scene.position.y, sceneGhost.scene.position.z);
      spotLight.target.position.set(sceneGhost.scene.position.x + 50, sceneGhost.scene.position.y - 40, sceneGhost.scene.position.z + 140);
      spotLight.castShadow = true;
      spotLight.shadow.mapSize.width = 1024; // Set the shadow map size
      spotLight.shadow.mapSize.height = 1024;
      spotLight.shadow.camera.near = 0.5; // Set the shadow camera near and far distances
      spotLight.shadow.camera.far = 500;
    // ...

      const target = new THREE.Object3D();
      target.position.set(- sceneGhost.scene.position.x -60, - sceneGhost.scene.position.y , - sceneGhost.scene.position.z);
      sceneGhost.scene.add(target);
      spotLight.target = target;

      sceneGhost.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      test.scene.add(spotLight);


  
          //Animação
    const animate = (t) => {
      TWEEN.update(t);
      window.requestAnimationFrame(animate);

      
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

     })


    //Trono
    const throneLoader = new GLTFLoader();
    throneLoader.load('models/throne_scene/scene.gltf', (sceneThrone) => {
     
      sceneThrone.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      sceneThrone.scene.scale.set(1,1,1)
      test.scene.add(sceneThrone.scene);

    })

    //Olho
    const eyeLoader = new GLTFLoader();
    eyeLoader.load('models/eye/scene.gltf', (sceneEye) => {

      // sceneEye.scene.position.x = 120
      // sceneEye.scene.position.y = 60
      // sceneEye.scene.scale.set(20,20,20)
    
      // sceneEye.scene.castShadow = true
      // sceneEye.scene.receiveShadow = true

      sceneEye.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      const eyeParent = new THREE.Object3D();
      eyeParent.position.x = 120;
      eyeParent.position.y = 60;
      eyeParent.scale.set(20, 20, 20);
      eyeParent.castShadow = true;
      eyeParent.receiveShadow = true;
      
      // Add the eye model to the parent object
      eyeParent.add(sceneEye.scene);
    
      test.scene.add(eyeParent);

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