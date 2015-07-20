/**
 * Created by dselaman on 7/14/15.
 */
(function () {
    'use strict';
    angular.module('app.ui').factory('searchDeviceFactory', ['$http',function ($http) {
            var baseUrl = "http://localhost:9000/mongoapi";
            return {
                sayHello: function () {
                    return "Calling MongoDB";
                },
                getAllFeatures : function(){
                    $http({
                        url: baseUrl + '/getAllFeatures',
                        method : 'GET'
                    }).success(function(res){
                        console.log('Connected to MongoDB', res);
                        return res;
                    })
                        .error(function(){
                            console.log("Could not connect to Mongo!!!");
                            return;
                        });
                }
            }
        }]
    );
});
