define(['angular'],function(angular){
    'use strict';
    var ConfigurationCtrl = angular.module('ConfigurationCtrl', []);
    ConfigurationCtrl.controller('ConfigurationCtrl', ['$scope', '$location','$log','localStorageService','$translate','UtilityServices','$rootScope',
        function ($scope,$location,$log,localStorageService,$translate,UtilityServices,$rootScope){
            $log.info("in confiCtrl");

            function loadTitle(){
                $scope.title=UtilityServices.gettitle();
            }
            loadTitle();

            function loadColors(){
                var colorPlate=UtilityServices.getColorCodes();
                //$log.debug("the colors are ---",colorPlate)sss
                if(!UtilityServices.isVoid(colorPlate)){
                    $scope.backgroundColor=colorPlate.basicBackground;
                    $scope.fontColor=colorPlate.basicFontColor;
                    $scope.basicOtherColor=colorPlate.basicOtherColor;
                    $scope.navBackground=colorPlate.navBarBackground;
                    $scope.navBarShadow =colorPlate.navBarShadow;
                    $scope.newAdColor=colorPlate.newAdColor;
                    $scope.newAdLoading=colorPlate.newAdLoading;
                    $scope.homeColor=colorPlate.homeColor;
                    $scope.dashboardColor=colorPlate.dashboardColor;
                    $scope.clientMonitoringColor=colorPlate.clientMonitoringColor;
                    $scope.myAdsColor=colorPlate.myAdsColor;
                    $scope.resourcesColor=colorPlate.resourcesColor;
                    $scope.rangeColor=colorPlate.rangeColor;
                    $scope.uploadBack=colorPlate.uploadBack;
                    $scope.disableColor=colorPlate.disableColor;
                    $scope.adminColor=colorPlate.adminColor;
                    $scope.datePickerBackGround=colorPlate.datePickerBackGround;
                    $scope.datePickerDay = colorPlate.datePickerDay;
                    $scope.datePickerSelectedDay =colorPlate.datePickerSelectedDay
                    console.log("datePickerBackGround",$scope.datePickerDay);
                    $scope.errorColor =colorPlate.errorColor;
                    $scope.disabledDateColor =colorPlate.disabledDateColor;
                    $scope.grayColor= colorPlate.grayColor;
                    $scope.iabBorder = colorPlate.iabBorder;    
                    $scope.disabledButonColor = colorPlate.disabledButonColor;
                    $scope.activeFishColor = colorPlate.activeFishColor;
                    $scope.mediaDesignBorder = colorPlate.mediaDesignBorder;
            }
            
                //$log.debug("the colors are---",$scope.backgroundColor,"---and---",$scope.fontColor,"---nav---",$scope.navBackground)
            }
            loadColors();

            function loadImages(){
                var imagePlate=UtilityServices.getCommonImages();
                //$log.debug("the images are in config ctrl... ---",imagePlate)
                $scope.checkImage=imagePlate.checkImage;
                $scope.logincheckImage=imagePlate.logincheckImage;
                $scope.radiusPointer=imagePlate.radiusPointer;
                $scope.calenderLeft=imagePlate.calenderLeft;
                $scope.calenderRight=imagePlate.calenderRight;
                $scope.tabActive = imagePlate.tabActive;

                //$log.debug("the radious pointer is ",$scope.radiusPointer)
            }


            loadImages();

        }

    ]);

});