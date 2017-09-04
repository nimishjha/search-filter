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

	//	Create a lookup table for categories
	scope.categoryLookup = {};
	for(i = 0, ii = scope.categories.length; i < ii; i++)
	{
		scope.categoryLookup[scope.categories[i].id] = scope.categories[i].description;
	}

	function getCategoryDescriptionById(id) {
		return scope.categoryLookup[id];
	}

	//	First, merge the category descriptions into the sites array
	//	Uses more memory, but the dataset is small
	for(var i = 0, ii = scope.sites.length; i < ii; i++)
	{
		scope.sites[i].categoryDescriptions = [];
		for(var j = 0, jj = scope.sites[i].categoryIds.length; j < jj; j++)
		{
			scope.sites[i].categoryDescriptions.push(getCategoryDescriptionById(scope.sites[i].categoryIds[j]));
		}
	}

	scope.doSearch = function() {
		var query = scope.query.toLowerCase().split(",");

		scope.results = [];
		scope.noResults = true;

		var alreadyMatched = [];	// This array holds the ids of sites that have already been pushed onto results, so that we don't push the same item twice

		//	Using for loops for best performance, it's 4x faster than _.each()
		for(k = 0, kk = query.length; k < kk; k++)
		{
			var filterText = trim(query[k]);
			var i, ii, j, jj;
			//	Don't match less than three characters, the mockup seems to indicate this
			if(filterText.length < 3)
			{
				scope.noResults = false;
				continue;
			}

			for(i = 0, ii = scope.sites.length; i < ii; i++)
			{
				//	First, match against the site description
				if(scope.sites[i].description.toLowerCase().indexOf(filterText) !== -1 && !isInArray(scope.sites[i].id, alreadyMatched))
				{
					scope.noResults = false;
					scope.results.push({
						siteName: scope.sites[i].siteName,
						siteDescription: scope.sites[i].description,
						siteUrl: scope.sites[i].siteUrl
					});
					alreadyMatched.push(scope.sites[i].id);
				}
				else
				{
					//	Nested loop, but since the arrays are small, and this loop is not always triggered, it's not too bad
					for(j = 0, jj = scope.sites[i].categoryDescriptions.length; j < jj; j++)
					{
						if(scope.sites[i].categoryDescriptions[j].toLowerCase().indexOf(filterText) !== -1 && !isInArray(scope.sites[i].id, alreadyMatched))
						{
							scope.noResults = false;
							scope.results.push({
								siteName: scope.sites[i].siteName,
								siteDescription: scope.sites[i].description,
								siteUrl: scope.sites[i].siteUrl
							});
							alreadyMatched.push(scope.sites[i].id);
							break;
						}
					}
				}
			}
		}
	};

	//
	//	Helper functions
	//

	function trim(s) {
		return s.replace(/^\s+|\s+$/g, "");
	}

	function isInArray(item, arr)
	{
		var i = arr.length;
		var found = false;
		while(i--)
		{
			if(item === arr[i])
			{
				found = true;
				break;
			}
		}
		return found;
	}

}]);
