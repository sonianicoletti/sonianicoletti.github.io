// projects.js — loads projects.json and renders current / closed lists

async function loadProjects() {
    try {
        const response = await fetch("assets/descriptions/projects.json");
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.url}`);
        const projects = await response.json();

        const currentList = document.getElementById("current-projects-list");
        const closedList  = document.getElementById("closed-projects-list");

        const currentProjects = projects.filter(p => p.status === "open");
        const closedProjects  = projects.filter(p => p.status !== "open");

        renderProjects(currentProjects, currentList);
        renderProjects(closedProjects,  closedList);

        if (closedProjects.length === 0) {
            document.getElementById("closed-projects").style.display = "none";
        }
    } catch (err) {
        console.error("Failed to load projects:", err);
    }
}

function renderProjects(projects, container) {
    if (projects.length === 0) {
        container.innerHTML = '<p class="projects-empty">Nothing here yet.</p>';
        return;
    }

    projects.forEach(project => {
        const imgSrc = `${project.images_folder}/${project.default_img}`;
        const detailURL = `project.html?title=${encodeURIComponent(project.title)}`;

        const item = document.createElement("div");
        item.classList.add("project-item");

        item.innerHTML = `
            <div class="project-text">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.short_description}</p>
                <a href="${detailURL}" class="project-link">Learn more</a>
            </div>
            <div class="project-image">
                <img src="${imgSrc}" alt="${project.title}">
            </div>
        `;

        container.appendChild(item);
    });
}

loadProjects();