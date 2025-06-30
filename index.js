import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Canvas aus HTML holen
const container = document.getElementById("viewer");
const canvas = document.getElementById("myCanvas");

// Szene und Kamera einrichten
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(1.1, 1.1, 1.1);

// Renderer mit bestehender Canvas initialisieren
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Licht
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

//Lights
const ambient = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambient);

const hemisphere = new THREE.HemisphereLight(0xffffff, 0x333333, 0.7);
scene.add(hemisphere);

const directional = new THREE.DirectionalLight(0xffffff, 0.8);
directional.position.set(3, 10, 5);
directional.castShadow = true;
scene.add(directional);


// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// GLTFLoader und Animation
const loader = new GLTFLoader();
let mixer = null; // AnimationMixer für Animationen

loader.load(
  "BA_Animation_test2.glb", // Pfad zur 3D-Datei (im selben Ordner)
  (gltf) => {
    const model = gltf.scene;

    //Boden entfernen
    const objectToRemove = model.getObjectByName("Cylinder");
    model.remove(objectToRemove);

    // Position des Modells anpassen
    model.position.set(0, -0.8, 0);

    scene.add(model);

    if (gltf.animations && gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(model);
      gltf.animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.play();
      });
    }
  },
  undefined,
  (error) => {
    console.error("Fehler beim Laden des Modells:", error);
  }
);

// Fenstergröße berücksichtigen
window.addEventListener("resize", () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});

// Animationsschleife
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);

  controls.update();
  renderer.render(scene, camera);
}

animate();


//Imageselector
let imgSelector1 = document.getElementById("img1");
let imgShow1 = document.getElementById("showIMG1");
let imgSelector2 = document.getElementById("img2");
let imgShow2 = document.getElementById("showIMG2");
let imgSelector3 = document.getElementById("img3");
let imgShow3 = document.getElementById("showIMG3");
let imgSelector4 = document.getElementById("img4");
let imgShow4 = document.getElementById("myCanvas");

imgSelector1.addEventListener("click", function (){
  imgShow1.style.display = "block";

  imgShow2.style.display = "none";
  imgShow3.style.display = "none";
  imgShow4.style.display = "none";
});

imgSelector2.addEventListener("click", function (){
  imgShow2.style.display = "block";

  imgShow1.style.display = "none";
  imgShow3.style.display = "none";
  imgShow4.style.display = "none";
});

imgSelector3.addEventListener("click", function (){
  imgShow3.style.display = "block";

  imgShow1.style.display = "none";
  imgShow2.style.display = "none";
  imgShow4.style.display = "none";
});

imgSelector4.addEventListener("click", function (){
  imgShow4.style.display = "block";

  imgShow1.style.display = "none";
  imgShow2.style.display = "none";
  imgShow3.style.display = "none";
});