import { OrbitControls } from "@react-three/drei";
import Ghost from "../../Scene";

const Experience = () => {
    return (
        <>
        <OrbitControls/>
        <ambientLight />
        <directionalLight
        position={[-5, 5, 5]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
        <Ghost/> 
        </>
    )
}

export default Experience;