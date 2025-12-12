const scene = new THREE.Scene();

// Declaramos cámara
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Agregamos luz ambiental
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// Agregamos punto de luz para generar sombras
const point = new THREE.PointLight(0xffffff, 1);
point.position.set(2, 3, 2);
scene.add(point);

// Creamos 3 cuboides de diferentes tamaños
// Cuboide A: Ancho x Alto x Profundo
const geometryA = new THREE.BoxGeometry(1.5, 0.8, 1.2);
// Cuboide B: Ancho x Alto x Profundo  
const geometryB = new THREE.BoxGeometry(0.9, 1.4, 1.1);
// Cuboide C: Ancho x Alto x Profundo
const geometryC = new THREE.BoxGeometry(1.1, 0.7, 1.6);

const materialA = new THREE.MeshStandardMaterial({ color: 0xFF2A00 });
const materialB = new THREE.MeshStandardMaterial({ color: 0x00A6FF });
const materialC = new THREE.MeshStandardMaterial({ color: 0x00FF6A });

const cuboidA = new THREE.Mesh(geometryA, materialA);
const cuboidB = new THREE.Mesh(geometryB, materialB);
const cuboidC = new THREE.Mesh(geometryC, materialC);

// Posicionamos los cuboides
cuboidA.position.x = -2.5;
cuboidB.position.x = 0;
cuboidC.position.x = 2.5;

scene.add(cuboidA, cuboidB, cuboidC);
// =============================================================
// ==============   NUEVOS 3 CUBOS (D, E, F)   =================
// =============================================================

// Geometrías
const geometryD = new THREE.BoxGeometry(1.2, 1.2, 1.2);
const geometryE = new THREE.BoxGeometry(1.8, 0.8, 0.8);
const geometryF = new THREE.BoxGeometry(0.7, 1.8, 0.7);

// Materiales
const materialD = new THREE.MeshStandardMaterial({ color: 0xFFD700 }); // dorado
const materialE = new THREE.MeshStandardMaterial({ color: 0xAA00FF }); // púrpura
const materialF = new THREE.MeshStandardMaterial({ color: 0xFFFFFF }); // blanco

// Meshes
const cuboidD = new THREE.Mesh(geometryD, materialD);
const cuboidE = new THREE.Mesh(geometryE, materialE);
const cuboidF = new THREE.Mesh(geometryF, materialF);

// Posiciones de los nuevos cubos
cuboidD.position.set(-2, -2, 0);
cuboidE.position.set(2, -2, 0);
cuboidF.position.set(0, 2.5, 0);

// Agregar los nuevos cubos a la escena
scene.add(cuboidD, cuboidE, cuboidF);

// =============================================================
// =========  FIN DE LA CONFIGURACIÓN DE LOS NUEVOS CUBOS  =====
// =============================================================
// Variables para controlar las rotaciones
let rotarIndividual = true;
let rotarGlobal = false;

// Grupo para rotación global
const grupoGlobal = new THREE.Group();
scene.add(grupoGlobal);
grupoGlobal.add(cuboidA, cuboidB, cuboidC, cuboidD, cuboidE, cuboidF);

// Cambio de color (aplica a todos los cuboides)
document.getElementById('cuboColor')?.addEventListener('change', (e) => {
    const colorHex = e.target.value;
    cuboidA.material.color.set(colorHex);
    cuboidB.material.color.set(colorHex);
    cuboidC.material.color.set(colorHex);
});

// Cambio de iluminación
document.getElementById('pointLight')?.addEventListener('input', (e) => {
    point.intensity = parseFloat(e.target.value);
});

// Activación y desactivación de rotación individual
document.getElementById('rotate')?.addEventListener('click', () => {
    rotarIndividual = !rotarIndividual;
    document.getElementById('rotate').textContent = rotarIndividual ? 'Desactivar Rotación Individual' : 'Activar Rotación Individual';
});

// Activación y desactivación de rotación global
document.getElementById('rotateGlobal')?.addEventListener('click', () => {
    rotarGlobal = !rotarGlobal;
    document.getElementById('rotateGlobal').textContent = rotarGlobal ? 'Desactivar Rotación Global' : 'Activar Rotación Global';
});

// Animación
function animate() {
    requestAnimationFrame(animate);

    // Rotación individual (cada cuboide gira en su propio eje)
    if (rotarIndividual) {
        cuboidA.rotation.x -= 0.01;
        cuboidA.rotation.y -= 0.02;
        
        cuboidB.rotation.x += 0.05;
        cuboidB.rotation.y -= 0.03;
        
        cuboidC.rotation.x -= 0.08;
        cuboidC.rotation.y += 0.05;

        cuboidD.rotation.x -= 0.01
        cuboidD.rotation.y += 0.02

        cuboidE.rotation.x -= 0.01
        cuboidE.rotation.y += 0.02

        cuboidF.rotation.x -= 0.01
        cuboidF.rotation.y += 0.02
    }

    // Rotación global (todos giran juntos alrededor del centro de la escena)
    if (rotarGlobal) {
        grupoGlobal.rotation.y += 0.005;
        grupoGlobal.rotation.x += 0.003;
    }

    renderer.render(scene, camera);
}
animate();

// Ajustamos el tamaño al redimensionar la ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
