const popup = document.querySelector(".popUp");
const dismiss = document.querySelector("#dismiss");

console.log(popup, dismiss);

dismiss.addEventListener("mouseover", () => {
  dismiss.style.backgroundColor = "#888";
});

dismiss.addEventListener("mouseleave", () => {
  dismiss.style.backgroundColor = "";
});

dismiss.addEventListener("click", () => {
  popup.style.display = "none";
});