/**
 * Created by Dilip on 6/2/2015.
 */
(function () {

    //'use strict';
    angular.module('app.ui').factory('searchDeviceFactory', ['$http', function ($http) {
            var baseUrl = "http://localhost:9000/mongoapi";
            var dataCtrl = this;
            return {
                sayHello: function () {
                    return "Calling MongoDB";
                },
                getAllFeatures: function () {
                    $http({
                        url: baseUrl + '/getAllFeatures',
                        method: 'GET'
                    }).success(function (res) {
                        console.log('Connected to MongoDB', res);
                        return res;
                    })
                        .error(function () {
                            console.log("Could not connect to Mongo!!!");
                            return;
                        });

                },
                getAllDiseases :function(){
                    return $http({
                        url: baseUrl + '/getAllDiseases',
                        method : 'GET'
                    }).then(
                        function(payload) {
                            console.log("Response inside promise ::::",payload.data);
                            //console.log("Response:",payload.data.name);
                            return payload.data;
                        });
                }
            }
        }]
    )
        .controller('searchDeviceCtrl', [
            '$scope', '$location', '$rootScope', '$route', '$document', 'filterFilter', 'logger', 'WizardHandler', '$timeout', 'searchDeviceFactory', function ($scope, $location, $rootScope, $route, $document, filterFilter, logger, WizardHandler, $timeout, searchDeviceFactory) {


                //scope variable initialization
                $scope.unusualList = [];
                $scope.wizard = {
                    symptom: '',
                    inpError : false
                };
                $scope.diseaseList = [];

                //testing factory
                var getAllDiseases = function() {
                    searchDeviceFactory.getAllDiseases()
                        .then(function(data) {
                            $scope.test = data;


                        });
                };
                getAllDiseases();

                // watch the scope variables set from MongoDB call
                $scope.$watch('test',function(newValue, oldValue) {
                    console.log("Inside test watch New Value ::" + newValue + "Old Value :::" + oldValue);
                    if (newValue) {

                        //$scope.diseaseList.push(newValue);
                        for (var item in $scope.test) {
                            // $scope.diseaseList.push({name: $scope.diseaseList[item].name, selected:"false", imgsrc: ""});
                            //$scope.diseaseList = $scope.test.Object.name;
                            console.log($scope.test[item]);

                            $scope.diseaseList.push({name: $scope.test[item].name, selected: "false", imgsrc: ""});
                            for (var temp in $scope.diseaseList) {
                                $scope.diseaseList[temp].imgsrc = "../images/disease-images/" + $scope.diseaseList[temp].name.replaceAll(" ", "") + ".png";
                            }


                        }
                        console.log("DL:", $scope.diseaseList);
                        console.log("Value is set");
                    }
                },true);



                $scope.diseaseSelection = [];

                var getFeatures = function(){
                    searchDeviceFactory.getAllDiseases().then(function(data){
                        $scope.val =data;
                    });
                };

                getFeatures();


                $scope.$watch('val', function(newval, old)
                {
                    console.log("Inside test watch New Variable ::" + newval + "Old Value:" + old);
                    if(newval){
                        for(var itemid in $scope.val){
                            console.log($scope.val[itemid]);
                            $scope.diseaseSelection.push({name: $scope.val[itemid].name, keymetrics: $scope.val[itemid].keymetrics});


                        }
                        for(var tmp in $scope.diseaseSelection){
                            if($scope.diseaseSelection[tmp].name == "Heart Failure"){
                                $scope.riskFactors = $scope.diseaseSelection[tmp].keymetrics;
                            }
                            if($scope.diseaseSelection[tmp].name == "COPD"){
                                $scope.riskFactors = $scope.diseaseSelection[tmp].keymetrics;
                            }
                            if($scope.diseaseSelection[tmp].name == "Atrial Fibrillation"){
                                $scope.riskFactors = $scope.diseaseSelection[tmp].keymetrics;
                            }
                            if($scope.diseaseSelection[tmp].name == "Diabetes"){
                                $scope.riskFactors = $scope.diseaseSelection[tmp].keymetrics;
                            }
                        }
                    }

                },true);


                /*function getDiseases() {
                     searchDeviceFactory.getAllDiseases().then(function (responseData) {
                         $scope.diseaseList = responseData;
                         console.log("DL:", $scope.diseaseList);
                     });
                     for (var item in $scope.diseaseList) {
                         $scope.diseaseList.push({name: $scope.diseaseList[item].name, selected: "false", imgsrc: ""});
                     }
                 }*/


                /* function getDiseases(){
                 searchService.findAllDiseases().then(function(data){
                 $scope.diseaseList = data;
                 });
                 for(var item in $scope.diseaseList){
                 $scope.diseaseList.push({name: $scope.diseaseList[item].name, selected:"false", imgsrc: ""});
                 }
                 }
                 console.log("DL =", $scope.diseaseList);*/

                /* var mod = angular.module('deviceApp', []);

                 mod.factory('deviceFactory', function($http){
                 return{
                 getDeviceAsync: function(callback){
                 $http.get('http://localhost:9000/mongoapi/getAllDiseases/').success(callback);
                 }
                 };
                 });
                 */
                /*deviceApp.controller('searchDeviceCtrl', function($scope, deviceFactory){
                 deviceFactory.getDeviceAsync(function(results){
                 $scope.diseaseList = results.diseaseList;

                 console.log( "Disease List", $scope.diseaseList);
                 for(var item in $scope.diseaseList){
                 $scope.diseaseList.push({name: $scope.diseaseList[item].name, selected:"false", imgsrc: ""});
                 }
                 });
                 });
                 console.log("DL=", $scope.diseaseList);*/

                /* function getDiseases(){
                 dataFactory.getDiseases().success(function(data){
                 $scope.diseaseList = data;
                 console.log("DL:", $scope.diseaseList);
                 })
                 .error(function(error){
                 $scope.status = 'Unable to load Disease List' + error.message;
                 });
                 }
                 console.log("List of Diseases", $scope.diseaseList);*/

                /*
                 var myModule = myModule.factory('searchService', []);
                 myModule.factory('searchService', function($http){
                 return{
                 getAllDiseases: function(){
                 var url = "http://localhost:9000/mongoapi/getAllDiseases";
                 return $http.get(url);
                 }
                 }
                 })




                 searchService.getAllDiseases().success(function(diseaseList){
                 $scope.diseaseList = diseaseList;
                 });

                 console.log("List of Diseases", diseaseList);

                 $scope.diseaseList = [];

                 function getDiseases(){
                 dataFactory.getAllDiseases().then(function(data){
                 $scope.diseaseList = data;
                 },
                 function(err){
                 $scope.error = err;
                 });
                 };
                 getDiseases();
                 console.log("DL:", $scope.diseaseList);
                 */
                /* $scope.diseaseList = [];

                 $scope.addDisease = function(d){
                 $scope.diseaseList.push(DiseaseFactory(d));
                 console.log("List=", $scope.diseaseList);
                 }
                 console.log("List=", $scope.diseaseList);*/

                /*$scope.diseaseList ={};
                 DiseaseFactory.getDiseases().then(function(response) {
                 $scope.diseaseList = response.data.components;
                 console.log("DL:",$scope.diseaseList);
                 }, function(error){
                 console.error(error);
                 });*/

                //assign value to imgsrc
              /*  for (var item in $scope.diseaseList) {
                    $scope.diseaseList[item].imgsrc = "../images/disease-images/" + $scope.diseaseList[item].name.replaceAll(" ", "") + ".png";
                }*/

                //selection list
                //$scope.diseaseSelection = [];
                $scope.riskSelection = [];
                $scope.featureSelection = [];

                //other risk factors
                $scope.otherRisks = [];

                //helper function to convert array to JSON format for checkbox implementation
                var convertArrToJson = function(arr){
                    var newarr = [];
                    for(var val in arr){
                        newarr[val] = {name : arr[val], selected : "false"};
                    }
                    return newarr;
                };


                //hardcoding patient characteristics
                $scope.patientChar = ["Visual Impairment", "Hearing Impairment", "Fine Motor Dexterity", "Cognitive Impairment", "Caregiver", "Peripheral Neuropathy"];

                // hardcoding risk factors
                var rf = ["Weight", "BMI", "Resting Heart Rate", "Blood Pressure", "Oxygen Saturation", "Activity"];
                $scope.riskFactors = convertArrToJson(rf);

                var rfAll = ["Weight", "BMI", "Resting Heart Rate", "Blood Pressure", "Oxygen Saturation", "Activity", "Forced Expiratory Volume", "Peak Expiratory Flow", "Ventilation-Perfusion Ratio","Tobacco Cessation", "Heart Rate","Heart Rhythm", "Blood Glucose","HbA1c"];

                // hardcoding device features
                var df = ["Cost", "Smartphone Connectivity", "BP", "ECG", "HR", "SpO2", "Resp. Rate", "Steps", "Distance", "Calories", "Position", "Sleep", "Glucose", "EEG", "GSR", "Weight", "Fat %", "BMI", "Hydration", "Temperature"];
                $scope.deviceFeatures = convertArrToJson(df);

                //hardcoding device categories
                $scope.deviceCategory = [{name:"Body Composition Analyzer",imgsrc:""},
                    {name:"Blood Pressure Monitor",imgsrc:""},
                    {name:"Activity Tracker",imgsrc:""},
                    {name:"Heart Rate Monitor",imgsrc:""},
                    {name:"Oximeter",imgsrc:""}];

                //assigning image source to device category
                for(var item in $scope.deviceCategory){
                    $scope.deviceCategory[item].imgsrc = "../images/device-category/"+$scope.deviceCategory[item].name.replaceAll(" ","")+".png";
                }

                //filter selection
                $scope.selectedDiseases = function selectedDiseases() {
                    return filterFilter($scope.diseaseList, { selected: true });
                };
                $scope.selectedRisks = function selectedRisks(){
                    return filterFilter($scope.riskFactors, { selected: true });
                };
                $scope.selectedFeatures = function selectedFeatures(){
                    return filterFilter($scope.deviceFeatures, { selected: true });
                };

                //watchers
                /*$scope.$watch('diseaseList|filter:{selected:true}', function (nv) {
                 $scope.diseaseSelection = nv.map(function (item) {
                 return item.name;
                 });
                 }, true);*/
                $scope.$watch('riskFactors|filter:{selected:true}', function (nv) {
                    $scope.riskSelection = nv.map(function (item) {
                        return item.name;
                    });
                }, true);
                $scope.$watch('otherRisks|filter:{selected:true}', function (nv) {
                    $scope.riskSelection = nv.map(function (item) {
                        return item.name;
                    });
                }, true);
                $scope.$watch('deviceFeatures|filter:{selected:true}', function (nv) {
                    $scope.featureSelection = nv.map(function (item) {
                        return item.name;
                    });
                }, true);

                $scope.isValidateStep1 = function(val) {
                    $scope.diseaseSelection = val;

                    if($scope.diseaseSelection.length == 0){
                        //making default selection to be HF for multiselect
                        //$scope.diseaseSelection = ["Heart Failure"];
                        //making default selection to be HF for single select
                        $scope.diseaseSelection = "Heart Failure";
                    }

                    //pull from database risk factors for each disease using a service call or find an optimization
                    if($scope.diseaseSelection.indexOf("Heart Failure") != -1){
                        rf = ["Weight", "BMI", "Resting Heart Rate", "Blood Pressure", "Oxygen Saturation", "Activity"];
                    }
                    if($scope.diseaseSelection.indexOf("COPD") != -1){
                        rf = ["Forced Expiratory Volume", "Peak Expiratory Flow", "Ventilation-Perfusion Ratio","Oxygen Saturation","Tobacco Cessation","Exercise/Activity"];

                    }
                    if($scope.diseaseSelection.indexOf("Atrial Fibrillation") != -1){
                        rf = ["Heart Rate","Heart Rhythm"];
                    }
                    if($scope.diseaseSelection.indexOf("Diabetes") != -1){
                        rf = ["Blood Glucose","Weight","Activity/Exercise","HbA1c"];
                    }

                    $scope.riskFactors = convertArrToJson(rf);
                    $scope.otherRisks = convertArrToJson(_.difference(rfAll,rf));
                };

                // function to validate risk factor selection
                $scope.isValidateStep2 = function(){
                    // $scope.riskSelection contains the selected risk factors
                };

                // function to validate device category
                $scope.isValidateStep3 = function(devCat){
                    $scope.devCat = devCat;
                };

                $scope.addUnusualSymptom = function(){
                    if($scope.wizard.symptom != '' && !angular.isUndefined($scope.wizard.symptom)){
                        $scope.unusualList.push($scope.wizard.symptom);
                        $scope.wizard.symptom = '';
                        $scope.wizard.inpError = false;
                    }
                    else{
                        $scope.wizard.inpError = true;
                    }
                };

                $scope.notify = function(type) {

                    switch (type) {
                        case 'success':
                            $timeout(function(){
                                $location.path("/");

                                // reset image paths on finish
                                for(var item in $scope.deviceCategory){
                                    $scope.deviceCategory[item].imgsrc = "../images/device-category/"+$scope.deviceCategory[item].name.replaceAll(" ","")+".png";
                                }
                            },2000);
                            return logger.logSuccess("Thank You. Your device recommendations have been sent to the patient");
                        case 'warning':
                            return logger.logWarning("Warning!");
                        case 'error':
                            return logger.logError("Oh snap! Change a few things up and try submitting again.");
                    }
                };

                $scope.addDevice = function(devCat,devSrc){
                    for(var val in $scope.deviceCategory){
                        if(devCat == $scope.deviceCategory[val].name){
                            $scope.deviceCategory[val].imgsrc = devSrc;
                        }
                    }
                }

                return $scope.finishedWizard = function() {
                    //find device call
                    alert("Thank You. Subscription has been made to the patient");
                };
            }
        ]);

    //angular.module('app.ui.form').factory("DiseaseFactory", function($scope, DiseaseFactory) {
    /* var disease = function(diseaselist){
     this.initialize = function(){
     var url = "http://localhost:9000/mongoapi/getAllDiseases/";
     console.log(url);
     var diseaseData = $http.jsonp(url);
     var self = this;
     diseaseData.then(function(response){
     angular.extend(self,response.data);
     });
     };
     this.initialize();
     };
     return (disease);
     });*/

    /*var urlBase = 'http://localhost:9000/';

     var dataFactory = {};

     dataFactory.getDiseases = function () {
     return $http.get(urlBase + 'mongoapi/getAllDiseases');
     };
     return dataFactory;
     });*/


    /*angular.module('app.ui.form').factory('DiseaseFactory', function($q, $http){
     return{
     getDiseases:function(){
     var deferred = $q.defer(),
     httpPromise = $http.get('http://localhost:9000/mongoapi/getAllDiseases/');

     httpPromise.then(function(response) {
     deferred.resolve(response);
     }, function(error){
     console.error(error);
     });
     return deferred.promise;

     }
     };
     });*/

})();

