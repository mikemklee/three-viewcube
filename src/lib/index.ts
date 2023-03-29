import * as THREE from "three";

export type Orientation = {
  offsetFactor: {
    x: number;
    y: number;
    z: number;
  };
  axisAngle: {
    x: number;
    y: number;
    z: number;
  };
};

const TOP: Orientation = {
  offsetFactor: {
    x: 0,
    y: 0,
    z: 1,
  },
  axisAngle: {
    x: 0,
    y: 0,
    z: 0,
  },
};

const BOTTOM: Orientation = {
  offsetFactor: {
    x: 0,
    y: 0,
    z: -1,
  },
  axisAngle: {
    x: Math.PI,
    y: 0,
    z: 0,
  },
};

const FRONT: Orientation = {
  offsetFactor: {
    x: 0,
    y: -1,
    z: 0,
  },
  axisAngle: {
    x: Math.PI / 2,
    y: 0,
    z: 0,
  },
};

const BACK: Orientation = {
  offsetFactor: {
    x: 0,
    y: 1,
    z: 0,
  },
  axisAngle: {
    x: -(Math.PI / 2),
    y: 0,
    z: Math.PI,
  },
};

const LEFT: Orientation = {
  offsetFactor: {
    x: -1,
    y: 0,
    z: 0,
  },
  axisAngle: {
    x: Math.PI / 2,
    y: -(Math.PI / 2),
    z: 0,
  },
};

const RIGHT: Orientation = {
  offsetFactor: {
    x: 1,
    y: 0,
    z: 0,
  },
  axisAngle: {
    x: Math.PI / 2,
    y: Math.PI / 2,
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
  private object: THREE.Object3D;

  constructor(camera: THREE.Camera, object: THREE.Object3D) {
    this.camera = camera;
    this.object = object;
  }

  tweenCamera(orientation: Orientation) {
    const { offsetFactor, axisAngle } = orientation;

    if (this.camera && this.object) {
      const offsetUnit = this.camera.position.length();
      const offset = new THREE.Vector3(
        offsetUnit * offsetFactor.x,
        offsetUnit * offsetFactor.y,
        offsetUnit * offsetFactor.z
      );

      const center = new THREE.Vector3();
      const finishPosition = center.add(offset);

      const positionTween = new TWEEN.Tween(this.camera.position)
        .to(finishPosition, 300)
        .easing(TWEEN.Easing.Circular.Out);

      const euler = new THREE.Euler(axisAngle.x, axisAngle.y, axisAngle.z);

      // Rotate camera too!
      const finishQuaternion = new THREE.Quaternion()
        .copy(this.camera.quaternion)
        .setFromEuler(euler);

      const quaternionTween = new TWEEN.Tween(this.camera.quaternion)
        .to(finishQuaternion, 300)
        .easing(TWEEN.Easing.Circular.Out);

      positionTween.start();
      quaternionTween.start();
    }
  }
}

export default ViewCubeController;
