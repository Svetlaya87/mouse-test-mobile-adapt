let leftKey = document.getElementById('left-key');
console.log(leftKey);
let rightKey = document.getElementById('right-key');
let mouseWheel = document.getElementById('mouse-wheel');
let scrollUp  = document.getElementById('scroll-up');
let scrollDown = document.getElementById('scroll-down');
let canvas = document.querySelector('canvas');


function handleClickdown_serge(e) {
    
   
    if (e.button == 0){//left
        leftKey.style.backgroundColor = "#20B2AA";
    }else if (e.button == 1){//whele
        mouseWheel.style.backgroundColor = "#FF69B4";
    }else if(e.button == 2){//right
        rightKey.style.backgroundColor = "#2E8B57";
    }
}
function handleClickdown_sergeup(e) {
    
   
    if (e.button == 0){//left
        leftKey.style.backgroundColor = "#00FFFF";
    }else if (e.button == 1){//whele
        mouseWheel.style.backgroundColor = "#FFC0CB";
    }else if(e.button == 2){//right
        rightKey.style.backgroundColor = "#98FB98";
    }
}

let el = canvas;//document.getElementById('blablabla');
el.addEventListener('mousedown', handleClickdown_serge);
el.addEventListener('mouseup', handleClickdown_sergeup);

    function zoom(event) {
        event.preventDefault();
    
        if(event.deltaY>0){
            scrollDown.style.backgroundColor = '#556B2F';
            setTimeout(
                function() {scrollDown.style.backgroundColor = '#6B8E23';}
                , 500);
        }else{
            scrollUp.style.backgroundColor = '#008080';
            setTimeout(
                function() {scrollUp.style.backgroundColor = '#20B2AA';}
                , 500);
        }
    
    }

let scale = 1;

el.addEventListener("wheel", zoom, { passive: false });


/*CANVAS*/


canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
let ctx = canvas.getContext('2d');
ctx.strokeStyle ='red';
ctx.lineWidth = 1;

let color = document.querySelectorAll('div#colors > div');
console.log(color[0].onclick);

color[0].addEventListener('click', function() {
    color[0].style.border = '3px solid #CD5C5C';//закрашиваем др цветом, чтобы было понятно, что кнопка была нажата
    color[1].style.border = '1px solid  grey';
    ctx.strokeStyle ='red';
    ctx.lineWidth = 1;
});


color[1].addEventListener('click', function() {
    color[0].style.border = '0px solid #CD5C5C';
    color[1].style.border = '3px solid #CD5C5C';
    ctx.strokeStyle ='white';
    ctx.lineWidth = 100;
});




let isDraw = false;

canvas.onmousemove = function (e) {
    if(!isDraw) return;
    let x = e.offsetX;
    let y = e.offsetY;
    let oldX = x - e.movementX;
    let oldY = y - e.movementY;

    ctx.beginPath();
    ctx.moveTo(oldX, oldY);
    ctx.lineTo(x, y);
    ctx.stroke();

    
}

canvas.onmousedown = function() {
    isDraw = true;
}

canvas.onmouseup = function() {
    isDraw = false;
}

canvas.onmouseleave = function() {
    isDraw = false;
}
    

/* Полноэкранный режим*/

let elem = document.documentElement;
let button = document.getElementById('screen');

/* Просмотр в полноэкранном режиме */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

button.addEventListener('click', openFullscreen);
const pageWidth = document.documentElement.scrollWidth;
const pageHeight = document.documentElement.scrollHeight;
console.log(pageWidth, pageHeight);

const windowInnerWidth = document.documentElement.clientWidth;
const windowInnerHeight = document.documentElement.clientHeight;
console.log('width '+windowInnerWidth, 'height '+windowInnerHeight);








