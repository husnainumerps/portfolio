const customWrapper = document.querySelector(".custom-wrapper");
const customCarousel = document.querySelector(".custom-carousel");
const firstCardWidth = customCarousel.querySelector(".custom-card").offsetWidth;
const customArrowBtns = document.querySelectorAll(".custom-wrapper i");
const customCarouselChildrens = [...customCarousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(customCarousel.offsetWidth / firstCardWidth);

// Scroll the carousel at the appropriate position to hide the first few duplicate cards on Firefox
customCarousel.classList.add("no-transition");
customCarousel.scrollLeft = customCarousel.offsetWidth;
customCarousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
customArrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        customCarousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    customCarousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = customCarousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    customCarousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    customCarousel.classList.remove("dragging");
}

const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return; // Return if the window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => customCarousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

customCarousel.addEventListener("mousedown", dragStart);
customCarousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
customWrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
customWrapper.addEventListener("mouseleave", autoPlay);
