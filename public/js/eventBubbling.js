 let foodItem = document.querySelector(".food-item");

foodItem.addEventListener("mouseover", (event) => {
  event.stopPropagation();  // Fixed here
  console.log("food item hovered");
});
