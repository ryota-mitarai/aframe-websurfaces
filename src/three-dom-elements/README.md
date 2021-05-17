# three-dom-elements

[![Latest NPM release](https://img.shields.io/npm/v/three-dom-elements.svg)](https://www.npmjs.com/package/three-dom-elements)
[![Minzipped size](https://badgen.net/bundlephobia/minzip/three-dom-elements)](https://bundlephobia.com/result?p=three-dom-elements)
[![License](https://img.shields.io/badge/license-MIT-007ec6.svg)](https://github.com/CodyJasonBennett/three-dom-elements/blob/master/LICENSE)

A lightweight [three.js](https://github.com/mrdoob/three.js) extension to integrate DOM elements into your scene.

## Usage

The following projects an iFrame into a threejs scene as a plane. You can use this plane as normal with techniques like raycasting, etc.

View the [live demo](https://codesandbox.io/s/three-dom-elements-cg2uc).

[![Demo preview](/examples/preview.jpg)](https://codesandbox.io/s/three-dom-elements-cg2uc)

```js
import { DOMContext, DOMElement } from 'three-dom-elements';

// Create a DOM context to draw with
const context = new DOMContext(camera);
context.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(context.domElement);

// Create an element to project
const element = document.createElement('iframe');
element.src = 'https://threejs.org';
element.style.border = 'none';

// Project it
const element = new DOMElement(context, element);
scene.add(element);
```
