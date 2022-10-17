
const canvas =  document.getElementById("canvas"),

colo_picker = document.getElementById('color-picker'),
fillColor = document.getElementById('fill-color'),
brushSlider = document.getElementById('sliderRange'),
clearCanvas = document.querySelector('.clear-canvas'),
save_btn = document.querySelector('.save-img');
let toolBtn = document.querySelectorAll('.tool'),
colorBtn = document.querySelectorAll('.option'),
ctx = canvas.getContext("2d");

colorBtn = [...colorBtn];
toolBtn =[...toolBtn]

let prevMouseX, prevMouseY, snapshot,
isDrawing = false,
selectedColor = "#000",
brushWidth = 7;
selectedTool = "brush",

window.addEventListener("load", ()=>{
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setBackground()
})
function setBackground() {
    canvaWidth = canvas.width;
    canvaHeight = canvas.height;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvaWidth, canvaHeight );
    ctx.fillStyle = selectedColor;  
}

colorBtn.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        eachBtn = document.querySelector('.selected')
        eachBtn.classList.remove('selected')
        btn.classList.add('selected');
        selectedColor = window.getComputedStyle(btn).background;
        console.log(selectedColor);
    })
})
colo_picker.addEventListener('change', (e)=>{
   let listTag = colo_picker.parentElement;
   listTag.style.background = e.target.value;
   listTag.click();
})
// toolbtns function
toolBtn.forEach(tool=>{
    tool.addEventListener('click', (e)=>{
        activeTool = document.querySelector('.active');
        activeTool.classList.remove('active');
        tool.classList.add('active')
        selectedTool = tool.id;
    })
})
brushSlider.addEventListener('change', ()=> brushWidth = brushSlider.value)
console.log(brushWidth);

function drawRectangle(e) {
if (!fillColor.checked) {
    return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetX)
}else{
    return ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetX)
}   
}

const drawCircle = (e) => {
    ctx.beginPath();
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    fillColor.checked ? ctx.fill() : ctx.stroke(); 
}

const drawTriangle = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY); 
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); 
    ctx.closePath();
    fillColor.checked ? ctx.fill() : ctx.stroke();
} 

function initiateDrawing(e) {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth; 
    ctx.strokeStyle = selectedColor; 
    ctx.fillStyle = selectedColor; 
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const drawingProgress = (e)=>{
    if(selectedTool === "brush" || selectedTool === "eraser") {
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    } else if(selectedTool === "rectangle"){
        drawRectangle(e);
    } else if(selectedTool === "circle"){
        drawCircle(e);
    } else {
        drawTriangle(e);
    }
      
}
clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clearing whole canvas
    setBackground();
});

save_btn.addEventListener("click", () => {
    const link = document.createElement("a"); // creating <a> element
    link.download = `${Date.now()}.jpg`; // passing current date as link download value
    link.href = canvas.toDataURL(); // passing canvasData as link href value
    link.click(); // clicking link to download image
});

canvas.addEventListener("mousedown", initiateDrawing)
canvas.addEventListener("mousemove", drawingProgress)
canvas.addEventListener("mouseup", () => isDrawing = false);