document.addEventListener("DOMContentLoaded", () => {
  // Bật/Tắt Menu Bên (Sidebar)
  const sidebar = document.querySelector(".sidebar");
  const toggleButton = document.createElement("button");
  toggleButton.innerHTML = "Menu";
  toggleButton.classList.add("sidebar-toggle");
  document.body.appendChild(toggleButton);

  toggleButton.addEventListener("click", () => {
    const isVisible = sidebar.style.transform === "translateX(0%)";
    sidebar.style.transform = isVisible
      ? "translateX(-100%)"
      : "translateX(0%)";
  });

// Cài đặt Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);

// Xử lý zoom trang
const zoomFactor = 0.9; // Phần trăm zoom của trang, điều chỉnh theo nhu cầu
const scale = 1 / zoomFactor;

renderer.setSize(window.innerWidth * scale, window.innerHeight * scale);
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

const loader = new THREE.FontLoader();
loader.load(
  "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
  (font) => {
    const textGeometry = new THREE.TextGeometry("C++", {
      font: font,
      size: 1.5,
      height: 0.3,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelOffset: 0,
      bevelSegments: 5,
    });

    const material = new THREE.MeshStandardMaterial({
      color: 0x0077ff,
      roughness: 0.5,
      metalness: 0.7,
    });

    const textMesh = new THREE.Mesh(textGeometry, material);
    textGeometry.computeBoundingBox();
    textGeometry.center();
    textMesh.position.z = -4;

    scene.add(textMesh);
    animate();
  }
);

// Ánh sáng
const ambientLight = new THREE.AmbientLight(0x404040);
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(ambientLight);
scene.add(pointLight);

camera.position.z = 6;

function animate() {
  requestAnimationFrame(animate);

  scene.traverse((child) => {
    if (
      child instanceof THREE.Mesh &&
      child.geometry instanceof THREE.TextGeometry
    ) {
      child.rotation.x += 0.01;
      child.rotation.y += 0.01;
    }
  });

  renderer.render(scene, camera);
}

// Cập nhật kích thước camera và renderer khi cửa sổ thay đổi kích thước
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth * scale, window.innerHeight * scale);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Khởi tạo AOS (Animate On Scroll)
AOS.init();

const text = "Cùng Xây Dựng Nền Tảng - Coding - CodeLab";
const extraSpaces = 7; // Số lượng khoảng trắng thêm vào cuối văn bản
const element = document.getElementById('typing-effect');
let index = 0;
const typingSpeed = 50; // Tốc độ gõ chữ

function typeText() {
    if (index < text.length) {
        element.innerHTML += text.charAt(index) === ' ' ? '&nbsp;' : text.charAt(index);
        index++;
        setTimeout(typeText, typingSpeed); // Điều chỉnh tốc độ gõ chữ
    } else {
        // Sau khi gõ xong văn bản chính, tiếp tục gõ khoảng trắng
        setTimeout(() => {
            for (let i = 0; i < extraSpaces; i++) {
                setTimeout(() => {
                    element.innerHTML += '&nbsp;'; // Thêm khoảng trắng
                }, i * typingSpeed); // Điều chỉnh tốc độ gõ khoảng trắng
            }
        }, typingSpeed); // Thay đổi thời gian trễ nếu cần
    }
}

document.getElementById('menu-button').addEventListener('click', function() {
  var sidePanel = document.getElementById('side-panel');
  sidePanel.classList.toggle('open');
});





typeText();
;
});

