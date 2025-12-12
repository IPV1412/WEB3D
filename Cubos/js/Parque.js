const scene = new THREE.Scene();

// Cámara
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luz ambiental
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// Luz puntual
const point = new THREE.PointLight(0xffffff, 1);
point.position.set(2, 3, 2);
scene.add(point);

// Piso
const piso = new THREE.PlaneGeometry(20, 20);
const pastoMat = new THREE.MeshStandardMaterial({ color: 0x00943C });
const pasto = new THREE.Mesh(piso, pastoMat);
pasto.rotation.x = -Math.PI / 2;
pasto.position.y = -1;
scene.add(pasto);

// Banca
function bancas(x, z) {
    const mat = new THREE.MeshStandardMaterial({ color: 0x5C2E00 });

    const asiento = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.2, 5),
        mat
    );
    asiento.position.set(x, -0.5, z);

    const pataGeo = new THREE.BoxGeometry(0.2, 0.5, 0.2);

    const pata1 = new THREE.Mesh(pataGeo, mat);
    pata1.position.set(x - 0.8, -0.75, z - 2);

    const pata2 = pata1.clone();
    pata2.position.x = x + 0.8;

    const pata3 = pata1.clone();
    pata3.position.z = z + 2;

    const pata4 = pata2.clone();
    pata4.position.z = z + 2;

    scene.add(asiento, pata1, pata2, pata3, pata4);
}

bancas(-4, 2);

// Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Render estático (SIN animación)
renderer.render(scene, camera);


