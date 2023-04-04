import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { OrbitControls } from '@react-three/drei'
import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber'

import ViewCubeController from 'three-viewcube';


import { useEffect } from 'react';

import './App.css';


function useModel() {
  const stl = useLoader(STLLoader, '/teapot.stl')
  console.log('loaded stl', stl)
  return stl;
}

function Scene() {
  const { camera } = useThree();


  useEffect(() => {
    const viewCubeController = new ViewCubeController(camera);

    console.log('initialized viewCubeController', viewCubeController)

  }, [camera]);

  const stl = useModel();

  return (
    <mesh position={[0, -3, 0]} rotation={[Math.PI / -2, 0, 0]} >
      <primitive object={stl} scale={0.01} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

function App() {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [-5, 5, 5], zoom: 40 }} orthographic>
        <Scene />
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
