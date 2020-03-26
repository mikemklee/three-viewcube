import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { StyledApp } from './App.styles';
import ControlBoard from '../ControlBoard/ControlBoard';

const Stats = require('stats.js');

function App() {
  const observed = useRef<HTMLDivElement>(null);
  const objectRef = useRef<THREE.Object3D | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<
    THREE.PerspectiveCamera | THREE.OrthographicCamera | null
  >(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const statsRef = useRef<any>(null);
  const callbackRef = useRef<Function>(() => console.log('hi'));
  const [rotating, toggleRotating] = useState(false);
  const [currentTool, selectCurrentTool] = useState('');

  // reference: https://gist.github.com/chrisrzhou

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

      // init camera
      let camera:
        | THREE.PerspectiveCamera
        | THREE.OrthographicCamera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        50
      );
      camera.position.z = 40;
      camera.far = 100;
      camera.updateProjectionMatrix();
      const pointLight = new THREE.PointLight(0xffffff, 0.25);
      camera.add(pointLight);

      scene.add(camera);

      // init controls and raycaster stuff
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.screenSpacePanning = true;
      controls.enableKeys = false;

      // init geometry
      const geomRadius = 1;
      const tube = 0.4;
      const tubularSegments = 400;
      const radialSegments = 100;

      const containerObj = new THREE.Object3D();
      const knotGeometry = new THREE.TorusKnotBufferGeometry(
        geomRadius,
        tube,
        tubularSegments,
        radialSegments
      );
      const material = new THREE.MeshPhongMaterial({ color: 0xe91e63 });
      containerObj.scale.multiplyScalar(10);
      scene.add(containerObj);

      const mesh = new THREE.Mesh(knotGeometry, material);
      mesh.rotation.x = Math.random() * 10;
      mesh.rotation.y = Math.random() * 10;
      containerObj.add(mesh);

      // set mesh transforms
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      const lerpAmt = (1 - 1) / (300 - 1);
      const dist = lerp(0, 2, lerpAmt);
      const scale = lerp(1, 0.2, lerpAmt);

      mesh.scale.set(1, 1, 1).multiplyScalar(scale);

      const vec3 = new THREE.Vector3(0, 1, 0);
      vec3.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI * Math.random());
      vec3.applyAxisAngle(
        new THREE.Vector3(0, 1, 0),
        2 * Math.PI * Math.random()
      );
      vec3.multiplyScalar(dist);

      mesh.position.set(vec3.x, vec3.y, vec3.z);

      // setup render loop
      function animate(): void {
        stats.begin();
        renderer.render(scene, camera);
        stats.end();
        requestAnimationFrame(animate);
        controls.update();
        callbackRef.current();
      }

      // resize handler
      const onResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);

        if (camera.type === 'PerspectiveCamera') {
          camera.aspect = window.innerWidth / window.innerHeight;
        } else if (camera.type === 'OrthographicCamera') {
          camera.left = -window.innerWidth / 2;
          camera.right = window.innerWidth / 2;
          camera.top = window.innerHeight / 2;
          camera.bottom = -window.innerHeight / 2;
        }
        camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', onResize);

      // attach rendering canvas to DOM
      appElement.appendChild(renderer.domElement);

      // define default render callback
      callbackRef.current = () => {};

      // trigger animation
      animate();

      objectRef.current = containerObj as THREE.Object3D;
      statsRef.current = stats;
      sceneRef.current = scene;
      cameraRef.current = camera;
      rendererRef.current = renderer;
      controlsRef.current = controls;
    }
  }, [observed]);

  useEffect(() => {
    if (rotating) {
      // start rotating object
      callbackRef.current = () => {
        if (objectRef.current) {
          objectRef.current.rotation.x += 0.01;
          objectRef.current.rotation.y += 0.01;
        }
      };
    } else {
      // stop rotating object
      callbackRef.current = () => {};
    }
  }, [rotating]);

  return (
    <StyledApp ref={observed}>
      <ControlBoard
        rotating={rotating}
        currentTool={currentTool}
        toggleRotation={() => toggleRotating(!rotating)}
        selectCurrentTool={tool => selectCurrentTool(tool)}
      />
    </StyledApp>
  );
}

export default App;
