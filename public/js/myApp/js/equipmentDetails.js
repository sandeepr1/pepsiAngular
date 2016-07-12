app.controller('equipmentDetailsController',['$scope','dataLoad','equipmentDtlsService',function($scope,dataLoad,equipmentDtlsService){
		console.log("Level 3 controller");
		console.log(equipmentDtlsService.getSelectedEquipment());
		dataLoad.getAllData(function(data){
		$scope.data=data;
		});
	$scope.reqFeilds=['EQPMT_ID','KFID',"IDENT_ITEM_ID","ADDR1","CITY","COUNTRY","CUSTOMER_NAME",];
	$scope.reqFeilds2=["MARKET_UNIT","SSD_FREESPACE","SYSTEM_UPTIME","SSD_TEMP","RAM_TOTAL","SYSTEM_TEMP","ROW_LAST_UPDT_DTM"];
	$scope.reqFeilds3=["SYSTEM_POWERONHOURS","SYSTEM_UPTIME","SYSTEM_FANSPEED","SYSTEM_CPUTEMPERATURE","SYSTEM_CPUSERIALNUMBER","SSD_FREESPACE","ROW_LAST_UPDT_DTM"];
	$scope.reqFeilds4=["SSD_TEMP","SSD_SERIALNUMBER","RAM_TOTAL","RAM_USAGE","SYSTEM_TEMP","SYSTEM_UNSAFESHUTDOWNCOUNT","CONNECTIVITY"];
}]);
