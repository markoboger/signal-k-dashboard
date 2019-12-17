function doOnOrientationChange() {
    switch(window.orientation) {  
      case -90: case 90:
        document.getElementById('rimbox1-1-portrait').id="rimbox1-1"
        document.getElementById('rimbox1-2-portrait').id="rimbox1-2"
        document.getElementById('rimbox1-3-portrait').id="rimbox1-3"
        document.getElementById('rimbox1-4-portrait').id="rimbox1-4"
        document.getElementById('rimbox2-1-portrait').id="rimbox2-1"
        document.getElementById('rimbox2-2-portrait').id="rimbox2-2"
        document.getElementById('rimbox2-3-portrait').id="rimbox2-3"
        document.getElementById('rimbox2-4-portrait').id="rimbox2-4"
        document.getElementById('rimbox3-1-portrait').id="rimbox3-1"
        document.getElementById('rimbox3-2-portrait').id="rimbox3-2"
        document.getElementById('rimbox3-3-portrait').id="rimbox3-3"
        document.getElementById('rimbox3-4-portrait').id="rimbox3-4"
        document.getElementById('rimbox4-1-portrait').id="rimbox4-1"
        document.getElementById('rimbox4-2-portrait').id="rimbox4-2"
        document.getElementById('rimbox4-3-portrait').id="rimbox4-3"
        document.getElementById('rimbox4-4-portrait').id="rimbox4-4"
        document.getElementById('centerbox5-portrait').id="centerbox5"
        document.getElementById('centerbox6-portrait').id="centerbox6"
        break; 
      default:
        document.getElementById('rimbox1-1').id="rimbox1-1-portrait"
        document.getElementById('rimbox1-2').id="rimbox1-2-portrait"
        document.getElementById('rimbox1-3').id="rimbox1-3-portrait"
        document.getElementById('rimbox1-4').id="rimbox1-4-portrait"
        document.getElementById('rimbox2-1').id="rimbox2-1-portrait"
        document.getElementById('rimbox2-2').id="rimbox2-2-portrait"
        document.getElementById('rimbox2-3').id="rimbox2-3-portrait"
        document.getElementById('rimbox2-4').id="rimbox2-4-portrait"
        document.getElementById('rimbox3-1').id="rimbox3-1-portrait"
        document.getElementById('rimbox3-2').id="rimbox3-2-portrait"
        document.getElementById('rimbox3-3').id="rimbox3-3-portrait"
        document.getElementById('rimbox3-4').id="rimbox3-4-portrait"
        document.getElementById('rimbox4-1').id="rimbox4-1-portrait"
        document.getElementById('rimbox4-2').id="rimbox4-2-portrait"
        document.getElementById('rimbox4-3').id="rimbox4-3-portrait"
        document.getElementById('rimbox4-4').id="rimbox4-4-portrait"
        document.getElementById('centerbox5').id="centerbox5-portrait"
        document.getElementById('centerbox6').id="centerbox6-portrait"
        break; 
    }
}
  
window.addEventListener('orientationchange', doOnOrientationChange);

doOnOrientationChange;

Vue.component('data-box', {
    data: function () {
      return {
        data: {
            content:'12.34'
        }
      }
    },
    computed:{
            portrait: function() {
                if(window.innerHeight > window.innerWidth){
                    return true;
                } else {
                    return false;
                }
            },
            landscape:function() {
                if(window.innerHeight >= window.innerWidth){
                    return false;
                } else {
                    return true;
                }
            },
    },
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