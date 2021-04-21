var canv = document.getElementById("sheet");
var ctx = canv.getContext("2d");
var form = document.getElementById("sheet-submit")
var img = document.getElementById("canvas-image")
var isMouseDown = false;

const btnSubmit = document.querySelector("#submitbutton");

canv.width = 500;
canv.height = 500;
ctx.fillStyle='white';
ctx.lineWidth = 10*2;

canv.addEventListener('mousedown', function(e){
    isMouseDown = true;
});


canv.addEventListener('mouseup', function(e){
    isMouseDown = false;
    ctx.beginPath();
});


canv.addEventListener('mousemove', function(e){
    if(isMouseDown){
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(e.offsetX, e.offsetY, 10, 0, Math.PI*2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    }
});

// Set up touch events for mobile, etc
canvas.addEventListener("touchstart", function (e) {
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
});
canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener("touchend", function (e) {
    var mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchmove", function (e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
});
canvas.dispatchEvent(mouseEvent);
}, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}

// Prevent scrolling when touching the canvas
document.body.addEventListener("touchstart", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);
  document.body.addEventListener("touchend", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);
  document.body.addEventListener("touchmove", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
 }, false);

function clearImage(){
    ctx.clearRect(0, 0, canv.width, canv.height);
}

form.onsubmit = (event) => {
    event.preventDefault();
    var image = canv.toDataURL("image/png");
    var output=image.replace(/^data:image\/(png|jpg);base64,/, "");
    img.value = output;
    form.submit();
}
