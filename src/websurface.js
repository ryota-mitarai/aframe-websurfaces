//uses a modified version of https://github.com/CodyJasonBennett/three-dom-elements
import { DOMContext, DOMElement } from './three-dom-elements/src';

AFRAME.registerComponent('websurface', {
  schema: {
    url: { default: 'https://aframe.io' },
    width: { default: 1 },
    height: { default: 0.75 },
    frameSkips: { default: 1 },
    camSelector: { default: '#cam' },
    automaticSceneStyling: { default: true },
  },

  init: function () {
    const el = this.el;
    const data = this.data;

    if (data.automaticSceneStyling == true) {
      el.sceneEl.style.position = 'absolute';
    }

    data.mouseHasLeftScreen = true;

    //geometry for click detection
    el.setAttribute('geometry', `primitive:plane; width:${data.width}; height:${data.height};`);

    el.addEventListener('click', function () {
      if (data.mouseHasLeftScreen == false) return;

      document.exitPointerLock();
      el.sceneEl.style.zIndex = -2;

      data.mouseHasLeftScreen = false;
    });

    el.addEventListener('mouseleave', function () {
      data.mouseHasLeftScreen = true;
    });

    el.sceneEl.addEventListener('cam-loaded', function () {
      const iframe = document.createElement('iframe');
      iframe.src = data.url;
      iframe.style.border = 'none';

      const camera = document.querySelector(data.camSelector).object3D;

      let perspectiveCamera;
      for (var i in camera.children) {
        let child = camera.children[i];
        if (child.type == 'PerspectiveCamera') {
          perspectiveCamera = child;
          break;
        }
      }

      const context = new DOMContext(perspectiveCamera, el);
      context.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(context.domElement);

      const element = new DOMElement(context, iframe, data.width, data.height);
      el.object3D.add(element);

      data.context = context;
      data.element = element;

      window.addEventListener('resize', () => {
        context.setSize(window.innerWidth, window.innerHeight);
      });
    });

    data.frames = 0;
    data.isCamLoaded = false;
  },

  tick: function () {
    const data = this.data;

    if (data.isCamLoaded == false) {
      if (document.querySelector(data.camSelector).object3D.children[1]) {
        this.el.emit('cam-loaded');
        data.isCamLoaded = true;
      }
      return;
    }

    const context = data.context;
    const element = data.element;

    if (data.frames % data.frameSkips == 0) {
      if (context) {
        context.update();
      }
      if (element) {
        element.update(this.el.object3D);
      }
    }

    data.frames++;
  },
});
