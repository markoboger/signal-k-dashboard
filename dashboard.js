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

function drawOuterRose(canvas, x, y, radius) {
    let context = canvas.getContext("2d");
    context.strokestyle = "black";
    context.beginPath();
    context.arc( x , y , radius, 0, 2 * Math.PI);
    context.stroke();
    context.translate(x,y);
    for(var i = 0; i < 360; i+=10) {
        var length = 5;
        if (i%30 ===0) { 
            length =10;
            context.fillText(i.toString(),(-4*(Math.ceil(i/100)+1)),-radius+length+2);
        }
        context.moveTo(0,radius);
        context.lineTo(0,radius+length);
        context.stroke();
        context.rotate(Math.PI/18);
    }
    context.rotate(Math.PI);
    context.translate(-x,-y);
    context.restore();
    context.save();
}

function drawInnerRose(canvas, x, y, radius) {
    let context = canvas.getContext("2d");
    context.strokestyle = "black";
    context.lineWidth = 1;
    context.font = '15px '+this.fontFamily;
    
    context.beginPath();
    context.arc( x , y , radius, 0, 2 * Math.PI);
    context.stroke();
    context.translate(x,y)
    for(var i = 0; i < 360; i+=10) {
        var length = 5;
        if (i%30 ===0) { 
            length =10;
            context.fillText(i.toString(),(-4*(Math.ceil(i/100)+1)),-radius-length-2);
        }
        context.moveTo(0,radius);
        context.lineTo(0,radius+length);
        context.stroke();
        context.rotate(Math.PI/18);
    }
    context.rotate(Math.PI);
    context.translate(-x,-y);
    context.restore();
    context.save();
}



function drawRose() {
    let width =  $("#dashboard").width();
    let height =  $("#dashboard").height();
    let boatroseCanvas = addOrResizeCanvas("rose", "boatrose", width, height);
    let compassroseCanvas = addOrResizeCanvas("rose", "compassrose", width, height);

    let radius=Math.min(width, height)/2;
    drawOuterRose(compassroseCanvas, width/2,height/2, radius*0.8);
    drawInnerRose(boatroseCanvas,width/2,height/2, radius*0.70);
    let context = boatroseCanvas.getContext("2d");
    context.drawImage(boatroseCanvas, 0, 0, width, height)
    context.drawImage(compassroseCanvas, 0, 0, width, height)
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

function doOnOrientationChange() {
    if(landscape()){
        swapoutIdSubstring("portrait","landscape");
    } else {
        swapoutIdSubstring("landscape","portrait");
    }
    drawRose();
}
let oldOrientation = true;
let newOrientation = true;

function checkOrientationChange() {
    newOrientation = landscape();
    if (newOrientation != oldOrientation) {
        doOnOrientationChange();
    } else {
        drawRose();
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
    drawRose();
    oldOrientation = true;
    newOrientation = true;
    checkOrientationChange();
});