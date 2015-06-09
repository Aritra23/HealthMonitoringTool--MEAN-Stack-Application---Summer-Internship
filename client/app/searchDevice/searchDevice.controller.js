/**
 * Created by Dilip on 6/2/2015.
 */
(function () {
    'use strict';
    angular.module('app.ui.form').controller('searchDeviceCtrl', [
        '$scope', '$location', '$rootScope', '$route', '$document','filterFilter', function($scope, $location, $rootScope, $route, $document,filterFilter) {

                //scope variable initialization
                $scope.unusualList = [];
                $scope.wizard = {
                    symptom: '',
                    inpError : false,
                };

                //hardcoding diseases
                $scope.diseaseList = [{name : "Heart Failure", selected : "false"},
                    {name : "COPD", selected : "false"},
                    {name : "Atrial Fibrillation", selected : "false"},
                    {name : "Diabetes", selected : "false"}];
                //selected diseases
                $scope.selection = [];

                // hardcoding risk factors
                $scope.riskFactors = ["Weight Loss", "BMI", "LDL Cholesterol", "Diastolic Blood Pressure", "Haemoglobin A1c", "Lack of Physical Activity", "Smoking cessation", "Blood Glucose Fluctuation", "Obesity", "Behavior patterns", "Poor Diet Patterns", "Total Cholesterol", "HDL Cholesterol", "High Triglycerides", "Framingham Risk Score", "Age"];

                // hardcoding device features
                $scope.deviceFeatures = ["Cost", "Smartphone Connectivity", "BP", "ECG", "HR", "SpO2", "Resp. Rate", "Steps", "Distance", "Calories", "Position", "Sleep", "Glucose", "EEG", "GSR", "Weight", "Fat %", "BMI", "Hydration", "Temperature"];

                $scope.selectedFactors = function selectedFactors() {
                    return filterFilter($scope.diseaseList, { selected: true });
                };

                //watch for changes in disease selection
                $scope.$watch('diseaseList|filter:{selected:true}', function (nv) {
                    $scope.selection = nv.map(function (item) {
                        return item.name;
                    });
                }, true);

                $scope.isValidateStep1 = function() {
                    //pull risk factors for each disease using a service call or find an optimization
                    if($scope.selection.indexOf("Heart Failure") != -1){
                        $scope.riskFactors = ["Weight", "BMI", "Pulse", "Blood Pressure", "Oxygen Saturation", "Activity"];
                    }
                    else{
                        $scope.riskFactors = ["Weight Loss", "BMI", "LDL Cholesterol", "Diastolic Blood Pressure", "Haemoglobin A1c", "Lack of Physical Activity", "Smoking cessation", "Blood Glucose Fluctuation", "Obesity", "Behavior patterns", "Poor Diet Patterns", "Total Cholesterol", "HDL Cholesterol", "High Triglycerides", "Framingham Risk Score", "Age"];
                    }
                };

                $scope.search = function(){
                    alert("Searching...");
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

                return $scope.finishedWizard = function() {
                    //find device call
                };

            }
    ]);
})();

