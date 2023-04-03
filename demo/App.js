import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import { useThree } from '@react-three/fiber'

import './App.css';

function Foo() {
  const state = useThree()
  console.log(state)
}

function App() {
  return (
    <div id="canvas-container">
      <Canvas>
        <Foo />
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
