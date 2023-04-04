import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader, useThree, useFrame } from "@react-three/fiber";

// import ViewCubeController from "three-viewcube";
import ViewCubeController from "./index.ts";

import { useEffect, useRef } from "react";

import "./App.css";

function epsilon(value) {
  return Math.abs(value) < 1e-10 ? 0 : value;
}

function getCameraCSSMatrix(matrix) {
  const { elements } = matrix;

  return `matrix3d(
    ${epsilon(elements[0])},
    ${epsilon(-elements[1])},
    ${epsilon(elements[2])},
    ${epsilon(elements[3])},
    ${epsilon(elements[4])},
    ${epsilon(-elements[5])},
    ${epsilon(elements[6])},
    ${epsilon(elements[7])},
    ${epsilon(elements[8])},
    ${epsilon(-elements[9])},
    ${epsilon(elements[10])},
    ${epsilon(elements[11])},
    ${epsilon(elements[12])},
    ${epsilon(-elements[13])},
    ${epsilon(elements[14])},
    ${epsilon(elements[15])})`;
}

function useModel() {
  const stl = useLoader(STLLoader, "/teapot.stl");
  stl.lookAt(new THREE.Vector3(0, 1, 0))
  stl.translate(0, -3, 0)
  return stl;
}

function Scene({ viewCubeControllerRef }) {
  const { camera } = useThree();

  useEffect(() => {
    if (!viewCubeControllerRef.current) {
      viewCubeControllerRef.current = new ViewCubeController(camera);
    }
  }, [camera, viewCubeControllerRef]);

  const stl = useModel();


  let cube = document.querySelector(".cube");
  const mat = new THREE.Matrix4();

  useFrame((state, delta, xrFrame) => {

    if (cube && camera) {
      mat.extractRotation(camera.matrixWorldInverse);
      cube.style.transform = `translateZ(-300px) ${getCameraCSSMatrix(
        mat
      )}`;
    }


    if (viewCubeControllerRef.current) {
      viewCubeControllerRef.current.tweenCallback();
    }
  });

  return (
    <mesh>
      <primitive object={stl} scale={0.01} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

function App() {
  const vcControllerRef = useRef();

  return (
    <div id="canvas-container">
      <Canvas camera={{
        position: [10, 20, 20], zoom: 40, left:
          -window.innerWidth / 2, right: window.innerWidth / 2, top:
          window.innerHeight / 2, bottom: -window.innerHeight / 2,
      }} orthographic>
        <Scene viewCubeControllerRef={vcControllerRef} />
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <OrbitControls />
      </Canvas>

      <div id="viewcube-container">
        <div className="cube">
          {Object.values(ViewCubeController.CubeOrientation).map(
            (orientation) => (
              <div
                key={orientation}
                className={`cube__face cube__face--${orientation}`}
                onClick={() => {
                  if (!vcControllerRef.current) {
                    return;
                  }
                  vcControllerRef.current.tweenCamera(
                    ViewCubeController.ORIENTATIONS[orientation]
                  )
                }
                }
              >
                {orientation}
              </div>
            )
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
