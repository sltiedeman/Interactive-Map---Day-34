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
				$scope.redStates = redStates;
                $scope.blueStates = blueStates;
                $scope.openStates = openStates;
                
			});
		}
	}
})


function interactiveMapCntrl($scope){
	$scope.states = states;
	$scope.redStates = redStates;
	$scope.blueStates = blueStates;
	$scope.openStates = openStates;

	$scope.calculateElectoral = function(){
		$scope.republican = 0;
		$scope.democrat = 0;
		$scope.open = 0;
		for(var i = 0; i < $scope.redStates.length; i++){
			if($scope.redStates[i]){
				$scope.republican += redStates[i].electoralVotes;
			}
		}
		for(var i = 0; i < $scope.blueStates.length; i++){
			if($scope.blueStates[i]){
				$scope.democrat += blueStates[i].electoralVotes;
			}
		}
		for(var i = 0; i < $scope.openStates.length; i++){
			if($scope.openStates[i]){
				$scope.open += openStates[i].electoralVotes;
			}
		}
		$scope.redwidth = ($scope.republican/($scope.republican + $scope.democrat + $scope.open)*100) + '%';
		$scope.openwidth = ($scope.open/($scope.republican + $scope.democrat + $scope.open)*100) + '%';
		$scope.bluewidth = ($scope.democrat/($scope.republican + $scope.democrat + $scope.open)*100) + '%';
	}

	$scope.reset = function(){
		$scope.states = states;
		$scope.calculateElectoral();
	}

	$scope.calculateElectoral();
}


function getNewColor(state){
	if(state.stateColor == 'red'){
		//add the element to the appropriate array and remove it from the old
		blueStates[state.id] = state;
		redStates.splice(state.id, 1, emptyState);
		console.log(redStates);
		return "blue";
	}else if(state.stateColor == 'blue'){
		openStates[state.id] = state;
		blueStates.splice(state.id, 1, emptyState);
		return "open";
	}else if(state.stateColor == 'open'){
		redStates[state.id] = state;
		openStates.splice(state.id, 1, emptyState);
		return "red";
	}

}

