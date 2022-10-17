
const canvas =  document.getElementById("canvas");
let colorBtn = document.querySelectorAll('.option');
colo_picker = document.getElementById('color-picker');
toolBtn = document.querySelectorAll('.tool');
ctx = canvas.getContext("2d");
colorBtn = [...colorBtn];
toolBtn =[...toolBtn]

selectedColor = "#000",
brushWidth = 7;
selectedTool = "brush"
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
    tool.addEventListener('click', ()=>{
        activeTool = document.querySelector('.active');
        activeTool.classList.remove('active');
        tool.classList.add('active')
        selectedTool = tool.id;
        
    })
})