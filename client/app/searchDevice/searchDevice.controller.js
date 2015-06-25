/**
 * Created by Dilip on 6/2/2015.
 */
(function () {
    'use strict';
    angular.module('app.ui.form').controller('searchDeviceCtrl', [
        '$scope', '$location', '$rootScope', '$route', '$document','filterFilter','logger','WizardHandler', function($scope, $location, $rootScope, $route, $document,filterFilter,logger,WizardHandler) {

            //scope variable initialization
            $scope.unusualList = [];
            $scope.wizard = {
                symptom: '',
                inpError : false
            };


            //hardcoding diseases
            $scope.diseaseList = [{name : "Heart Failure", selected : "false"},
                {name : "COPD", selected : "false"},
                {name : "Atrial Fibrillation", selected : "false"},
                {name : "Diabetes", selected : "false"}];

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
            $scope.patientChar = ["visual impairment", "hearing impairment", "fine motor dexterity", "cognitive impairment", "caregiver", "neuropathy"];
            // hardcoding risk factors
            var rf = ["Weight", "BMI", "Pulse", "Blood Pressure", "Oxygen Saturation", "Activity"];
            $scope.riskFactors = convertArrToJson(rf);

            var rfAll = ["Weight", "BMI", "Pulse", "Blood Pressure", "Oxygen Saturation", "Exercise/Activity", "Forced Expiratory Volume", "Peak Expiratory Flow", "Ventilation-Perfusion Ratio","Tobacco Cessation", "Heart Rate","Heart Rhythm", "Blood Glucose","HbA1c"];


            // hardcoding device features
            var df = ["Cost", "Smartphone Connectivity", "BP", "ECG", "HR", "SpO2", "Resp. Rate", "Steps", "Distance", "Calories", "Position", "Sleep", "Glucose", "EEG", "GSR", "Weight", "Fat %", "BMI", "Hydration", "Temperature"];
            $scope.deviceFeatures = convertArrToJson(df);

            //hardcoding device categories
            $scope.deviceCategory = ["Body Composition Analyzer","Blood Pressure Monitor","Activity Tracker","Heart Rate Monitor","Pulse Oxymeter"];

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
            $scope.$watch('diseaseList|filter:{selected:true}', function (nv) {
                $scope.diseaseSelection = nv.map(function (item) {
                    return item.name;
                });
            }, true);
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
                    rf = ["Weight", "BMI", "Pulse", "Blood Pressure", "Oxygen Saturation", "Activity"];
                    $scope.riskFactors = convertArrToJson(rf);
                    $scope.otherRisks = convertArrToJson(_.difference(rfAll,rf));

                }
                if($scope.diseaseSelection.indexOf("COPD") != -1){
                    rf = ["Forced Expiratory Volume", "Peak Expiratory Flow", "Ventilation-Perfusion Ratio","Oxygen Saturation","Tobacco Cessation","Exercise/Activity"];
                    $scope.riskFactors = convertArrToJson(rf);
                    $scope.otherRisks = convertArrToJson(_.difference(rfAll,rf));

                }
                if($scope.diseaseSelection.indexOf("Atrial Fibrillation") != -1){
                    rf = ["Heart Rate","Heart Rhythm"];
                    $scope.riskFactors = convertArrToJson(rf);
                    $scope.otherRisks = convertArrToJson(_.difference(rfAll,rf));

                }
                if($scope.diseaseSelection.indexOf("Diabetes") != -1){
                    rf = ["Blood Glucose","Weight","Activity/Exercise","HbA1c"];
                    $scope.riskFactors = convertArrToJson(rf);
                    $scope.otherRisks = convertArrToJson(_.difference(rfAll,rf));

                }
            };

            // function to validate risk factor selection
            $scope.isValidateStep2 = function(){
                // $scope.riskSelection contains the selected risk factors

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
                        return logger.logSuccess("Thank You. Subscription has been made to the patient");
                    case 'warning':
                        return logger.logWarning("Warning!");
                    case 'error':
                        return logger.logError("Oh snap! Change a few things up and try submitting again.");
                }
            };

            return $scope.finishedWizard = function() {
                //find device call
                alert("Thank You. Subscription has been made to the patient");
            };
            }
    ]);
})();

