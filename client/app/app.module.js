(function () {
  'use strict';
  angular.module('app', [
        'ngRoute'
      ,'ngAnimate'
      ,'ngAria'

      //libraries
      ,'ui.bootstrap'
      ,'easypiechart'
      ,'mgo-angular-wizard'
      ,'textAngular'
      ,'angular-loading-bar'
      ,'duScroll'

      //controller modules
      ,'app.layout'
      ,'app.localization'
      ,'app.ui'
      ,'app.ui.form'
      ,'app.localization'
      ,'app.table'
      ,'app.chart'
    ])
})();

