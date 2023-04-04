import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";

export type Orientation = {
  offsetFactor: {
    x: number;
    y: number;
    z: number;
  };
};

const TOP: Orientation = {
  offsetFactor: {
    x: 0,
    y: 1,
    z: 0,
  },
};

const BOTTOM: Orientation = {
  offsetFactor: {
    x: 0,
    y: -1,
    z: 0,
  },
};

const FRONT: Orientation = {
  offsetFactor: {
    x: 0,
    y: 0,
    z: 1,
  },
};

const BACK: Orientation = {
  offsetFactor: {
    x: 0,
    y: 0,
    z: -1,
  },
};

const LEFT: Orientation = {
  offsetFactor: {
    x: -1,
    y: 0,
    z: 0,
  },
};

const RIGHT: Orientation = {
  offsetFactor: {
    x: 1,
    y: 0,
    z: 0,
  },
};

class ViewCubeController {
  static CubeOrientation = {
    Top: "top",
    Bottom: "bottom",
    Front: "front",
    Back: "back",
    Left: "left",
    Right: "right",
  };

  static ORIENTATIONS = {
    [ViewCubeController.CubeOrientation.Top]: TOP,
    [ViewCubeController.CubeOrientation.Bottom]: BOTTOM,
    [ViewCubeController.CubeOrientation.Front]: FRONT,
    [ViewCubeController.CubeOrientation.Back]: BACK,
    [ViewCubeController.CubeOrientation.Left]: LEFT,
    [ViewCubeController.CubeOrientation.Right]: RIGHT,
  };

  private camera: THREE.Camera;

  constructor(camera: THREE.Camera) {
    this.camera = camera;
  }

  tweenCamera(orientation: Orientation) {
    const { offsetFactor } = orientation;

    if (this.camera) {
      const offsetUnit = this.camera.position.length();
      const offset = new THREE.Vector3(
        offsetUnit * offsetFactor.x,
        offsetUnit * offsetFactor.y,
        offsetUnit * offsetFactor.z
      );

      const center = new THREE.Vector3();
      const finishPosition = center.add(offset);

      // The target position the camera should always look at
      const targetPosition = new THREE.Vector3(0, 0, 0);

      const positionTween = new TWEEN.Tween(this.camera.position)
        .to(finishPosition, 300)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(() => {
          // Update the camera rotation to look at the target position
          this.camera.lookAt(targetPosition);
        });

      positionTween.start();
    }
  }

  tweenCallback() {
    TWEEN.update();
  }
}

export default ViewCubeController;
