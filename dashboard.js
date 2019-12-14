var dashboard = new Vue({
    el:"#dashboard",
    data:{
        time:"12:36:56",
        countdown:"00:45:20",
        item1:'12,34',
        item2:'2',
        item3:'3',
        item4:'4'
    }
})

Vue.component('sk-data-box', {
    data: function () {
      return {
        data: 0
      }
    },
    template: '<div>{{data}}</div>'
  })