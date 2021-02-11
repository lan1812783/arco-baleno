const scrollIcon = document.querySelector(".scrollIcon");

// Remove the scroll icon when scroll bar híts the end of the page, if the scroll bar hits the top, the scroll icon reappears
window.addEventListener("scroll", () => {
  const scrolledHeight = window.scrollY;
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  if (Math.ceil(scrolledHeight) === scrollableHeight) {
    scrollIcon.classList.add("fadeScrollIcon");
  } else if (scrolledHeight === 0) {
    scrollIcon.classList.remove("fadeScrollIcon");
  }
});

let counter = 1;
const prevBtn = document.querySelector(".carousel-prev-button");
const nextBtn = document.querySelector(".carousel-next-button");
const carouselSlide = document.querySelector(".carousel-slide");
const carouselImages = document.querySelectorAll(".carousel-slide img");
const size = carouselImages[0].width;

// Because the first image is the clone of the last slide's image, so this line helps move to the actual first slide which contains the second image
carouselSlide.style.transform = `translate(${-size * counter}px)`;

// Automatic slideing carousel
const automate = () => {
  return setInterval(() => {
    if (counter < carouselImages.length - 1) {
      setTimeout(() => {
        counter += 1;
        carouselSlide.style.transition = "all 0.5s ease-in-out";
        carouselSlide.style.transform = `translate(${-size * counter}px)`;
      }, 0);
    }
  }, 2000);
}
let automationInterval = automate();

prevBtn.addEventListener("click", () => {
  clearInterval(automationInterval);
  automationInterval = automate();
  if (counter <= 0) return;

  counter -= 1;
  carouselSlide.style.transition = "all 0.5s ease-in-out";
  carouselSlide.style.transform = `translate(${-size * counter}px)`;
});

nextBtn.addEventListener("click", () => {
  clearInterval(automationInterval);
  automationInterval = automate();
  if (counter >= carouselImages.length - 1) return;

  counter += 1;
  carouselSlide.style.transition = "all 0.5s ease-in-out";
  carouselSlide.style.transform = `translate(${-size * counter}px)`;
});

carouselSlide.addEventListener("transitionend", () => {
  if (carouselImages[counter].id === "firstSlideClone") {
    counter = 1;
    carouselSlide.style.transition = "none";
    carouselSlide.style.transform = `translate(${-size}px)`;
  }

  if (carouselImages[counter].id === "lastSlideClone") {
    counter = carouselImages.length - 2;
    carouselSlide.style.transition = "none";
    carouselSlide.style.transform = `translate(${-size * counter}px)`;
  }
});
