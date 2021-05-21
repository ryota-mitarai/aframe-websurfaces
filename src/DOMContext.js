import { CSS3DRenderer } from './lib/CSS3DRenderer';
import { cssFactor } from './constants';
export class DOMContext {
  /**
   * DOM context instance
   * @param camera  A perspective camera instance to draw from
   */
  constructor(camera, websurfaceEntity) {
    //@custom
    this.websurfaceEntity = websurfaceEntity;
    // Set default settings
    this.enabled = true;
    // Init renderer
    this.cssRenderer = new CSS3DRenderer();
    this.domElement = this.cssRenderer.domElement;
    // Init camera
    this.cssCamera = new THREE.PerspectiveCamera(
      camera.fov,
      camera.aspect,
      camera.near * cssFactor,
      camera.far * cssFactor
    );
    this.camera = camera;
    // Init scene
    this.cssScene = new THREE.Scene();
    // Bind update
    this.update = this.update.bind(this);
  }
  /**
   * Resizes the DOM context's renderer and camera
   * @param width Target width
   * @param height Target height
   */
  setSize(width, height) {
    this.cssRenderer.setSize(width, height);
    this.cssCamera.aspect = width / height;
    this.cssCamera.updateProjectionMatrix();
  }
  /**
   * Updates the DOM context's renderer and camera states
   */
  update() {
    //@custom
    let camPos = new THREE.Vector3();
    let camQuat = new THREE.Quaternion();
    let _camScale = new THREE.Vector3();
    this.camera.matrixWorld.decompose(camPos, camQuat, _camScale);
    // Sync CSS camera with WebGL camera
    this.cssCamera.quaternion.copy(camQuat);
    this.cssCamera.position.copy(camPos).multiplyScalar(cssFactor);
    // Render projection
    this.cssRenderer.render(this.cssScene, this.cssCamera);
  }
}
