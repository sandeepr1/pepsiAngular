angular.module('MyApp')
		.controller('dashboardController',['$scope','dataLoad',function($scope,dataLoad){
				dataLoad.getAllData(function(data){
					$scope.config=data;
					console.log(data);
					 $scope.countries={};
			        for(var i=0;i<data.length;i++){
			        	$scope.countries[data[i]["COUNTRY"]]=1;
			        }
			        		$scope.countryKeys=Object.keys($scope.countries);
			        		$scope.selectedCountry="Country";
			        		$scope.selectedRegion="Region";
			        		$scope.selectedMarketUnit="Market";
			        		$scope.selectedLocation="Location";
			        		$scope.updateCountry($scope.countryKeys[0]);

				});

                $scope.updateRegion=function(region){
                	angular.element('div').contents().find("#barChart").html("");
                	angular.element('div').contents().find("#pieChart").html("");

                     	$scope.selectedMarketUnit="Market";
                     	$scope.selectedLocation="Location";

                     	$scope.selectedRegion=region;
                     	$scope.selectedRegionData=[];
                     	console.log($scope.selectedRegion);
                     	console.log($scope.selectedCountryData);
                     	for(var p=0;p<$scope.selectedCountryData.length;p++){
                     		console.log($scope.selectedCountryData[p]["REGION"]);
                     		if($scope.selectedCountryData[p]["REGION"]==$scope.selectedRegion){
                     			$scope.selectedRegionData.push($scope.selectedCountryData[p]);
                     		}
                     	}
                     	$scope.geoLocation($scope.selectedRegionData);

                     	$scope.marketUnit={};

             			for(var k=0;k<$scope.selectedRegionData.length;k++){
             					$scope.marketUnit[$scope.selectedRegionData[k]["MARKET_UNIT"]]=1;
             			}
             			$scope.marketUnitKeys=Object.keys($scope.marketUnit);
             			$scope.drawGraphs($scope.selectedRegionData);
                     }



                $scope.updateMarketunit=function(marketUnit){
                	angular.element('div').contents().find("#barChart").html("");
                	angular.element('div').contents().find("#pieChart").html("");
                  	$scope.selectedLocation="Location";
                  		$scope.selectedMarketUnit=marketUnit;
                  		$scope.selectedMarketUnitData=[];
                  		for(var q=0;q<$scope.selectedRegionData.length;q++){
                  			if($scope.selectedRegionData[q]["MARKET_UNIT"]==$scope.selectedMarketUnit){
                  				$scope.selectedMarketUnitData.push($scope.selectedRegionData[q]);
                  			}
                  		}

                  	  	$scope.geoLocation($scope.selectedMarketUnitData);

                  	  	$scope.locations={};
                  	  	console.log($scope.selectedMarketUnitData);
                  	  	for(s=0;s<$scope.selectedMarketUnitData.length;s++){
                  	  		$scope.locations[$scope.selectedMarketUnitData[s]["LOCATION"]]=1;
                  	  	}
                  	  	$scope.locationsKeys=Object.keys($scope.locations);
                  	  	console.log($scope.locationsKeys);
                  	  	$scope.drawGraphs($scope.selectedMarketUnitData);

                  }


               $scope.updateLocation=function(location){
                 	angular.element('div').contents().find("#barChart").html("");
                	angular.element('div').contents().find("#pieChart").html("");
                 	$scope.selectedLocation=location;
                 	$scope.selectedLocationData=[];
                 	console.log($scope.selectedMarketUnitData);
                 	for(var t=0;t<$scope.selectedMarketUnitData.length;t++){
                 		if($scope.selectedMarketUnitData[t]["LOCATION"]==$scope.selectedLocation){
                 			$scope.selectedLocationData.push($scope.selectedMarketUnitData[t]);
                 		}
                 	}
                 	$scope.geoLocation($scope.selectedLocationData);
                 	$scope.drawGraphs($scope.selectedLocationData)
                 }



                $scope.updateCountry=function(countryName){
                	angular.element('div').contents().find("#barChart").html("");
                	angular.element('div').contents().find("#pieChart").html("");
                     	$scope.selectedRegion="Region";
                     	$scope.selectedMarketUnit="Market";
                     	$scope.selectedLocation="Location";
                     	$scope.selectedCountry=countryName;
                     	$scope.selectedCountryData=[];

             			for(var j=0;j<$scope.config.length;j++){
             				if($scope.config[j]["COUNTRY"]==$scope.selectedCountry){
             					$scope.selectedCountryData.push($scope.config[j]);
             				}
             			}
             			console.log($scope.selectedCountryData);
             			$scope.geoLocation($scope.selectedCountryData);

             			$scope.regions={};

             			for(var k=0;k<$scope.selectedCountryData.length;k++){
             					$scope.regions[$scope.selectedCountryData[k]["REGION"]]=1;
             			}
             			$scope.regionsKeys=Object.keys($scope.regions);
             			console.log($scope.regionsKeys);
             			$scope.drawGraphs($scope.selectedCountryData);
                     };
		
                $scope.drawGraphs=function(data){
                 	      var excelObject ={};
                 	      excelObject["Dashboard_Dump"]=data;
                 	      console.log(data);
					      var SENConnectivity = {};
					      var OverallStatus = {};
					      var keys = [];
					      var SENConnectivityValues = [];
					      var OverallStatusValues = [];
					      var OverallStatusKeys = [];
					      var newOverall=[];
					      var SENConnectivityKeys=[];
					      var connectivityIssues=[];
					      var connectivityStatus=[];
					      for (var i = 0; i < excelObject.Dashboard_Dump.length; i++)
					      {
					        SENConnectivity[excelObject.Dashboard_Dump[i]["CONNECTIVITY"]] = (SENConnectivity[excelObject.Dashboard_Dump[i]["CONNECTIVITY"]] + 1) || 1;
					        OverallStatus[excelObject.Dashboard_Dump[i]["OVERALL_STATUS"]] = (OverallStatus[excelObject.Dashboard_Dump[i]["OVERALL_STATUS"]] + 1) || 1;
					      }

					      Object.keys(SENConnectivity).forEach(function (key) {
					      						        var arrayValue = [];
					        arrayValue.push(SENConnectivity[key]);
					        SENConnectivityValues.push({"values" : arrayValue , "text" : key });
					        SENConnectivityKeys.push(key);

					        var temp={};
					        temp["label"]=key;
					        temp["value"]=SENConnectivity[key];
					        if(key==="Transmitting Data"){
					        	 temp["color"]="yellow";
					        }else{
					        	temp["color"]="pink";
					        }
					       
					        connectivityStatus.push(temp);
					      });

					      Object.keys(OverallStatus).forEach(function (key) {
					        var temp={};
					        temp["text"]=key;
					        temp["value"]=OverallStatus[key];
					        connectivityIssues.push(temp);
					        OverallStatusKeys.push(key);

					       
					      });
					      
					      console.log(SENConnectivity);
					      console.log(OverallStatus);
					      $scope.barChart(connectivityIssues,excelObject,OverallStatusKeys);
					      $scope.pieChart(connectivityStatus,excelObject,SENConnectivityKeys,$scope.geoLocation);
                 }
                $scope.geoLocation=function(coordinates,tabeldata){
			             var map = new google.maps.Map(document.getElementById('geoGraph'), {
			                      zoom: 2,
			                      center: {
			                           "lat": Number(coordinates[0].LAT),
			                           "lng": Number(coordinates[0].LNG)
			                     }
			               });

					        var image = 'http://www.myiconfinder.com/uploads/iconsets/32-32-a5485b563efc4511e0cd8bd04ad0fe9e.png';

					        for (var i = 0; i < coordinates.length; i++) {
					           var contentString = "<p>some info here </h1>"
					           var infowindow = new google.maps.InfoWindow({
					           content: contentString
					          });
					           console.log(Number(coordinates[i].LAT) + " LAN"+coordinates[i].LNG)
					          var marker = new google.maps.Marker({
					          position: {
					                "lat": Number(coordinates[i].LAT),
					                "lng": Number(coordinates[i].LNG)
					          },
					          map: map,
					          icon: image,
					          details:{
					                "customerName":coordinates[i].CUSTOMER_NAME,
					                "customerAddress":coordinates[i].ADDR1
					          },
					          title: 'Demo',
					          animation: google.maps.Animation.DROP
					        });

					        // console.log(coordinates[i].lat,coordinates[i].lng);
					        google.maps.event.addListener(marker, 'click', (function() {
					          infowindow.open(map, this);
					          $('.geobox').show(700);
					          $('.geodetails').html("");
					          var table = 'Equipment Details <center> <table class="table tclass" ><tr><td>Customer Name</td><td>'+this.details.customerName+'</td></tr><tr><td>Customer Address</td><td>'+this.details.customerAddress+'</td></tr></table></center>';
					          $('.geodetails').html(table);
					        }))
					        }

                     }


                $scope.barChart=function(data,excelObject,OverallStatusKeys){
							var margin = {top: 20, right: 20, bottom: 30, left: 40},
							    width = 500 - margin.left - margin.right,
							    height = 300 - margin.top - margin.bottom;

							var x = d3.scale.ordinal()
							    .rangeRoundBands([0, width], .1);

							var y = d3.scale.linear()
							    .range([height, 0]);

							var xAxis = d3.svg.axis()
							    .scale(x)
							    .orient("bottom");

							var yAxis = d3.svg.axis()
							    .scale(y)
							    .orient("left")
							    .ticks(10, "%");

							var svg = d3.select("#barChart").append("svg")
							    .attr("width", width + margin.left + margin.right)
							    .attr("height", height + margin.top + margin.bottom)
							  .append("g")
							    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


							  x.domain(data.map(function(d) { return d.text; }));
							  y.domain([0, d3.max(data, function(d) { return d.value; })]);

							  svg.append("g")
							      .attr("class", "x axis")
							      .attr("transform", "translate(0," + height + ")")
							      .call(xAxis);

							  svg.append("g")
							      .attr("class", "y axis")
							      .call(yAxis)
							    .append("text")
							      .attr("transform", "rotate(-90)")
							      .attr("y", 6)
							      .attr("dy", ".71em")
							      .style("text-anchor", "end")
							      .text("Frequency");

							  svg.selectAll(".bar")
							      .data(data)
							    .enter().append("rect")
							      .attr("class", "bar")
							      .attr("x", function(d) { return x(d.text); })
							      .attr("width", x.rangeBand())
							      .attr("y", function(d) { return y(d.value); })
							      .attr("height", function(d) { return height - y(d.value); })
							      .on('click',function(d,index){
							      		console.log(d);
							      		console.log(index);
							      		    var temp = [];
									        for(var i=0,item=excelObject["Dashboard_Dump"];i<item.length;i++){
									        	if(item[i]["OVERALL_STATUS"]==OverallStatusKeys[index]){
									        		temp.push(item[i]);
									        	}
									        }
									        $scope.geoLocation(temp);
									      });
                 	
                    }


                 $scope.pieChart=function(data,excelObject,SENConnectivityKeys,geoLocation){

						var svg = d3.select("#pieChart").append("svg").attr("width",500).attr("height",300);

						svg.append("g").attr("id","donutStatus");

						Donut3D.draw("donutStatus",excelObject,SENConnectivityKeys,geoLocation, data, 150, 150, 130, 100, 20, .2);

                 }

		}]);