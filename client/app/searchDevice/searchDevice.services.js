/*
 * Created by aklahiri on 7/13/15.
 */
//
/*   var mod = angular.module('searchDeviceCtrl',[]);
 mod.factory('searchService',['$http','$q',function($http,$q) {
 function findAllDiseases() {
 var deferred = $q.defer();
 $http.get('http://localhost:9000/mongoapi/getAllDiseases/')
 .success(function (data){


 deferred.resolve(data.query.results.channel);
 })
 .error(function (err) {
 console.log('Error getting Diseases List');
 deferred.reject(err);
 });
 return deferred.promise;
 }

 return {
 findAllDiseases: findAllDiseases
 };
 }]);
 */
/*var deviceApp = angular.module('deviceApp', []);

 deviceApp.factory('deviceFactory', function($http){
 return{
 getDeviceAsync: function(callback){
 $http.get('http://localhost:9000/mongoapi/getAllDiseases/').success(callback);
 }
 };
 });


 */

/*angular.module('app.ui.form').factory('dataFactory', ['$http', function($http){

 var urlBase = 'http://localhost:9000/';

 var dataFactory ={};

 dataFactory.getDiseases = function(){
 return $http.get(urlBase + 'mongoapi/getAllDiseases');
 };
 return dataFactory;

 }]);
 */
/*angular.module('disease',[]).factory('dataFactory',function($http,$q) {
 return {
 apiPath: 'http://localhost:9000/mongoapi/getAllDiseases',
 getAllDiseases: function () {
 var deferred = $q.defer();
 $http.get(this.apiPath).success(function (data) {
 deferred.resolve(data);
 }).error(function () {
 deferred.reject("Error in getting Disease List");
 });
 return deferred.promise;
 }
 }
 });
 */
/*var myModule = myModule.factory('searchService', []);
 myModule.factory('searchService', function($http){
 return{
 getAllDiseases: function(){
 var url = "http://localhost:9000/mongoapi/getAllDiseases";
 return $http.get(url);
 }
 }
 })*/
/*app.factory("DiseaseFactory", function($http){
 var DiseaseFactory = function(diseaselist){
 this.initialize = function(){
 var url = "http://localhost:9000/mongoapi/getAllDiseases/";
 var diseaseData = $http.jsonp(url);
 var self = this;
 diseaseData.then(function(response){
 angular.extend(self,response.data);
 });
 };
 this.initialize();
 };
 return (DiseaseFactory);
 });
 */
/*angular.module('app.ui.form').factory('DiseaseFactory', function($q, $http){
 return{
 getDiseases:function(){
 var deferred = $q.defer(),
 httpPromise = $http.get('/mongoapi/getAllDiseases');

 httpPromise.then(function(response) {
 deferred.resolve(response);
 }, function(error){
 console.error(error);
 });
 return deferred.promise;

 }
 };
 });

 angular.module('app.ui.form').factory('mongoFactory', function($q,$http){
 return {
 getMongoStuff: function() {
 var deferred = $q.defer(),
 httpPromise = $http.get('/mongoapi/getAllDiseases');

 httpPromise.success(function(components){
 deferred.resolve(components);
 })
 .error(function(error){
 console.error('Error:' + error);
 });
 return deferred.promise;
 }
 };
 */
/*(function () {
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

success(function(data) {
    dataCtrl.data = data;
    console.log("Connection successful", dataCtrl.data);
    return dataCtrl.data;
});
});*/
