import { PerspectiveCamera, Scene } from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
export declare class DOMContext {
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
    websurfaceEntity: any;
    /**
     * CSS scene used to contain CSS projections
     */
    cssScene: Scene;
    /**
     * DOM context instance
     * @param camera  A perspective camera instance to draw from
     */
    constructor(camera: PerspectiveCamera, websurfaceEntity: any);
    /**
     * Resizes the DOM context's renderer and camera
     * @param width Target width
     * @param height Target height
     */
    setSize(width: number, height: number): void;
    /**
     * Updates the DOM context's renderer and camera states
     */
    update(): void;
}
