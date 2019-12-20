
function addOrResizeCanvas(containerId, canvasId, newWidth, newHeight) {
    let container = document.getElementById(containerId);
    let oldCanvas = document.getElementById(canvasId);
    if (oldCanvas) {oldCanvas.parentNode.removeChild(oldCanvas)};
    let newCanvas = document.createElement('canvas');
    newCanvas.width = newWidth;
    newCanvas.height = newHeight;
    newCanvas.id = canvasId;
    container.appendChild(newCanvas); 
    return newCanvas;
}

function fontsizeForRadius(radius) { return radius/20; }
function digits(number) { if (number ==0 ) {return 1} else {return (Math.floor(Math.log10(number))+1); }}
function textplacing(radius, length, fontsize, direction) { 
    if (direction == 1)  return -radius-(length+fontsize /8)*direction
    else if (direction == -1) return -radius-(length+fontsize/2)*direction
}

function drawCircularScale(canvas, x, y, radius, direction, angle) {
    let context = canvas.getContext("2d");
    context.strokestyle = "black";
    let fontsize = fontsizeForRadius(radius);
    context.font =  (fontsize).toString +'px '+this.fontFamily;
    context.translate(x,y);
    context.beginPath();
    context.arc( 0 , 0 , radius, 0, 2 * Math.PI);
    context.stroke();
    for(var i = 0; i < 360; i+=10) {
        var length = fontsize/4;
        if (i%90 == 0) {
            context.font =  (fontsize*2).toString +'px '+this.fontFamily;
        } else {
            context.font =  (fontsize).toString +'px '+this.fontFamily;
        }
        if (i%30 == 0) { 
            length =length*2;
            context.fillText(i.toString(),((-fontsize/6)*digits(i)),textplacing(radius, length, fontsize, direction));
        }
        context.moveTo(0,-radius);
        context.lineTo(0,-radius-(length)*direction);
        context.stroke();
        context.rotate(Math.PI/18);
    }
    context.rotate(angle);
    context.translate(-x,-y);
}

function drawRose(innerAngle, outerAngle) {
    let width =  $("#dashboard").width();
    let height =  $("#dashboard").height();
    let boatroseCanvas = addOrResizeCanvas("rose", "boatrose", width, height);
    let compassroseCanvas = addOrResizeCanvas("rose", "compassrose", width, height);

    let radius=Math.min(width, height)/2;
    drawCircularScale(compassroseCanvas, width/2,height/2, radius*0.8, -1, outerAngle);
    drawCircularScale(boatroseCanvas, width/2,height/2, radius*0.7, 1, innerAngle);
    let context = boatroseCanvas.getContext("2d");
    context.drawImage(compassroseCanvas, 0, 0, width, height);
}

function portrait() { return $("#dashboard").width() <= $("#dashboard").height()}
function landscape() { return !(portrait()) } 

function swapoutIdSubstring(oldStr, newStr) {
    var changeset = document.querySelectorAll("[id*="+oldStr+"]");
        for (i=0; i < changeset.length; i++) {
            oldId =changeset[i].id;
            newId = oldId.replace(oldStr, newStr);
            changeset[i].id=newId;
        }  
}

let hdg = Math.PI;
function degToRad(degrees) { return degrees * (Math.PI/180); }

function doOnOrientationChange() {
    if(landscape()){
        swapoutIdSubstring("portrait","landscape");
    } else {
        swapoutIdSubstring("landscape","portrait");
    }
    drawRose(0,hdg);
}
let oldOrientation = true;
let newOrientation = true;

function checkOrientationChange() {
    newOrientation = landscape();
    if (newOrientation != oldOrientation) {
        doOnOrientationChange();
    } else {
        drawRose(0, hdg);
    }
    oldOrientation=newOrientation;
}

Vue.component('data-box', {
    props:['abbreviation', 'aggregate','description','icon', 'unit', 'color'],
    template: `
        <div class="data-box-container">
            <div class="data-box-abbreviation"> 
                {{abbreviation}} 
            </div> 
            <div class="data-box-aggregate">
                {{aggregate}}
            </div>
            <div class="data-box-icon">
                {{icon}} 
            </div>
            <div class="data-box-content"> <slot></slot>
            </div>
            <div class="data-box-description">
                {{description}}
            </div>
            <div class="data-box-unit">
                {{unit}}
            </div>
        </div>`
    })


    var dashboard = new Vue({
        el:"#dashboard",
        data:{
            lat:'50° 34,56',
            lon:'009° 56,89',
            time:"12:36:56",
            countdown:"00:45:20",
            rpm:"2700 RPM",
            log:"12,345 nm",
            heading:'360',
            depth:'18,5',
            stw:'12,34',
            sog:'8,90',
            hdg:'240',
            aws:'15,89',
            tws:'10,40',
            vmg:'3,40',
            target:'358',
            perf:'96,7',
            temp:'21,3',
            water_temp:'19,0',
            fuel:'89',
            fuel2:'0',
            bat:'98',
            bat2:'100',
            stw_avg:'7,89',
            sog_avg:'8,76',
            tws_avg:'11,90',
            aws_avg:'10,99',
            stw_max:'7,89',
            sog_max:'8,76',
            tws_max:'11,90',
            aws_max:'10,99',
            vmg_avg:'3,78',
            vmg_max:'3,65',
        }
    })
    
$('document').ready(function(){
    window.addEventListener('orientationchange', doOnOrientationChange);
    window.addEventListener('resize', checkOrientationChange);
    drawRose(0, hdg);
    oldOrientation = true;
    newOrientation = true;
    checkOrientationChange();
});