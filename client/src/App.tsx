import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

import './App.css';

function App() {
  const observed = useRef<HTMLDivElement>(null);

  // reference: https://gist.github.com/chrisrzhou

  useEffect(() => {
    const appElement = observed.current;

    if (appElement) {
      // initi scene
      const scene = new THREE.Scene();

      // init camera
      let camera:
        | THREE.PerspectiveCamera
        | THREE.OrthographicCamera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      // init soft white light
      const light = new THREE.AmbientLight(0x404040);
      scene.add(light);

      // init renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

      // init cube
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0xdddddd });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      //set update function to transform the scene and view
      function animate(): void {
        // rotate the cube
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        // trigger animation
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      }

      // resize handler
      const onResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);

        if (camera.type === 'PerspectiveCamera') {
          // perspective
          camera.aspect = window.innerWidth / window.innerHeight;
        } else if (camera.type === 'OrthographicCamera') {
          // orthographic
          camera.left = -window.innerWidth / 2;
          camera.right = window.innerWidth / 2;
          camera.top = window.innerHeight / 2;
          camera.bottom = -window.innerHeight / 2;
        }
        camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', onResize);

      appElement.appendChild(renderer.domElement);
      animate();
    }
  }, [observed]);

  return <div className="App" ref={observed} />;
}

export default App;
