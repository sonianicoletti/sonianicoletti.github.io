document.querySelectorAll('.project').forEach((project) => {
    // Function to handle toggling the project state
    const toggleProject = (event) => {
        // Prevent event propagation to avoid collapsing when clicking inside the title area
        event.stopPropagation();

        // Check if the clicked project is already expanded
        const isExpanded = project.classList.contains('expanded');

        // Collapse any expanded project
        document.querySelectorAll('.project.expanded').forEach((expandedProject) => {
            expandedProject.classList.remove('expanded');
            // Ensure project-type reappears when collapsing other projects
            const projectType = expandedProject.querySelector('.project-type');
            if (projectType) {
                projectType.style.display = 'block';
            }
        });

        // If the clicked project was not already expanded, expand it
        if (!isExpanded) {
            project.classList.add('expanded');

            // Hide the project-type for the current project
            const projectType = project.querySelector('.project-type');
            if (projectType) {
                projectType.style.display = 'none';
            }

            // Scroll to the title of the expanded project
            const title = project.querySelector('h2');
            if (title) {
                title.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    // Listen for clicks on both <h3> and <h2> elements (title)
    const title = project.querySelector('h3');
    const expandedTitle = project.querySelector('h2');

    if (title) {
        title.addEventListener('click', toggleProject);
    }

    if (expandedTitle) {
        expandedTitle.addEventListener('click', toggleProject);
    }
});

// Optional: Collapse any expanded project when clicking outside
document.body.addEventListener('click', (event) => {
    if (!event.target.closest('.project')) {
        document.querySelectorAll('.project.expanded').forEach((expandedProject) => {
            expandedProject.classList.remove('expanded');
            // Ensure project-type reappears when collapsing
            const projectType = expandedProject.querySelector('.project-type');
            if (projectType) {
                projectType.style.display = 'block';
            }
        });
    }
});

document.querySelectorAll('.carousel').forEach((carousel) => {
    const images = carousel.querySelectorAll('.carousel-image');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    let currentIndex = 0;

    function updateCarousel() {
        images.forEach((img, index) => {
            if (index === currentIndex) {
                img.classList.add('active');  // Add the 'active' class to the current image
                img.style.display = 'flex';   // Make the active image visible
            } else {
                img.classList.remove('active');  // Remove 'active' class from inactive images
                img.style.display = 'none';      // Hide inactive images
            }
        });
    }

    prevBtn.addEventListener('click', (event) => {
        // Prevent event from propagating to the parent project (so it doesn't collapse)
        event.stopPropagation();

        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
    });

    nextBtn.addEventListener('click', (event) => {
        // Prevent event from propagating to the parent project (so it doesn't collapse)
        event.stopPropagation();

        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    });

    // Initialize the carousel
    updateCarousel();
});
