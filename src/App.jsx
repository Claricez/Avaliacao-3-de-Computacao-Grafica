import { useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js'

// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { VOXLoader } from 'three/examples/jsm/loaders/VOXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GUI } from 'dat.gui';


import SceneInit from './lib/Scene';

function App() {
  
  useEffect(() => {

    let spotLight, lightHelper;
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    // const boxGeometry = new THREE.BoxGeometry(8, 8, 8);
    // const boxMaterial = new THREE.MeshNormalMaterial();
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // test.scene.add(boxMesh);

    //Guia
    const gui = new GUI();

    //Fantasma
    const ghostLoader = new GLTFLoader();
    ghostLoader.load('models/ghost_scene/scene.gltf', (sceneGhost) => {
      sceneGhost.scene.scale.set(40,40,40)
      sceneGhost.scene.position.x = 120
      sceneGhost.scene.position.y = 60
          //Animação
    const animate = (t) => {
      TWEEN.update(t);
      window.requestAnimationFrame(animate);
    };

    animate()

    const tween = new TWEEN.Tween({x:0, y: 0, z : 0, xRotation: 0}).to({x:5, y:8, z: 40, xRotation: Math.PI / 2}, 2000).onUpdate((coords) => {
      //sceneGhost.scene.position.x = coords.x;
      //sceneGhost.scene.position.y = coords.y;
      //scene.position.x = coords.xRotation;
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