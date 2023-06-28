import { useEffect } from 'react';

import * as THREE from 'three';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { VOXLoader } from 'three/examples/jsm/loaders/VOXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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

   

    //Poste 
    // const lampPostLoader = new GLTFLoader();
    // lampPostLoader.load('models/lamp_post/scene.gltf', (lampScene) =>{

    //   spotLight = new THREE.SpotLight( 0xffffff, 5 );
      
			// spotLight.position.set( 3, 15, 0 );
			// spotLight.angle = Math.PI / 8;
			// spotLight.penumbra = 1;
			// spotLight.decay = 2;
			// spotLight.distance = 100;
			

			// spotLight.castShadow = true;
			// spotLight.shadow.mapSize.width = 1024;
			// spotLight.shadow.mapSize.height = 400;
			// spotLight.shadow.camera.near = 10;
			// spotLight.shadow.camera.far = 200;
			// spotLight.shadow.focus = 1;
			// test.scene.add( spotLight );

		// 	lightHelper = new THREE.SpotLightHelper( spotLight );
		// 	test.scene.add( lightHelper );
    //   lampScene.scene.rotation.y = Math.PI / 8;
    //   lampScene.scene.position.y = -10;
    //   lampScene.scene.position.x = 3;
    //   lampScene.scene.scale.set(4, 4, 4);

    //   test.scene.add(lampScene.scene)
 
    // })

    // let loadedModel;
    // const glftLoader = new GLTFLoader();
    // glftLoader.load('models/fantasy_town/scene.gltf', (gltfScene) => {
    //   loadedModel = false;
    //    console.log(loadedModel);

    //   gltfScene.scene.rotation.y = Math.PI / 8;
    //   gltfScene.scene.position.y = 3;
    //   gltfScene.scene.position.x = -3;
    //   //gltfScene.scene.scale.set(5, 5, 5);
    //   //test.scene.add(gltfScene.scene);
    // });


    //Stich 
    const stitchLoader = new GLTFLoader();
    stitchLoader.load('models/stitch_free/scene.gltf' , (gltfScene)=> {

      gltfScene.scene.scale.set(5, 5, 5);
      gltfScene.scene.position.x = 5

      spotLight = new THREE.SpotLight( 0xffffff, 5 );
      
			spotLight.position.set( 0, 0, -30 );
			spotLight.angle = Math.PI / 8;
			spotLight.penumbra = 1;
			spotLight.decay = 2;
			spotLight.distance = 100;
			

			spotLight.castShadow = true;
			spotLight.shadow.mapSize.width = 400;
			spotLight.shadow.mapSize.height = 400;
			spotLight.shadow.camera.near = 10;
			spotLight.shadow.camera.far = 200;
			spotLight.shadow.focus = 1;
			test.scene.add( spotLight );

			lightHelper = new THREE.SpotLightHelper( spotLight );
			test.scene.add( lightHelper );

      
      test.scene.add(gltfScene.scene);
    })
    const animate = () => {
      if (loadedModel) {
        loadedModel.scene.rotation.x += 0.01;
        loadedModel.scene.rotation.y += 0.01;
        loadedModel.scene.rotation.z += 0.08;
      }
      requestAnimationFrame(animate);
    };
    //animate();
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;