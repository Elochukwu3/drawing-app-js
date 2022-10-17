
const canvas =  document.getElementById("canvas");
let colorBtn = document.querySelectorAll('.option');
colo_picker = document.getElementById('color-picker');
fillColor = document.getElementById('fill-color');
toolBtn = document.querySelectorAll('.tool');
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

    canvaWidth = canvas.width;
    canvaHeight = canvas.height;

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvaWidth, canvaHeight );
    ctx.fillStyle = selectedColor;
})

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

function drawRectangle(e) {
if (!fillColor.checked) {
    return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetX)
}else{
    return ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetX)
}    
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
    if (!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0)
    switch (selectedTool) {
        case "rectangle":
            return{
                drawRectangle(e)
            };
        case "cicle"
    
        default:
            break;
    }
      
}

window.addEventListener("mousedown", initiateDrawing)
window.addEventListener("mouseup", drawingProgress)
window.addEventListener("mousemove", ()=> !isDrawing)