## Simple [**ViewCube**](https://www.autodeskresearch.com/publications/viewcube)

### Live demo [here](https://mikemklee.github.io/three-viewcube)

![example](src/assets/iamges/../images/three-viewcube.gif)

## Source code

`ViewCubeController` class

https://github.com/mikemklee/three-viewcube/blob/main/src/lib/index.ts

Example implementation of a cube UI

https://github.com/mikemklee/three-viewcube/blob/main/src/components/App/App.tsx#L219

## Example usage

1. Install and import required libraries

```bash
npm install three @tweenjs/tween.js
```

2. Setup a scene with camera and object

3. Create a `ViewCubeContoller` instance

```js
import ViewCubeController from "./path-to-ViewCubeController";

const vcController = new ViewCubeController(camera, object);
```

4. Orient the viewcube on one of the 6 sides of the viewcube

```js
// imagine we have a cube UI component
<Cube>
     {Object.values(ViewCubeController.CubeOrientation).map(
        (orientation) => (
          <CubeSide
            key={orientation}
            orientation={orientation}
            onClick={onClickCubeSide}
          />
        )
      )}
</Cube>

onClickCubeSide(orientation) {
    // orient the viewcube to the top side
    const targetOrientation = ViewCubeController.ORIENTATIONS[orientation];
    vcController.tweenCamera(targetOrientation);
}
```

5. In the render loop, call the `tweenCallback` method to update the camera's position and rotation

```js
function animate() {
  requestAnimationFrame(animate);
  vcController.tweenCallback();
  renderer.render(scene, camera);
}

animate();
```
