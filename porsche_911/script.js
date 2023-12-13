// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("carCanvas") });
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

// Load car model (replace desired model)
const loader = new THREE.GLTFLoader();
let carModel;
loader.load("E:\Github\CPSC491\Insert-3D-Objects-in-a-webpage-using-HTML-and-CSS-only-main\assets\HTC_Vive_Headset.gltf", (gltf) => {
    carModel = gltf.scene;
    carModel.scale.set(0.9, 0.9, 0.9);

    scene.add(carModel);

     // Add directional light to illuminate the model
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
     directionalLight.position.set(0.9, 0.9, 0.9); // Set the light direction
     scene.add(directionalLight);

    camera.position.z = 1;
});

// Add color options and rim options (modify as needed)
const colorOptions = [
    0xff0000, // Red
    0x00ff00, // Green
    0x0000ff, // Blue
];

const rimOptions = [
    "Rim 1",
    "Rim 2",
    "Rim 3",
];

// Add color options to the palette
const colorPalette = document.querySelector(".color-palette");
colorOptions.forEach((color) => {
    const colorButton = document.createElement("button");
    colorButton.style.backgroundColor = `#${color.toString(16)}`;
    colorButton.addEventListener("click", () => applyColor(color));
    colorPalette.appendChild(colorButton);
});

// Rim preview buttons
const prevRimButton = document.getElementById("prevRim");
const nextRimButton = document.getElementById("nextRim");
let currentRimIndex = 0;

prevRimButton.addEventListener("click", () => changeRim(-1));
nextRimButton.addEventListener("click", () => changeRim(1));

function applyColor(color) {
    if (carModel) {
        carModel.traverse((child) => {
            if (child.isMesh) {
                child.material.color.setHex(color);
            }
        });
    }
}

function changeRim(step) {
    currentRimIndex += step;
    if (currentRimIndex < 0) {
        currentRimIndex = rimOptions.length - 1;
    } else if (currentRimIndex >= rimOptions.length) {
        currentRimIndex = 0;
    }
    console.log(`Previewing ${rimOptions[currentRimIndex]}`);
    // Apply rim preview logic here (e.g., replace a rim model)
}

// Render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
