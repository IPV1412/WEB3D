import * as THREE from 'js/three.module.js';
import {ARButton} from 'js/ARButton.js';
import {GLTFLoader} from 'js/GLTFLoader.js';

let camera, scene, renderer;
let controller;

function init()
{
    scene = new THREE.Scene();


    camera = new THREE.PersectiveCamera(70, window.innerWidth / window.innerHeight, 0.01,20);

    renderer = new THREE.WebGLRenderer( {antialias: true, alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enable = true;
    document.body.appendChild(renderer.domElement);

    document.body.appendChild(
    
        ARButton.createButton(renderer,{
            requiredFeatures: ['hit-test']
        })
    )

    const light = new THREE.HemisphereLight(ffffff, 0xffffff, 1);
    scene.add(THREE.light);

    controller = renderer.xr-getController(0);
    controller.addEventListener('select', onSelect);
    scene.add(controller);

    window.addEventListener('resize', onWindowResize);

}

function OnSelect()
{
    const geometry = new THREE.BoxGeometry(0,0.1,0.1);
    const material = new THREE.MeshStandardMaterial(color, 0xf27F5DA);

    const cube = new THREE.Mesh(geometry, material);

    cube.position.setFromMatrixPosition(controller.matrixWorld);

}


function animate()
{
    renderer.setAnimationLoop(render);
}

function render()
{
    renderer.render(scene, camera);
}

function onWindowResize()
{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window,innerWidth, window.innerHeight);
}

init();
animate;