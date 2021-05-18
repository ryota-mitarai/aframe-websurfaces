# aframe-websurfaces

A component to insert interactable webpages into your aframe scene.

![Example gif](https://github.com/ryota-mitarai/aframe-websurfaces/blob/master/examples/example1.gif)

## Usage

Just add the **websurface** component. This will create an iframe and project it's contents onto a plane:

```
<a-entity websurface></a-entity>
```

Additional parameters can be specified:

```
<a-entity websurface="url:https://aframe.io/aframe/examples/showcase/spheres-and-fog/; width:4; height:2;" position="1 1 -2" rotation="0 45 0" scale="2 2 1"></a-entity>
```

## Additional Info

The webpage is not actually present inside the aframe scene, only an empty plane is. Because of this, it is not visible in VR.
