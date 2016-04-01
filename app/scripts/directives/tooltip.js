'use strict';

/**
 * @ngdoc directive
 * @name newappApp.directive:tooltip
 * @description
 * # tooltip
 */
angular.module('newappApp')
 .directive("myTooltipTemplate",['$compile', function($compile){
  var contentContainer;
  return {
    restrict: "A",
    scope: {
      myTooltipScope: "=",
      myTooltipClass:"@"
    },
    link: function(scope, element, attrs){
      var templateUrl = attrs.myTooltipTemplate;

      scope.hidden = true;
      var myWatch=scope.$watch(scope.myTooltipScope,function(){
           angular.element(document.querySelector( '.'+scope.myTooltipClass )).remove();
          updateTemplateScope();
    }); 
      
        updateTemplateScope();
      function updateTemplateScope(){
          var tooltipElement = angular.element("<div class='"+scope.myTooltipClass+"' ng-hide='hidden'>");
          tooltipElement.append("<div ng-include='\"" + templateUrl + "\"'></div>");

          element.parent().append(tooltipElement);
          element
            .on('mouseenter', function(){scope.hidden = false; scope.$digest();} )
            .on('mouseleave', function(){scope.hidden = true; scope.$digest();});

          var toolTipScope = scope.$new(true);
          angular.extend(toolTipScope, scope.myTooltipScope);
          $compile(tooltipElement.contents())(toolTipScope);
          $compile(tooltipElement)(scope);
      }
    }
  };
  
}]);
