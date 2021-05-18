import { PerspectiveCamera, Quaternion, Scene, Vector3 } from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { DOMElement } from '../objects/DOMElement';
import { cssFactor } from '../constants';

export class DOMContext {
  /**
   * Whether to enable the `DOMContext` and its projection. Default is `true.`
   */
  enabled: boolean;
  /**
   * Renderer used for rendering the DOM
   */
  cssRenderer: CSS3DRenderer;
  /**
   * Target DOM element to render to
   */
  domElement: HTMLElement;
  /**
   * Camera used for CSS projection
   */
  cssCamera: PerspectiveCamera;
  /**
   * Parent camera used to sync with WebGL
   */
  camera: PerspectiveCamera;
  //@custom
  websurfaceEntity: any;
  /**
   * CSS scene used to contain CSS projections
   */
  cssScene: Scene;

  /**
   * DOM context instance
   * @param camera  A perspective camera instance to draw from
   */
  constructor(camera: PerspectiveCamera, websurfaceEntity: any) {
    //@custom
    this.websurfaceEntity = websurfaceEntity;

    // Set default settings
    this.enabled = true;

    // Init renderer
    this.cssRenderer = new CSS3DRenderer();
    this.domElement = this.cssRenderer.domElement;

    //@custom click detection for leaving websurface
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = '0';
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.zIndex = '-1';
    this.domElement.appendChild(div);

    div.addEventListener('click', function (event) {
      websurfaceEntity.sceneEl.style.zIndex = 2;
    });

    // Init camera
    this.cssCamera = new PerspectiveCamera(
      camera.fov,
      camera.aspect,
      camera.near * cssFactor,
      camera.far * cssFactor
    );
    this.camera = camera;

    // Init scene
    this.cssScene = new Scene();

    // Bind update
    this.update = this.update.bind(this);
  }

  /**
   * Resizes the DOM context's renderer and camera
   * @param width Target width
   * @param height Target height
   */
  setSize(width: number, height: number) {
    this.cssRenderer.setSize(width, height);
    this.cssCamera.aspect = width / height;
    this.cssCamera.updateProjectionMatrix();
  }

  /**
   * Updates the DOM context's renderer and camera states
   */
  update() {
    //@custom
    let camPos = new Vector3();
    let camQuat = new Quaternion();
    let camScale = new Vector3();
    this.camera.matrixWorld.decompose(camPos, camQuat, camScale);
    // Sync CSS camera with WebGL camera
    this.cssCamera.quaternion.copy(camQuat);
    this.cssCamera.position.copy(camPos).multiplyScalar(cssFactor);

    // Render projection
    this.cssRenderer.render(this.cssScene, this.cssCamera);
  }
}
