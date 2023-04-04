import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import ViewCubeController from 'three-viewcube';

import { useThree, useFrame, useRef } from '@react-three/fiber';

import { useEffect } from 'react';

import './App.css';

function useViewCubeController() {
  const ref = useRef()
  const { camera, gl } = useThree();

  useEffect(() => {
    const viewCubeController = new ViewCubeController(camera, gl.domElement);
    console.log('finished setting up view cube controller')
  }, [camera, gl]);
}


function Setup() {
  useViewCubeController();
  console.log('we  here?')

}

function App() {
  return (
    <div id="canvas-container">
      <Canvas>
        <Setup />
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
