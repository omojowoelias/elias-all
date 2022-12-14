let isMouseDown = false;
const canvas = document.querySelector("#canvas");
let hiddenCanvas = document.getElementById('hidden');

const ctx = canvas.getContext("2d");


canvas.addEventListener("mousedown", () => {
    mousedown(canvas, event);
});
canvas.addEventListener("mousemove", () => {
    mousemove(canvas, event);
});
canvas.addEventListener("mouseup", mouseup);
// add event listener for mouseleave

// GET MOUSE POSITION
function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
    };
}

// ON MOUSE DOWN
function mousedown(canvas, evt) {
    const mousePos = getMousePos(canvas, evt);
    isMouseDown = true;
    var currentPosition = getMousePos(canvas, evt);
    ctx.moveTo(currentPosition.x, currentPosition.y);
    ctx.beginPath();
    ctx.lineCap = "round";
}

// ON MOUSE MOVE
function mousemove(canvas, evt) {
    if (isMouseDown) {
        const currentPosition = getMousePos(canvas, evt);
        ctx.lineTo(currentPosition.x, currentPosition.y);
        ctx.stroke();
    }
}

//ON MOUSE UP
function mouseup() {
    isMouseDown = false;
    let data = canvas.toDataURL();
    hiddenCanvas.value = data;
}
