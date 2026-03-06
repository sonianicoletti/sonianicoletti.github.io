// project-detail.js — renders a single project page based on ?title= query param

async function loadProject() {
    const params = new URLSearchParams(window.location.search);
    const titleParam = params.get("title");

    if (!titleParam) {
        showError("No project specified.");
        return;
    }

    let projects;
    try {
        const response = await fetch("assets/descriptions/projects.json");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        projects = await response.json();
    } catch (err) {
        showError("Could not load project data.");
        console.error(err);
        return;
    }

    const project = projects.find(
        p => p.title.toLowerCase() === decodeURIComponent(titleParam).toLowerCase()
    );

    if (!project) {
        showError("Project not found.");
        return;
    }

    // Update page title
    document.title = `${project.title} – Sonia Nicoletti`;

    renderProject(project);
}

function renderProject(project) {
    const container = document.getElementById("project-detail");

    // Build images list
    const images = project.images
        ? project.images.map(img => `${project.images_folder}/${img}`)
        : [`${project.images_folder}/${project.default_img}`];

    // Topics tags
    const topicsHTML = (project.topics || [])
        .map(t => `<span class="project-tag">${t}</span>`)
        .join("");

    // Tech stack
    const techHTML = (project.tech_stack || []).join(", ");

    // Carousel or single image
    const mediaHTML = images.length > 1
        ? buildCarousel(images, project.title)
        : `<div class="project-detail-image">
               <img src="${images[0]}" alt="${project.title}">
           </div>`;

    // GitHub link (optional)
    const repoHTML = project.repo
        ? `<a href="${project.repo}" class="project-link" target="_blank" rel="noopener">GitHub Repo</a>`
        : "";

    container.innerHTML = `
        <div class="project-detail-inner">
            <p class="project-detail-date">${project.date || ""}</p>
            <h2 class="project-detail-title">${project.title}</h2>
            <div class="project-tags">${topicsHTML}</div>
            ${mediaHTML}
            <p class="project-detail-desc">${project.long_description}</p>
            ${techHTML ? `<p class="project-detail-tech"><strong>Tech stack:</strong> ${techHTML}</p>` : ""}
            ${repoHTML}
        </div>
    `;

    // Init carousel if needed
    if (images.length > 1) initCarousel();
}

function buildCarousel(images, title) {
    const slides = images.map((src, i) =>
        `<div class="carousel-slide ${i === 0 ? "active" : ""}">
            <img src="${src}" alt="${title} image ${i + 1}">
        </div>`
    ).join("");

    return `
        <div class="carousel">
            <button class="carousel-btn carousel-prev" aria-label="Previous">&#8592;</button>
            <div class="carousel-track">${slides}</div>
            <button class="carousel-btn carousel-next" aria-label="Next">&#8594;</button>
        </div>
    `;
}

function initCarousel() {
    const slides = document.querySelectorAll(".carousel-slide");
    let current = 0;

    function goTo(index) {
        slides[current].classList.remove("active");
        current = (index + slides.length) % slides.length;
        slides[current].classList.add("active");
    }

    document.querySelector(".carousel-prev").addEventListener("click", () => goTo(current - 1));
    document.querySelector(".carousel-next").addEventListener("click", () => goTo(current + 1));
}

function showError(msg) {
    document.getElementById("project-detail").innerHTML =
        `<p class="projects-empty">${msg}</p>`;
}

loadProject();