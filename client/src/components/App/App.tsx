import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
  CSS3DRenderer,
  CSS3DObject,
} from 'three/examples/jsm/renderers/CSS3DRenderer';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

import { StyledApp } from './App.styles';
import ControlBoard from '../ControlBoard/ControlBoard';

const teapotPath = require('../../assets/meshes/teapot.stl');
const Stats = require('stats.js');

export type TOOL = 'pick' | '';

const MESH_RGB = [233, 30, 99];

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
  const callbackRef = useRef<Function>(() => console.log('hi'));
  const controlsRef = useRef<OrbitControls | null>(null);
  const raycasterRef = useRef<THREE.Raycaster | null>(null);

  const [rotating, toggleRotating] = useState(false);
  const [currentTool, selectCurrentTool] = useState<TOOL>('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // reference: https://gist.github.com/chrisrzhou

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
  };

  const onMouseMove = (event: MouseEvent) => {
    setMousePos({
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    });
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

      // init raycaster
      const raycaster = new THREE.Raycaster();

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
      const loader = new STLLoader();
      loader.load(teapotPath, geometry => {
        if (!geometry) {
          throw new Error('Unable to load geometry');
        }
        geometry.computeVertexNormals();

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

        geometry.setAttribute('color', colorAttr);
        (geometry.attributes.color as any).setUsage(THREE.DynamicDrawUsage);

        addMeshToScene(geometry, scene);
      });

      const renderer2 = new CSS3DRenderer();
      renderer2.setSize(150, 150);
      renderer2.domElement.style.position = 'absolute';
      renderer2.domElement.style.bottom = '50px';
      renderer2.domElement.style.right = '50px';
      renderer2.domElement.style.backgroundColor = 'pink';

      const scene2 = new THREE.Scene();
      const camera2 = new THREE.OrthographicCamera(-10, 10, 10, -10);

      scene2.add(camera2);

      let element;
      let object;
      const cube = new THREE.Group();

      // TOP
      element = document.createElement('div');
      element.style.width = 10 + 'px';
      element.style.height = 10 + 'px';
      element.style.background = 'yellowgreen';
      object = new CSS3DObject(element);
      object.position.copy(new THREE.Vector3(0, 0, 10));
      cube.add(object);

      // BOTTOM
      element = document.createElement('div');
      element.style.width = 10 + 'px';
      element.style.height = 10 + 'px';
      element.style.background = 'seagreen';
      object = new CSS3DObject(element);
      object.position.copy(new THREE.Vector3(0, 0, 0));
      cube.add(object);

      // RIGHT
      element = document.createElement('div');
      element.style.width = 10 + 'px';
      element.style.height = 10 + 'px';
      element.style.background = 'chocolate';
      object = new CSS3DObject(element);
      object.position.copy(new THREE.Vector3(5, 0, 5));
      object.rotateY(Math.PI / 2);
      cube.add(object);

      // LEFT
      element = document.createElement('div');
      element.style.width = 10 + 'px';
      element.style.height = 10 + 'px';
      element.style.background = 'cyan';
      object = new CSS3DObject(element);
      object.position.copy(new THREE.Vector3(-5, 0, 5));
      object.rotateY(-(Math.PI / 2));
      cube.add(object);

      // FRONT
      element = document.createElement('div');
      element.style.width = 10 + 'px';
      element.style.height = 10 + 'px';
      element.style.background = 'red';
      object = new CSS3DObject(element);
      object.position.copy(new THREE.Vector3(0, -5, 5));
      object.rotateX(-(Math.PI / 2));
      cube.add(object);

      // BACK
      element = document.createElement('div');
      element.style.width = 10 + 'px';
      element.style.height = 10 + 'px';
      element.style.background = 'gold';
      object = new CSS3DObject(element);
      object.position.copy(new THREE.Vector3(0, 5, 5));
      object.rotateX(Math.PI / 2);
      cube.add(object);

      scene2.add(cube);

      const camera2Center = new THREE.Vector3(0, 0, 5);
      const camera2Dir = new THREE.Vector3();
      const camera2Pos = new THREE.Vector3();

      // setup render loop
      function animate(): void {
        camera.getWorldDirection(camera2Dir);

        camera2Pos
          .copy(camera2Center)
          .add(camera2Dir.clone().multiplyScalar(-1));
        camera2.position.copy(camera2Pos);
        camera2.lookAt(camera2Center);

        stats.begin();
        renderer.render(scene, camera);
        renderer2.render(scene2, camera2);
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

      appElement.appendChild(renderer2.domElement);

      // define default render callback
      callbackRef.current = () => {};

      // trigger animation
      animate();

      statsRef.current = stats;
      sceneRef.current = scene;
      cameraRef.current = camera;
      rendererRef.current = renderer;
      controlsRef.current = controls;
      raycasterRef.current = raycaster;

      // setup mouse event handlers
      window.addEventListener('mousemove', onMouseMove);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [observed]);

  useEffect(() => {
    if (currentTool === 'pick') {
      if (raycasterRef.current && cameraRef.current && objectRef.current) {
        raycasterRef.current.setFromCamera(mousePos, cameraRef.current);
        const intersections = raycasterRef.current.intersectObject(
          objectRef.current,
          true
        );

        if (intersections.length > 0) {
          // get the intersected face index
          const intersection = intersections[0];
          console.log('face index', intersection.faceIndex);
        }
      }
    }
  }, [mousePos, currentTool]);

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
