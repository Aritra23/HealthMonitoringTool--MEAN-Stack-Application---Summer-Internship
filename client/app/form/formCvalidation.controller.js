(function () {
  'use strict';
  angular.module('app.ui.form').controller('wizardFormCtrl', [
    '$scope','filterFilter', function($scope,filterFilter) {

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
  ]).controller('formConstraintsCtrl', [
    '$scope', function($scope) {
      var original;
      $scope.form = {
        required: '',
        minlength: '',
        maxlength: '',
        length_rage: '',
        type_something: '',
        confirm_type: '',
        foo: '',
        email: '',
        url: '',
        num: '',
        minVal: '',
        maxVal: '',
        valRange: '',
        pattern: ''
      };
      original = angular.copy($scope.form);
      $scope.revert = function() {
        $scope.form = angular.copy(original);
        return $scope.form_constraints.$setPristine();
      };
      $scope.canRevert = function() {
        return !angular.equals($scope.form, original) || !$scope.form_constraints.$pristine;
      };
      return $scope.canSubmit = function() {
        return $scope.form_constraints.$valid && !angular.equals($scope.form, original);
      };
    }
  ]).controller('signinCtrl', [
    '$scope', function($scope) {
      var original;
      $scope.user = {
        email: '',
        password: ''
      };
      $scope.showInfoOnSubmit = false;
      original = angular.copy($scope.user);
      $scope.revert = function() {
        $scope.user = angular.copy(original);
        return $scope.form_signin.$setPristine();
      };
      $scope.canRevert = function() {
        return !angular.equals($scope.user, original) || !$scope.form_signin.$pristine;
      };
      $scope.canSubmit = function() {
        return $scope.form_signin.$valid && !angular.equals($scope.user, original);
      };
      return $scope.submitForm = function() {
        $scope.showInfoOnSubmit = true;
        return $scope.revert();
      };
    }
  ]).controller('signupCtrl', [
    '$scope', function($scope) {
      var original;
      $scope.user = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: ''
      };
      $scope.showInfoOnSubmit = false;
      original = angular.copy($scope.user);
      $scope.revert = function() {
        $scope.user = angular.copy(original);
        $scope.form_signup.$setPristine();
        return $scope.form_signup.confirmPassword.$setPristine();
      };
      $scope.canRevert = function() {
        return !angular.equals($scope.user, original) || !$scope.form_signup.$pristine;
      };
      $scope.canSubmit = function() {
        return $scope.form_signup.$valid && !angular.equals($scope.user, original);
      };
      return $scope.submitForm = function() {
        $scope.showInfoOnSubmit = true;
        return $scope.revert();
      };
    }
  ]).directive('validateEquals', [
    function() {
      return {
        require: 'ngModel',
        link: function(scope, ele, attrs, ngModelCtrl) {
          var validateEqual;
          validateEqual = function(value) {
            var valid;
            valid = value === scope.$eval(attrs.validateEquals);
            ngModelCtrl.$setValidity('equal', valid);
            return typeof valid === "function" ? valid({
              value: void 0
            }) : void 0;
          };
          ngModelCtrl.$parsers.push(validateEqual);
          ngModelCtrl.$formatters.push(validateEqual);
          return scope.$watch(attrs.validateEquals, function(newValue, oldValue) {
            if (newValue !== oldValue) {
              return ngModelCtrl.$setViewValue(ngModelCtrl.$ViewValue);
            }
          });
        }
      };
    }
  ]);

})();
