var searchFilter = angular.module('searchFilter', []);

searchFilter.controller('SearchController', ['$scope', function(scope){

	scope.results = [];
	scope.noResults = false;

	scope.sites = [
		{
			"id": 1,
			"siteName": "SurferMag",
			"siteUrl": "www.surfermag.com",
			"description": "This is the description for SurferMag",
			"categoryIds": [2]
		},
		{
			"id": 2,
			"siteName": "Ebay",
			"siteUrl": "www.ebay.com.au",
			"description": "This is the description for ebay",
			"categoryIds": [1]
		},
		{
			"id": 3,
			"siteName": "Robs UI Tips",
			"siteUrl": "www.awesomeui.com.au",
			"description": "This is the description for the best site in the world. It is the best:)",
			"categoryIds": [4, 3]
		},
		{
			"id": 4,
			"siteName": "Table Tennis Tips - How to not come runners up",
			"siteUrl": "www.ttt.com",
			"description": "This is the description for Table Tennis Tips",
			"categoryIds": [1, 2, 3, 4]
		}
	];

	scope.categories = [
		{
			id: 1,
			description: "Arts & Entertainment"
		},
		{
			id: 2,
			description: "Automotive"
		},
		{
			id: 3,
			description: "Business"
		},
		{
			id: 4,
			description: "Careers"
		}
	];

	//	First, merge the category descriptions into the sites array
	//	Uses more memory, but the dataset is small
	for(var i = 0, ii = scope.sites.length; i < ii; i++)
	{
		scope.sites[i].categoryDescriptions = [];
		for(var j = 0, jj = scope.sites[i].categoryIds.length; j < jj; j++)
		{
			scope.sites[i].categoryDescriptions.push(scope.categories[j].description);
		}
	}

	scope.doSearch = function() {
		var filterText = scope.query.toLowerCase();
		scope.results = [];
		scope.noResults = true;
		var i, ii, j, jj;
		//	Don't match less than three characters, the mockup seems to indicate this
		if(filterText.length < 3)
		{
			scope.noResults = false;
			return;
		}

		//	Using for loop for best performance, it's 4x faster than _.each()
		for(i = 0, ii = scope.sites.length; i < ii; i++)
		{
			//	First, match against the site description
			if(scope.sites[i].description.toLowerCase().indexOf(filterText) !== -1)
			{
				scope.noResults = false;
				scope.results.push({
					siteName: scope.sites[i].siteName,
					siteDescription: scope.sites[i].description,
					siteUrl: scope.sites[i].siteUrl
				});
			}
			else
			{
				//	Nested loop, but since the arrays are small, and this loop is not always triggered, it's not too bad
				for(j = 0, jj = scope.sites[i].categoryDescriptions.length; j < jj; j++)
				{
					if(scope.sites[i].categoryDescriptions[j].toLowerCase().indexOf(filterText) !== -1)
					{
						scope.noResults = false;
						scope.results.push({
							siteName: scope.sites[i].siteName,
							siteDescription: scope.sites[i].description,
							siteUrl: scope.sites[i].siteUrl
						});
						break;
					}
				}
			}
		}
	};

}]);