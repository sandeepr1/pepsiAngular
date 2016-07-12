app.controller('equipmentDetailsController',['$scope','dataLoad',function($scope,dataLoad){
	dataLoad.getAllData(function(data){
			$scope.data=data;
	});
		$scope.reqFeilds=['EQPMT_ID','KFID',"IDENT_ITEM_ID","CITY","COUNTRY","CUSTOMER_NAME",];
		$scope.reqFeilds2=["MARKET_UNIT","SSD_FREESPACE","SSD_TEMP","RAM_TOTAL","SYSTEM_TEMP","ROW_LAST_UPDT_DTM"];
}]);
