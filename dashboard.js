function drawRose() {
    let container = document.getElementById("rose");
    let oldCanvas = document.getElementById("compassrose");
    if (oldCanvas) {oldCanvas.parentNode.removeChild(oldCanvas)};
    let newCanvas = document.createElement('canvas');
    
    let width =  $("#dashboard").width();
    let height =  $("#dashboard").height();
    newCanvas.width = width;
    newCanvas.height = height;
    newCanvas.id = 'compassrose';
    container.appendChild(newCanvas); 
    let radius=Math.min(width, height)/2;
    console.log("Container has size "+newCanvas.clientWidth+"x"+newCanvas.clientHeight+", Radius is "+ radius);
    let context = newCanvas.getContext("2d");
    context.strokestyle = "black";
    context.beginPath();
  
    context.arc((width/ 2 ), (height/ 2 ), radius*0.90, 0, 2 * Math.PI);
    context.arc((width/ 2 ), (height/ 2 ), radius*0.80, 0, 2 * Math.PI);
    context.arc((width/ 2 ), (height/ 2 ), radius*0.70, 0, 2 * Math.PI);
    context.arc((width/ 2 ), (height/ 2 ), radius*0.60, 0, 2 * Math.PI);
    context.stroke();
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
    if (newOrientation != oldOrientation) {doOnOrientationChange();};
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
    oldOrientation = true;
    newOrientation = true;
    checkOrientationChange();
});