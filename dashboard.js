var dashboard = new Vue({
    el:"#dashboard",
    data:{
        lat:'50° 34,56',
        lon:'009° 56,89',
        time:"12:36:56",
        countdown:"00:45:20",
        course:'360',
        stw:'12,34',
        sog:'8,90',
        aws:'15,89',
        tws:'10,40',
        item1:'12,34',
        item2:'2',
        item3:'3',
        item4:'4'
    }
})

Vue.component('data-box', {
    data: function () {
      return {
        data: 0
      }
    },
    props:['abreviation','description','icon'],
    template: '<div>{{abreviation}} {{icon}} <br> <div v-html="content"></div><br>{{description}}</div>'
  })