import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GUI } from 'dat.gui';
import TWEEN from '@tweenjs/tween.js';
import SceneInit from './lib/Scene';

function App() {
  let ghostObject, eyeObject, throneObject, tableObject, groundObject, lampObject, himObject, moonObject, house3Object, house4Object, house5Object, house6Object, candleObject, cauldronObject, witchObject;

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
    
    let mixerGhost
    const ghostLoader = new GLTFLoader();
    ghostLoader.load('models/chubby_ghost/scene.gltf', (sceneGhost) => {
      sceneGhost.scene.scale.set(2, 2, 2);
      sceneGhost.scene.position.x = 0;
      sceneGhost.scene.position.y = 10;
      sceneGhost.scene.position.z = 0;
      
      gui.add(sceneGhost.scene.rotation, 'x', 0, Math.PI).name('Rotation X');
      gui.add(sceneGhost.scene.rotation, 'y', 0, Math.PI).name('Rotation Y');
      gui.add(sceneGhost.scene.rotation, 'z', 0, Math.PI).name('Rotation Z');
      gui.add(sceneGhost.scene.position, 'x', 0, Math.PI).name('Position X');
      //SpotLight
      const spotLight = new THREE.SpotLight(0xB80000);
      spotLight.position.set(sceneGhost.scene.position.x, 10, sceneGhost.scene.position.z);
      spotLight.target.position.set(
        sceneGhost.scene.position.x + 50,
        sceneGhost.scene.position.z + 140

      );
      spotLight.castShadow = true;
      spotLight.penumbra = .1
      spotLight.angle = Math.PI
      spotLight.shadow.mapSize.width = 1280;
      spotLight.shadow.mapSize.height = 1280;
      spotLight.shadow.camera.near = 0.5;
      spotLight.shadow.camera.far = 500;
      spotLight.intensity = .5

      const blink = () => {
        setInterval(() => {spotLight.intensity = 60 }, 3000)
        setInterval(() => {spotLight.intensity = .5}, 2000)
      }
      setInterval(blink, 1500)

      const model = sceneGhost.scene

      mixerGhost = new THREE.AnimationMixer(model);
      const animation = sceneGhost.animations[0];
      const actionCandle = mixerGhost.clipAction(animation);
      
      actionCandle.play()

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
      sceneThrone.scene.position.y = 0;
      throneObject = sceneThrone.scene;
      test.scene.add(throneObject);
    });

    const table = new GLTFLoader();
    table.load('models/table/scene.gltf', (sceneTable) => {
      sceneTable.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      sceneTable.scene.scale.set(10, 10, 10);
      sceneTable.scene.position.x = 100;
      sceneTable.scene.position.y = -10;
      sceneTable.scene.position.z = 127;
      tableObject = sceneTable.scene;
      test.scene.add(tableObject);
    })

    let mixerCandle
    const candle = new GLTFLoader();
    candle.load('models/candle_light/scene.gltf', (sceneCandle) => {
      sceneCandle.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      sceneCandle.scene.scale.set(.3, .3, .3);
      sceneCandle.scene.position.x = 100;
      sceneCandle.scene.position.y = 20;
      sceneCandle.scene.position.z = 127;

      const model = sceneCandle.scene

      mixerCandle = new THREE.AnimationMixer(model);
      const animation = sceneCandle.animations[0];
      const actionCandle = mixerCandle.clipAction(animation);
      
      actionCandle.play()


      candleObject = sceneCandle.scene;
      test.scene.add(candleObject);
    })

    const cauldron = new GLTFLoader();
    cauldron.load('models/witch_cauldron/scene.gltf', (sceneCauldron) => {
      sceneCauldron.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      sceneCauldron.scene.scale.set(120, 120, 120);
      sceneCauldron.scene.position.x = -250;
      sceneCauldron.scene.position.y = 60;
      sceneCauldron.scene.position.z = 40;

      cauldronObject = sceneCauldron.scene;
      test.scene.add(cauldronObject);
    })

    const groundLoader = new GLTFLoader()
    groundLoader.load('models/rocky_ground/scene.gltf', (sceneGround) => {
      sceneGround.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      sceneGround.scene.scale.set(1000, 100, 1000);
      sceneGround.scene.position.y = -20;
      groundObject = sceneGround.scene;
      test.scene.add(groundObject);
    })
    
    const lampPostLoader = new GLTFLoader()
    lampPostLoader.load('models/lamp_post/scene.gltf', (sceneLamp) => {
      sceneLamp.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      sceneLamp.scene.scale.set(30, 30, 30);
      sceneLamp.scene.position.x = 380;
      sceneLamp.scene.position.y = 15;
      sceneLamp.scene.position.z = 40;

      lampObject = sceneLamp.scene
      test.scene.add(lampObject);
    })

    const moon = new GLTFLoader()
    moon.load('models/moon/scene.gltf', (sceneMoon) => {
      sceneMoon.scene.scale.set(300, 300, 300);
      sceneMoon.scene.position.x = -1200;
      sceneMoon.scene.position.y = 800;
      sceneMoon.scene.position.z = 40;

      moonObject = sceneMoon.scene
      test.scene.add(moonObject);
    })

    const house_3 = new GLTFLoader()
    house_3.load('models/medieval_house_3/scene.gltf', (sceneHouse) => {
      sceneHouse.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      sceneHouse.scene.scale.set(30, 30, 30);
      sceneHouse.scene.position.x = -230;
      sceneHouse.scene.position.y = -20;
      sceneHouse.scene.position.z = 450;

      house3Object = sceneHouse.scene
      test.scene.add(house3Object);
    })

    const house_4 = new GLTFLoader()
    house_4.load('models/medieval_house_4/scene.gltf', (sceneHouse) => {
      sceneHouse.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      sceneHouse.scene.scale.set(30, 30, 30);
      sceneHouse.scene.position.x = -230;
      sceneHouse.scene.position.y = 120;
      sceneHouse.scene.position.z = -600;
      sceneHouse.scene.rotateY(90)

      house4Object = sceneHouse.scene
      test.scene.add(house4Object);
    })

    const house_5 = new GLTFLoader()
    house_5.load('models/medieval_house_5/scene.gltf', (sceneHouse) => {
      sceneHouse.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      sceneHouse.scene.scale.set(40, 40, 40);
      sceneHouse.scene.position.x = -900;
      sceneHouse.scene.position.y = 0;
      sceneHouse.scene.position.z = 40;
      sceneHouse.scene.rotateY(60)

      house5Object = sceneHouse.scene
      test.scene.add(house5Object);
    })

    const house_6 = new GLTFLoader()
    house_6.load('models/medieval_house_6/scene.gltf', (sceneHouse) => {
      sceneHouse.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      sceneHouse.scene.scale.set(40, 40, 40);
      sceneHouse.scene.position.x = 900;
      sceneHouse.scene.position.y = 0;
      sceneHouse.scene.position.z = 40;
      sceneHouse.scene.rotateY(30)

      house6Object = sceneHouse.scene
      test.scene.add(house6Object);
    })

    let mixerWitch
    const witch = new GLTFLoader()
    witch.load('models/witch_run/scene.gltf', (sceneWitch) => {
      sceneWitch.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      sceneWitch.scene.scale.set(.3, .3, .3);
      sceneWitch.scene.position.x = 300;
      sceneWitch.scene.position.y = 0;
      sceneWitch.scene.position.z = -200;

      const model = sceneWitch.scene

      mixerWitch = new THREE.AnimationMixer(model);
      const animation = sceneWitch.animations[0];
      const action = mixerWitch.clipAction(animation);

      action.play()

      animate()

      let direction = 'left'
      setInterval(() => {

        if (direction === 'left') sceneWitch.scene.position.z += 100
        else if (direction === 'right') sceneWitch.scene.position.z -= 100

        if (sceneWitch.scene.position.z === 2000) {
          direction = 'right'
          sceneWitch.scene.rotateY(3.14159)
        }
        else if (sceneWitch.scene.position.z === -2000) {
          direction = 'left'
          sceneWitch.scene.rotateY(-3.14159)
        }
      }, 300)

      witchObject = sceneWitch.scene
      test.scene.add(witchObject);
    })

    const himLoader = new GLTFLoader()
    himLoader.load('models/him_powerpuff_girls/scene.gltf', (sceneHim) => {
      sceneHim.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      sceneHim.scene.scale.set(30, 30, 30);
      sceneHim.scene.position.x = -300;
      sceneHim.scene.position.y = 0;
      sceneHim.scene.position.z = 40;
      sceneHim.scene.rotateY(360)

      himObject = sceneHim.scene
      test.scene.add(himObject);
    })

    const animateOrbit = (t) => {
      TWEEN.update(t);
      window.requestAnimationFrame(animateOrbit);

      if (ghostObject && eyeObject) {
        orbitBody(eyeObject, ghostObject, 1, 60);
      }
    };

    animateOrbit();

    const animate = () => {
      const delta = test.clock.getDelta();
      mixerWitch.update(delta);
      mixerCandle.update(delta)
      mixerGhost.update(delta)

      requestAnimationFrame(animate);
  }
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas"></canvas>
    </div>
  );
}

export default App;
