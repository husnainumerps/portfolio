const hamburger_menu = document.querySelector(".hamburger-menu");
const container = document.querySelector(".contain");

hamburger_menu.addEventListener("click", () => {
  container.classList.toggle("active");
});

const tll = gsap.timeline({
  paused: "true",
});
tll.to("#percent, #bar", {
  duration: 0.2,
  opacity: 0,
  zIndex: -1,
});
tll.to("#preloaderrr", {
  duration: 0.8,
  opacity: 0, // Fade out the preloader
  // backgroundColor: "red", // Change background color to red during the animation
  onComplete: function() {
    document.getElementById('preloaderrr').style.display = 'none'; // Set display to none after animation completes
  }
});
tll.from(
  ".contain",
  {
    duration: 0.8,
    y: "-150%",
  },
  "-=.2"
);

var height = 1; // Initial height
var bar = document.getElementById("barconfrm");
var id;

function move() {
  id = setInterval(frame, 10);
}

function frame() {
  if (height >= 100) {
    clearInterval(id);
    tll.play();
  } else {
    height++;
    bar.style.height = height + "%";
    document.getElementById("percent").innerHTML = height + "%";
  }
}
