let links = document.querySelectorAll(".tab-link");
let contents = document.querySelectorAll(".tab-content");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // 1. Remove all active classes
    links.forEach((link) => {
      link.classList.remove("active");
    });

    // 2. Hide all tab contents
    contents.forEach((content) => {
      content.classList.add("d-none");
    });

    // 3. Get the target content and show it
    let targetId = link.getAttribute("data-target");
    document.getElementById(targetId).classList.remove("d-none");

    // 4. Set clicked link as active
    link.classList.add("active");
  });
});
