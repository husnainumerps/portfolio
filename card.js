const customWrapper = document.querySelector(".custom-wrapper");
const customCarousel = document.querySelector(".custom-carousel");
const firstCustomCardWidth = customCarousel.querySelector(".custom-card").offsetWidth;
const customArrowBtns = document.querySelectorAll(".custom-wrapper .custom-icon");

let isDragging = false;
let startX;
let startScrollLeft;

// Add event listeners for the arrow buttons to scroll the carousel left and right
customArrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const scrollAmount = btn.classList.contains("custom-icon-left") ? -firstCustomCardWidth : firstCustomCardWidth;
        customCarousel.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
        });
    });
});

// Prevent the default behavior of the wheel event to disable scrolling
customCarousel.addEventListener("wheel", e => {
    e.preventDefault();
});

const dragStart = (e) => {
    e.preventDefault();
    isDragging = true;
    customCarousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = customCarousel.scrollLeft;
    
    // Disable text selection during dragging
    document.onselectstart = function() { return false; };
}

const dragging = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    customCarousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    customCarousel.classList.remove("dragging");
    
    // Re-enable text selection after dragging
    document.onselectstart = function() { return true; };
}

customCarousel.addEventListener("mousedown", dragStart);
customCarousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
