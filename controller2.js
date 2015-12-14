var stateMap = angular.module('interactiveMap', []);

stateMap.controller('interactiveMapCntrl', interactiveMapCntrl);




function interactiveMapCntrl($scope){
	initialize();
	$scope.states = states;
	$scope.redStates = redStates;
	$scope.blueStates = blueStates;
	$scope.openStates = openStates;

	//Changes the color when a state is clicked.
	$scope.getNewColor = function(state){
		if(state.stateColor == 'red'){
			state.stateColor = "blue";
			blueStates[state.id] = state;
			redStates.splice(state.id, 1, emptyState);
		}else if(state.stateColor == 'blue'){
			state.stateColor = "open";
			openStates[state.id] = state;
			blueStates.splice(state.id, 1, emptyState);
		}else if(state.stateColor == 'open'){
			state.stateColor = "red";
			redStates[state.id] = state;
			openStates.splice(state.id, 1, emptyState);
		}
		$scope.calculateElectoral();
	}

	//calculates the number of electoral votes for democrat, republican, and open
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

		//calculates width of bars to show the percentage in red, sand, and blue color
		$scope.redwidth = ($scope.republican/($scope.republican + $scope.democrat + $scope.open)*100) + '%';
		$scope.openwidth = ($scope.open/($scope.republican + $scope.democrat + $scope.open)*100) + '%';
		$scope.bluewidth = ($scope.democrat/($scope.republican + $scope.democrat + $scope.open)*100) + '%';
	}

	//reset the map
	$scope.reset = function(){
		initialize();
		$scope.states = states;
		$scope.redStates = redStates;
		$scope.blueStates = blueStates;
		$scope.openStates = openStates;
		$scope.calculateElectoral();
	}

	$scope.calculateElectoral();

}


