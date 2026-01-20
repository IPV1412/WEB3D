
import * as THREE from './js/three.module.js';

let camera, scene, renderer;
let controller;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);

    // Botón AR simple (evita depender de ARButton.js)
    createARButton();

    const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    scene.add(light);

    controller = renderer.xr.getController(0);
    controller.addEventListener('select', OnSelect);
    scene.add(controller);

    window.addEventListener('resize', onWindowResize);
}

function createARButton() {
    if (navigator.xr === undefined) {
        const msg = document.createElement('div');
        msg.textContent = 'WebXR no disponible en este navegador';
        msg.style.position = 'absolute';
        msg.style.top = '10px';
        msg.style.left = '10px';
        msg.style.background = 'rgba(0,0,0,0.5)';
        msg.style.color = 'white';
        msg.style.padding = '6px 8px';
        document.body.appendChild(msg);
        return;
    }

    const btn = document.createElement('button');
    btn.style.position = 'absolute';
    btn.style.top = '10px';
    btn.style.left = '10px';
    btn.style.padding = '8px 12px';
    btn.style.fontSize = '14px';
    btn.textContent = 'Entrar AR';
    btn.dataset.session = '';

    btn.addEventListener('click', async () => {
        // si ya hay sesión, terminarla
        if (btn.dataset.session === 'started') {
            const session = renderer.xr.getSession();
            if (session) await session.end();
            return;
        }

        try {
            const session = await navigator.xr.requestSession('immersive-ar', { requiredFeatures: ['hit-test'] });
            renderer.xr.setSession(session);
            btn.dataset.session = 'started';
            btn.textContent = 'Salir AR';
            session.addEventListener('end', () => {
                btn.dataset.session = '';
                btn.textContent = 'Entrar AR';
            });
        } catch (err) {
            console.error('No se pudo iniciar sesión AR:', err);
            alert('Error iniciando AR: ' + (err && err.message ? err.message : err));
        }
    });

    document.body.appendChild(btn);
}

function OnSelect() {
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshStandardMaterial({ color: 0xf27f5d });

    const cube = new THREE.Mesh(geometry, material);

    // colocar la caja en la posición del controller
    cube.position.setFromMatrixPosition(controller.matrixWorld);
    scene.add(cube);
}

function animate() {
    renderer.setAnimationLoop(render);
}

function render() {
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
animate();
