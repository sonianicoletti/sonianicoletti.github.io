document.addEventListener("DOMContentLoaded", () => {
    const slideshows = document.querySelectorAll(".slideshow");
    slideshows.forEach(slideshow => {
        let images = slideshow.querySelectorAll("img");
        let index = 0;

        setInterval(() => {
            images[index].style.display = "none";
            index = (index + 1) % images.length;
            images[index].style.display = "block";
        }, 3000);
    });
});
