import { CSS3DObject } from './lib/CSS3DRenderer';
import { cssFactor } from './constants';
export class DOMElement extends THREE.Mesh {
  /**
   * DOM element that is projected into 3D space
   * @param context A DOM context instance to draw on
   * @param domElement A DOM element to project
   * @param options DOM element options
   * @param options.elementWidth DOM element width
   * @param options.width 3D plane width
   * @param options.height 3D plane height
   */
  constructor(context, domElement, width, height, { elementWidth = 1280 } = {}) {
    // Create portal mesh
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({
      opacity: 0,
      blending: THREE.NoBlending,
      side: THREE.DoubleSide,
      color: new THREE.Color(0, 0, 0),
    });
    super(geometry, material);
    // Expose params
    this.context = context;
    this.domElement = domElement;
    this.aspectRatio = height / width;
    this.elementWidth = elementWidth;
    this.elementHeight = this.elementWidth * this.aspectRatio;
    this.width = width;
    this.height = height;
    // Set initial size
    this.resizeElement();
    // Init 3D DOM
    this.cssObject = new CSS3DObject(this.domElement);
    this.cssObject.scale.multiplyScalar(cssFactor / (this.elementWidth / this.width));
    //@custom
    this.cssObjectInitialScale = this.cssObject.scale;
    // Init helpers
    this.size = new THREE.Vector3();
    this.box = new THREE.Box3();
    // Init events
    this.addEventListener('added', this.handleAdded);
    this.addEventListener('removed', this.handleRemoved);
    // Bind update
    this.update = this.update.bind(this);
  }
  /**
   * Adds the current cssObject to the scene
   */
  handleAdded() {
    this.context.cssScene.add(this.cssObject);
  }
  /**
   * Removes the current cssObject from the scene
   */
  handleRemoved() {
    this.context.cssScene.remove(this.cssObject);
  }
  /**
   * Resizes DOM element to sync with projection
   */
  resizeElement() {
    this.domElement.style.width = `${this.elementWidth}px`;
    this.domElement.style.height = `${this.elementHeight}px`;
  }
  /**
   * Updates the projected DOM element
   * @param domElement A DOM element to project
   */
  setElement(domElement) {
    // Cleanup previous element
    if (this.domElement.parentNode) {
      this.domElement.parentNode.removeChild(this.domElement);
    }
    // Set new element
    this.domElement = domElement;
    this.cssObject.element = domElement;
    // Reset element size
    this.resizeElement();
  }
  /**
   * Updates the DOM element and its projection states
   */
  //@custom
  update(obj) {
    // Sync CSS properties with WebGL mesh
    this.cssObject.quaternion.copy(obj.quaternion);
    this.cssObject.position.copy(obj.position).multiplyScalar(cssFactor);
    // Calculate CSS scale factor
    this.box.setFromObject(this).getSize(this.size);
    const scaleFactor = obj.scale;
    // Sync CSS scale with WebGL projection
    if (this.oldScaleFactor != scaleFactor) {
      this.oldScaleFactor = scaleFactor;
      this.cssObject.scale.set(
        this.cssObjectInitialScale.x,
        this.cssObjectInitialScale.y,
        this.cssObjectInitialScale.z
      );
      this.cssObject.scale.multiply(scaleFactor);
    }
    this.cssObject.visible = obj.visible;
  }
  /**
   * Disposes WebGL and DOM elements
   */
  dispose() {
    // Cleanup events
    this.removeEventListener('added', this.handleAdded);
    this.removeEventListener('removed', this.handleRemoved);
    // Cleanup DOM
    this.domElement.remove();
    // Cleanup WebGL
    this.geometry.dispose();
    this.material.dispose();
  }
}
