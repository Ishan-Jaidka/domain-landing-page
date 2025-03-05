// Fetch links from links.json and display them
fetch("links.json")
  .then((response) => response.json())
  .then((data) => {
    const linksContainer = document.getElementById("links");
    data.forEach((link) => {
      const a = document.createElement("a");
      a.href = link.url;
      a.textContent = link.name;
      a.target = "_blank";
      linksContainer.appendChild(a);
    });
  })
  .catch((error) => console.error("Error loading links:", error));

// Create floating particles
function createParticles(num) {
  for (let i = 0; i < num; i++) {
    let particle = document.createElement("div");
    particle.classList.add("particle");
    document.body.appendChild(particle);

    let size = Math.random() * 8 + 2; // Random size
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
  }
}

createParticles(50);
