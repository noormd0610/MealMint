 
  const scrollMenu = document.querySelector(".scroll-menu");
  const leftArrow = document.querySelector(".scroll-btn.left");
  const rightArrow = document.querySelector(".scroll-btn.right");

  leftArrow.addEventListener("click", () => {
    scrollMenu.scrollBy({ left: -300, behavior: 'smooth' });
  });

  rightArrow.addEventListener("click", () => {
    scrollMenu.scrollBy({ left: 300, behavior: 'smooth' });
  });
 
