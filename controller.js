var stateMap = angular.module('interactiveMap', []);

stateMap.controller('interactiveMapCntrl', interactiveMapCntrl);

stateMap.directive('clickState', function(){
	return{
		link: function($scope, element){
			element.bind('click', function(){
				var newColor = getNewColor($scope.state);
				$scope.state.stateColor = newColor;
				var stateElement = element[0].querySelector('path');
				stateElement.setAttribute('class', newColor);
			});
		}
	}
})


function interactiveMapCntrl($scope){
	$scope.states = states;
}

function getNewColor(state){
	console.log(state);
	if(state.stateColor == 'red'){
		return "blue";
	}else if(state.stateColor == 'blue'){
		return "open";
	}else if(state.stateColor == 'open'){
		return "red";
	}
	//if state color = red, then change to blue
	//if state color = blue, then change to open
	//if state color = open, then change to red
}