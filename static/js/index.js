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


canv.addEventListener("touchstart", handleStart, false);
canv.addEventListener("touchend", handleEnd, false);
canv.addEventListener("touchcancel", handleCancel, false);
canv.addEventListener("touchmove", handleMove, false);

function handleStart(evt) {
    evt.preventDefault();
    console.log("touchstart.");
    var el = document.getElementById("canvas");
    var ctx = el.getContext("2d");
    var touches = evt.changedTouches;
  
    for (var i = 0; i < touches.length; i++) {
      console.log("touchstart:" + i + "...");
      ongoingTouches.push(copyTouch(touches[i]));
      var color = colorForTouch(touches[i]);
      ctx.beginPath();
      ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
      ctx.fillStyle = color;
      ctx.fill();
      console.log("touchstart:" + i + ".");
    }
  }
  

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
