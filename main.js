let leftKey = document.getElementById('left-key');
console.log(leftKey);
let rightKey = document.getElementById('right-key');
let mouseWheel = document.getElementById('mouse-wheel');
let scrollUp  = document.getElementById('scroll-up');
let scrollDown = document.getElementById('scroll-down');
let canvas = document.querySelector('canvas');


function handleClickdown_serge(e) {
    // в функции handleClickdown_sergeup мы добавили transitionDuration, т.к там нужен был плавные переход, а здесь плавный переход не нужен поэтому все значения в ноль.
    
    leftKey.style.transitionDuration =null;
    leftKey.style.transitionProperty =null;
    mouseWheel.style.transitionDuration =null;
    mouseWheel.style.transitionProperty =null;
    rightKey.style.transitionDuration =null;
    rightKey.style.transitionProperty =null;


    if (e.button == 0){//left
        leftKey.style.backgroundColor = "#20B2AA";
    }else if (e.button == 1){//whele-колесо
        mouseWheel.style.backgroundColor = "#FF69B4";
    }else if(e.button == 2){//right
        rightKey.style.backgroundColor = "#2E8B57";
    }
}

function handleClickdown_sergeup(e) {
    let arr = [leftKey, mouseWheel, rightKey];
    
        
    if (e.button == 0){//left
        leftKey.style.backgroundColor = "#00FFFF";
    }else if (e.button == 1){//whele
        mouseWheel.style.backgroundColor = "#FFC0CB";
    }else if(e.button == 2){//right
        rightKey.style.backgroundColor = "#98FB98";
    }

    setTimeout(
        // задача, чтобы цвет отжатых кнопок плавно затухали на белый, но т.к здесь добавляется свойство transitionProperty, то при нажатой кнопки этой же свойство остается и в функции handleClickdown_serge приходится все транзишины обнулять
        function() {
            //el.removeEventListener('mouseup', handleClickdown_sergeup);
            for(i=0; i<arr.length; i++){
                arr[i].style.backgroundColor = "#FFFFFF";
                arr[i].style.transitionProperty = 'background-color';
                arr[i].style.transitionDuration ='3s';
            }
            
        }
    , 500);

    
}

let el = canvas;//document.getElementById('blablabla');
el.addEventListener('mousedown', handleClickdown_serge);
el.addEventListener('mouseup', handleClickdown_sergeup);

    function zoom(event) {
        event.preventDefault();
        let arr = [scrollDown, scrollUp];
        //обнуляем transitionDuration, transitionProperty, т.к будет плавный переход от НАжатой кнопки, а нужен плавные переход цвета в белый от ОТжатой кнопки.
        scrollDown.style.transitionDuration = null;
        scrollDown.style.transitionProperty =null;

        scrollUp.style.transitionDuration = null;
        scrollUp.style.transitionProperty =null;
    
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

        setTimeout(
            function() {
                // цвет отжатой кнопки плавно переходит в белый. Задержка 1000, иначе затухание происходит одновременно с кодом, где присваивается цвет нажатой кнопки, т.е затухание происходит от цвета НАжатой кнопки, а должно быть от цвета ОТжатой.
                //el.removeEventListener('mouseup', handleClickdown_sergeup);
                for(i=0; i<arr.length; i++){
                    arr[i].style.backgroundColor = "#FFFFFF";
                    arr[i].style.transitionProperty = 'background-color';
                    arr[i].style.transitionDuration ='3s';
                }
                
            }
        , 1000);
    
    
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
  
  button.removeEventListener('click', openFullscreen);
  button.addEventListener('click', closeFullscreen);
}  




/* Просмотр в полноэкранном режиме */

/* Закрыть полный экран */
function closeFullscreen() {
 

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }

    
    
    button.removeEventListener('click', closeFullscreen);
    button.addEventListener('click', openFullscreen);
}

button.addEventListener('click', openFullscreen);




const pageWidth = document.documentElement.scrollWidth;
const pageHeight = document.documentElement.scrollHeight;
console.log(pageWidth, pageHeight);

const windowInnerWidth = document.documentElement.clientWidth;
const windowInnerHeight = document.documentElement.clientHeight;
console.log('width '+windowInnerWidth, 'height '+windowInnerHeight);








