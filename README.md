# aframe-websurfaces

[![Latest NPM release](https://img.shields.io/npm/v/aframe-websurfaces.svg)](https://www.npmjs.com/package/aframe-websurfaces)
[![Minzipped size](https://badgen.net/bundlephobia/minzip/aframe-websurfaces)](https://bundlephobia.com/result?p=aframe-websurfaces)
[![License](https://img.shields.io/badge/license-MIT-007ec6.svg)](https://github.com/ryota-mitarai/aframe-websurfaces/blob/master/LICENSE)

An [aframe](https://github.com/aframevr/aframe) component for adding interactable web pages to your scene.

Checkout the [live example](https://codesandbox.io/s/aframe-websurfaces-example-l44vc).

![Example gif](https://github.com/ryota-mitarai/aframe-websurfaces/blob/master/examples/example1.gif)

## Usage

To create a websurface, just add the **websurface** component. This will create an iframe and project it's contents onto a plane:

```html
<a-entity websurface></a-entity>
```

### Properties

| Property         | Description                               | Default             |
| ---------------- | ----------------------------------------- | ------------------- |
| url              | the url of the web page                   | "https://aframe.io" |
| width            | width of the websurface                   | 1                   |
| height           | height of the websurface                  | 0.75                |
| isInteractable   | enables mouse interaction                 | true                |
|                  |                                           |                     |
| frameSkips       | updates render\* on every n cycles        | 1                   |
| autoSceneStyling | sets _scene.style.position_ to "absolute" | true                |

\*note - only the shape of the web page in the scene is affected by this, the web page will still play at normal speed

### Data Endpoints

The following are made externally available, which may be helpful for some complex use cases. For normal use these can be ignored.

| Property                    | Description                         |
| --------------------------- | ----------------------------------- |
| el.websurface_iframe        | gives the used iframe               |
| el.css3d_context            | gives the DOMContext                |
| el.css3d_context.domElement | gives the div that stores the css3d |

## Additional Info

The web page is not actually present inside the aframe scene, only an empty plane is. Because of this, the web page is not visible in VR.

Under the hood this uses a modified version of [three-dom-elements](https://github.com/CodyJasonBennett/three-dom-elements), massive props there.
