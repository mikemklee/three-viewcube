import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

import ViewCubeController from "../../lib";

import { StyledApp, ViewCubeContainer } from "./App.styles";
import GithubLink from "../GithubLink/GithubLink";

const teapotPath = require("../../assets/meshes/teapot.stl");
const Stats = require("stats.js");

const MESH_RGB = [233, 30, 99];

function epsilon(value: number) {
  return Math.abs(value) < 1e-10 ? 0 : value;
}

function getCameraCSSMatrix(matrix: THREE.Matrix4) {
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

function App() {
  const statsRef = useRef<any>(null);

  // General scene-related THREE refs
  const observed = useRef<HTMLDivElement>(null);
  const objectRef = useRef<THREE.Object3D | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<
    THREE.PerspectiveCamera | THREE.OrthographicCamera | null
  >(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const viewCubeControllerRef = useRef<ViewCubeController>();

  const addMeshToScene = (
    geometry: THREE.BufferGeometry,
    scene: THREE.Scene
  ) => {
    const containerObj = new THREE.Object3D();
    const material = new THREE.MeshPhongMaterial({
      vertexColors: true,
    });
    scene.add(containerObj);

    const mesh = new THREE.Mesh(geometry, material);
    containerObj.add(mesh);
    containerObj.scale.multiplyScalar(2);

    objectRef.current = containerObj as THREE.Object3D;

    const box = new THREE.Box3().expandByObject(containerObj);

    cameraRef.current!.zoom =
      Math.min(
        window.innerWidth / (box.max.x - box.min.x),
        window.innerHeight / (box.max.y - box.min.y)
      ) * 0.4;
    cameraRef.current!.updateProjectionMatrix();

    viewCubeControllerRef.current = new ViewCubeController(
      cameraRef.current!,
      objectRef.current
    );
  };

  useEffect(() => {
    const appElement = observed.current;

    if (appElement) {
      // stats setup
      const stats = new Stats();
      document.body.appendChild(stats.dom);

      // init renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      const bgColor = 0x263238 / 2;
      renderer.setClearColor(bgColor, 1);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio || 1);

      // init scene
      const scene = new THREE.Scene();
      const ambientLight = new THREE.AmbientLight(0x736f6e, 1.25);
      scene.add(ambientLight);

      let camera = new THREE.OrthographicCamera(
        -window.innerWidth / 2,
        window.innerWidth / 2,
        window.innerHeight / 2,
        -window.innerHeight / 2
      );

      camera.position.x = 20;
      camera.position.y = -20;
      camera.position.z = 20;
      camera.up = new THREE.Vector3(0, 0, 1);
      camera.updateProjectionMatrix();

      const pointLight = new THREE.PointLight(0xffffff, 0.25);
      camera.add(pointLight);

      scene.add(camera);

      // init controls and raycaster stuff
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enablePan = false;

      // init geometry
      const loader = new STLLoader();
      loader.load(teapotPath, (geometry: any) => {
        if (!geometry) {
          throw new Error("Unable to load geometry");
        }
        geometry.computeVertexNormals();
        geometry.center();

        // setup color attributes on faces
        const colorAttr = new THREE.BufferAttribute(
          new Float32Array(geometry.attributes.position.count * 3),
          3
        );
        const colorAttrLen = colorAttr.count / 3;

        // color the faces
        const rFloat = MESH_RGB[0] / 255;
        const gFloat = MESH_RGB[1] / 255;
        const bFloat = MESH_RGB[2] / 255;
        for (let i = 0; i < colorAttrLen; i++) {
          colorAttr.setXYZ(i * 3 + 0, rFloat, gFloat, bFloat);
          colorAttr.setXYZ(i * 3 + 1, rFloat, gFloat, bFloat);
          colorAttr.setXYZ(i * 3 + 2, rFloat, gFloat, bFloat);
        }

        geometry.setAttribute("color", colorAttr);
        (geometry.attributes.color as any).setUsage(THREE.DynamicDrawUsage);

        addMeshToScene(geometry, scene);

        console.log("Geometry Loaded", geometry);
      });

      let cube;
      const mat = new THREE.Matrix4();

      // setup render loop
      function animate(): void {
        cube = document.querySelector(".cube") as HTMLDivElement;

        if (cube && cameraRef.current) {
          mat.extractRotation(cameraRef.current.matrixWorldInverse);
          cube.style.transform = `translateZ(-300px) ${getCameraCSSMatrix(
            mat
          )}`;
        }

        if (viewCubeControllerRef.current) {
          viewCubeControllerRef.current.tweenCallback();
        }

        stats.begin();
        renderer.render(scene, camera);
        stats.end();
        requestAnimationFrame(animate);
        controls.update();
      }

      // resize handler
      const onResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.left = -window.innerWidth / 2;
        camera.right = window.innerWidth / 2;
        camera.top = window.innerHeight / 2;
        camera.bottom = -window.innerHeight / 2;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);

      // attach rendering canvas to DOM
      appElement.appendChild(renderer.domElement);

      // trigger animation
      animate();

      statsRef.current = stats;
      sceneRef.current = scene;
      cameraRef.current = camera;
      rendererRef.current = renderer;
      controlsRef.current = controls;
    }
  }, [observed]);

  return (
    <StyledApp ref={observed}>
      <GithubLink />
      <ViewCubeContainer>
        <div className="cube">
          {Object.values(ViewCubeController.CubeOrientation).map(
            (orientation) => (
              <div
                key={orientation}
                className={`cube__face cube__face--${orientation}`}
                onClick={() =>
                  viewCubeControllerRef.current!.tweenCamera(
                    ViewCubeController.ORIENTATIONS[orientation]
                  )
                }
              >
                {orientation}
              </div>
            )
          )}
        </div>
      </ViewCubeContainer>
    </StyledApp>
  );
}

export default App;
