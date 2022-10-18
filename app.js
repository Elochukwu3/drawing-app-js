const container = document.getElementById("page-container");
const containerContent = ` <header>Drawing Board</header>
<section id="tools-board">
    <div class="row">
        <ul class="row-options">
            <label>Shapes</label>
            <li class="row-list tool" id="rectangle">
                <img src="icons/rectangle.svg" alt="">
                <span>Rectangle</span>
            </li>
            <li class="row-list tool" id="circle">
                <img src="icons/circle.svg" alt="">
                <span>Circle</span>
            </li>
            <li class="row-list tool" id="triangle">
                <img src="icons/triangle.svg" alt="">
                <span>Triangle</span>
            </li>
            <li class="row-list">
               <input type="checkbox" id="fill-color">
                <label>Fill color</label>
            </li>
        </ul>
    </div>
    <div class="row">
        <ul class="row-options">
            <label>Shapes</label>
            <li class="row-list tool active" id="brush">
                <img src="icons/brush.svg" alt="">
                <span>brush</span>
            </li>
            <li class="row-list tool" id="eraser">
                <img src="icons/eraser.svg" alt="">
                <span>Eraser</span>
            </li>
            <li class="row-list">
                <input type="range" value="0" max="40" id="sliderRange">
            </li>
        </ul>
    </div>
    <div class="row colors">
        <label class="title">Colors</label>
        <ul class="options">
          <li class="option"></li>
          <li class="option selected"></li>
          <li class="option"></li>
          <li class="option"></li>
          <li class="option">
            <input type="color" id="color-picker" value="#4A98F7" >
          </li>
        </ul>
      </div>
      <div class="row buttons">
        <button class="clear-canvas">Clear Canvas</button>
        <button class="save-img">Save As Image</button>
      </div>
</section>

    <section class="draw-board">
        <canvas id="canvas"></canvas>
      </section>`;
container.innerHTML = containerContent;
// window.addEventListener('resize', ()=> console.log(window.innerWidth))

const canvas = document.getElementById("canvas"),
  colo_picker = document.getElementById("color-picker"),
  fillColor = document.getElementById("fill-color"),
  brushSlider = document.getElementById("sliderRange"),
  clearCanvas = document.querySelector(".clear-canvas"),
  save_btn = document.querySelector(".save-img");
let toolBtn = document.querySelectorAll(".tool"),
  colorBtn = document.querySelectorAll(".option"),
  ctx = canvas.getContext("2d");

colorBtn = [...colorBtn];
toolBtn = [...toolBtn];

let prevMouseX,
  prevMouseY,
  snapshot,
  isDrawing = false,
  selectedColor = "#000",
  brushWidth = 8;
selectedTool = "brush";

window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  setBackground();
});

function setBackground() {
  canvaWidth = canvas.width;
  canvaHeight = canvas.height;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvaWidth, canvaHeight);
  ctx.fillStyle = selectedColor;
}

// colo picker btns
colorBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    eachBtn = document.querySelector(".selected");
    eachBtn.classList.remove("selected");
    btn.classList.add("selected");
    selectedColor = window.getComputedStyle(btn).background;
  });
});

// input color event onchange
colo_picker.addEventListener("change", (e) => {
  let listTag = colo_picker.parentElement;
  listTag.style.background = e.target.value;
  listTag.click();
});

// toolbtns function
toolBtn.forEach((tool) => {
  tool.addEventListener("click", (e) => {
    activeTool = document.querySelector(".active");
    activeTool.classList.remove("active");
    tool.classList.add("active");
    selectedTool = tool.id;
  });
});

// changing the width of the brush to be equal to slider value
brushSlider.addEventListener("change", () => (brushWidth = brushSlider.value));

// drawing a rectangle
function drawRectangle(e) {
  switch (fillColor) {
    case fillColor.checked:
      return ctx.fillRect(
        e.offsetX,
        e.offsetY,
        prevMouseX - e.offsetX,
        prevMouseY - e.offsetX
      );

    default:
      return ctx.strokeRect(
        e.offsetX,
        e.offsetY,
        prevMouseX - e.offsetX,
        prevMouseY - e.offsetX
      );
  }
}

// drawing a circle
const drawCircle = (e) => {
  ctx.beginPath();
  let radius = Math.sqrt(
    Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2)
  );
  ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
  fillColor.checked ? ctx.fill() : ctx.stroke();
};

// drawing acircle
const drawTriangle = (e) => {
  ctx.beginPath();
  ctx.moveTo(prevMouseX, prevMouseY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
  ctx.closePath();
  fillColor.checked ? ctx.fill() : ctx.stroke();
};

// intializer when mouse is down(mouse hits first on the canvas)
function initiateDrawing(e) {
  isDrawing = true;
  prevMouseX = e.offsetX;
  prevMouseY = e.offsetY;
  ctx.beginPath();
  ctx.lineWidth = brushWidth;
  ctx.strokeStyle = selectedColor;
  ctx.fillStyle = selectedColor;
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

// when the drawing is oongoing
const drawingProgress = (e) => {
  if (!isDrawing) return;
  ctx.putImageData(snapshot, 0, 0);
  if (selectedTool === "brush" || selectedTool === "eraser") {
    ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  } else if (selectedTool === "rectangle") {
    drawRectangle(e);
  } else if (selectedTool === "circle") {
    drawCircle(e);
  } else {
    drawTriangle(e);
  }
};

// clearing the canvas
clearCanvas.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setBackground();
});

// saving the drawn image
save_btn.addEventListener("click", () => {
  let randomAlpha = "abcdefghinxJSJSGGismdldldhkvxl";
  randomAlpha = randomAlpha.split("");
  randNum = Math.floor(Math.random() * 30);
  let linkUrl = randomAlpha[randNum];
  const linkTag = document.createElement("a");
  linkTag.download = `${linkUrl}${Date.now() / 10}${linkUrl}.jpg`;
  linkTag.href = canvas.toDataURL();
  linkTag.click();
});

// events for drwaing, when the mouse moves, dis doen, is up
canvas.addEventListener("mousedown", initiateDrawing);
canvas.addEventListener("mousemove", drawingProgress);
canvas.addEventListener("mouseup", () => (isDrawing = false));
