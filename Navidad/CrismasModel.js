
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1020);

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 5, 12);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// =======================
// LUCES
// =======================
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 8, 5);
scene.add(pointLight);

// =======================
// ÁRBOL DE NAVIDAD
// =======================
const treeGroup = new THREE.Group();
scene.add(treeGroup);

// 🌲 Material del árbol
let treeMaterial = new THREE.MeshStandardMaterial({ color: 0x0b8f2f });

// Conos (hojas)
function addLayer(radius, height, y) {
    const geometry = new THREE.ConeGeometry(radius, height, 32);
    const mesh = new THREE.Mesh(geometry, treeMaterial);
    mesh.position.y = y;
    treeGroup.add(mesh);
}

addLayer(3, 3, 1.5);
addLayer(2.4, 2.6, 3);
addLayer(1.8, 2.2, 4.3);
addLayer(1.2, 1.8, 5.5);

// 🪵 Tronco
const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.6, 2, 16),
    new THREE.MeshStandardMaterial({ color: 0x6b3e1e })
);
trunk.position.y = 0;
treeGroup.add(trunk);

// ⭐ Estrella
const star = new THREE.Mesh(
    new THREE.TetrahedronGeometry(0.5),
    new THREE.MeshStandardMaterial({
        color: 0xffd700,
        emissive: 0xffd700,
        emissiveIntensity: 0.8
    })
);
star.position.y = 6.8;
treeGroup.add(star);

// 💡 Luces decorativas
const lightColors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00];

for (let i = 0; i < 30; i++) {
    const bulb = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 12, 12),
        new THREE.MeshStandardMaterial({
            color: lightColors[Math.floor(Math.random() * lightColors.length)],
            emissive: 0xffffff,
            emissiveIntensity: 0.6
        })
    );

    const angle = Math.random() * Math.PI * 2;
    const radius = 1.2 + Math.random() * 1.8;
    const height = 1.5 + Math.random() * 4.5;

    bulb.position.set(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
    );

    treeGroup.add(bulb);
}

// =======================
// CONTROLES UI
// =======================
document.getElementById("cuboColor").addEventListener("input", e => {
    treeMaterial.color.set(e.target.value);
});

document.getElementById("pointLight").addEventListener("input", e => {
    pointLight.intensity = e.target.value;
});

// =======================
// ROTACIONES
// =======================
let rotateIndividual = true;
let rotateGlobal = false;

document.getElementById("rotate").onclick = () => {
    rotateIndividual = !rotateIndividual;
    document.getElementById("rotate").textContent =
        rotateIndividual ? "Desactivar Rotación" : "Activar Rotación";
};

document.getElementById("rotateGlobal").onclick = () => {
    rotateGlobal = !rotateGlobal;
    document.getElementById("rotateGlobal").textContent =
        rotateGlobal ? "Desactivar Rotación Global" : "Activar Rotación Global";
};

// =======================
// ANIMACIÓN
// =======================
function animate() {
    requestAnimationFrame(animate);

    if (rotateIndividual) {
        star.rotation.y += 0.02;
    }

    if (rotateGlobal) {
        treeGroup.rotation.y += 0.005;
    }

    renderer.render(scene, camera);
}
animate();

// =======================
// RESPONSIVE
// =======================
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});