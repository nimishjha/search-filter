describe('search', function () {
	beforeEach(module('searchFilter'));
	var $controller;
	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	}));
	describe('searchFunction', function () {

		it('Site description should match', function () {
			var $scope = {};
			var controller = $controller('SearchController', { $scope: $scope });
			$scope.query = "Surf";
			$scope.doSearch();
			expect($scope.results).toEqual([{
				"siteName": "SurferMag",
				"siteDescription": "This is the description for SurferMag",
				"siteUrl": "www.surfermag.com"
			}]);
		});

		it("Input case shouldn't matter", function () {
			var $scope = {};
			var controller = $controller('SearchController', { $scope: $scope });
			$scope.query = "surferMAG";
			$scope.doSearch();
			expect($scope.results).toEqual([{
				"siteName": "SurferMag",
				"siteDescription": "This is the description for SurferMag",
				"siteUrl": "www.surfermag.com"
			}]);
		});

		it('Category should match', function () {
			var $scope = {};
			var controller = $controller('SearchController', { $scope: $scope });
			$scope.query = "auto";
			$scope.doSearch();
			expect($scope.results).toEqual([{
				"siteName": "SurferMag",
				"siteDescription": "This is the description for SurferMag",
				"siteUrl": "www.surfermag.com"
			},
			{
				"siteName": "Table Tennis Tips - How to not come runners up",
				"siteDescription": "This is the description for Table Tennis Tips",
				"siteUrl": "www.ttt.com"
			}]);
		});

		it('Comma-separated multiple terms should match for site descriptions', function () {
			var $scope = {};
			var controller = $controller('SearchController', { $scope: $scope });
			$scope.query = "surf, ebay";
			$scope.doSearch();
			expect($scope.results).toEqual([{
				"siteName": "SurferMag",
				"siteDescription": "This is the description for SurferMag",
				"siteUrl": "www.surfermag.com"
			},
			{
				"siteName": "Ebay",
				"siteDescription": "This is the description for ebay",
				"siteUrl": "www.ebay.com.au"
			}]);
		});

		it('Comma-separated multiple terms should match for categories', function () {
			var $scope = {};
			var controller = $controller('SearchController', { $scope: $scope });
			$scope.query = "arts, auto";
			$scope.doSearch();
			expect($scope.results).toEqual([{
				"siteName": "Ebay",
				"siteDescription": "This is the description for ebay",
				"siteUrl": "www.ebay.com.au"
			},
			{
				"siteName": "Table Tennis Tips - How to not come runners up",
				"siteDescription": "This is the description for Table Tennis Tips",
				"siteUrl": "www.ttt.com"
			},
			{
				"siteName": "SurferMag",
				"siteDescription": "This is the description for SurferMag",
				"siteUrl": "www.surfermag.com"
			}]);
		});

		it('Comma-separated multiple terms should match for both site descriptions and categories', function () {
			var $scope = {};
			var controller = $controller('SearchController', { $scope: $scope });
			$scope.query = "business, ebay";
			$scope.doSearch();
			expect($scope.results).toEqual([{
				"siteName": "Robs UI Tips",
				"siteDescription": "This is the description for the best site in the world. It is the best:)",
				"siteUrl": "www.awesomeui.com.au"
			},
			{
				"siteName": "Table Tennis Tips - How to not come runners up",
				"siteDescription": "This is the description for Table Tennis Tips",
				"siteUrl": "www.ttt.com"
			},
			{
				"siteName": "Ebay",
				"siteDescription": "This is the description for ebay",
				"siteUrl": "www.ebay.com.au"
			}]);
		});

		it('If multiple terms are given and one of them is too short, we should still test against the other terms', function () {
			var $scope = {};
			var controller = $controller('SearchController', { $scope: $scope });
			$scope.query = "xyz, auto";
			$scope.doSearch();
			expect($scope.results).toEqual([{
				"siteName": "SurferMag",
				"siteDescription": "This is the description for SurferMag",
				"siteUrl": "www.surfermag.com"
			},
			{
				"siteName": "Table Tennis Tips - How to not come runners up",
				"siteDescription": "This is the description for Table Tennis Tips",
				"siteUrl": "www.ttt.com"
			}]);
		});

		it('No match should return an empty set of results', function () {
			var $scope = {};
			var controller = $controller('SearchController', { $scope: $scope });
			$scope.query = "alligator";
			$scope.doSearch();
			expect($scope.results).toEqual([]);
		});
	});
});