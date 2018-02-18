/**
 * Created by Sushil on 20-Mar-17.
 * dependency.... angular Cropper....
 */
define(['angular'],function(angular){
    'use strict';
    var customAd = angular.module('customAd', []);

    customAd.directive('customAd', function () {
        var getImageUrl = function (url) {
            //console.log("Url is here for data :",url);
        };
        var controller = ['$scope','localStorageService','ngDialog','$timeout', function ($scope,localStorageService,ngDialog,$timeout ) {
                $scope.customAdData = {
                    "templateImageUploadParameter": [],
                    "croppedImage": "",
                    "templateSize" : {"height":250, "width":300 }

                };
                var sendNullUrl  = false;
                var imageBase64Data;
            //console.log("$scope.dropBoxId is here before controller call ",$scope.dropBoxId);
            var   dropBox = document.getElementById("customAdImage");


            function dragEnter(event) {
                console.log("eventin drag", event);
                event.stopPropagation();
                event.preventDefault();
                event.dataTransfer.effectAllowed = 'move';
                console.log("dragEnter function is working");
            }

            function dragLeave(event) {
                event.stopPropagation();
                event.preventDefault();
            }

            function dragOver(event) {
                event.stopPropagation();
                event.preventDefault();
            }

            function dragAndDropStart(dropBox){
                dropBox.addEventListener('dragenter', dragEnter, false);
                dropBox.addEventListener('dragleave', dragLeave, false);
                dropBox.addEventListener('dragover', dragOver, false);
                dropBox.addEventListener("drop", function (event) {
                    event.stopPropagation();
                    event.preventDefault();
                    console.log("drop function is working");
                    console.log(event.dataTransfer.files[0]);
                    $scope.fileName = event.dataTransfer.files[0].name;
                    if (event.dataTransfer.files[0].size > 0) {
                        $scope.fileSize = event.dataTransfer.files[0].size;
                        $scope.$apply(
                            $scope.showProgress = true
                        );
                    } else {

                        showMsg("No Record To Process", "error")
                        $scope.showProgress = false;
                        return false;
                    }

                    console.log("size", $scope.fileSize);
                    var extension = $scope.fileName.substring($scope.fileName.lastIndexOf('.') + 1);
                    //if (extension == "csv") {
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        imageBase64Data = event.target.result;
                        var imageHeightWidth = new Image();
                        imageHeightWidth.onload = function(){
                            //alert( i.width+", "+i.height );
                            localStorageService.set('FirstAdImageKey',event.target.result);
                            if(imageHeightWidth.width === $scope.customAdData.templateSize.width && imageHeightWidth.height === $scope.customAdData.templateSize.height){
                                sendNullUrl  = true;
                                $scope.customAdData.croppedImage = imageBase64Data;
                                $scope.imagecallback({data:{imgData:imageBase64Data,height:$scope.customAdData.templateSize.height,
                                    width:$scope.customAdData.templateSize.width,sendNullUrl:sendNullUrl}});
                                sendNullUrl  = false;
                            }else{
                                var imageData = {
                                    "sourceImgKey":'FirstAdImageKey',
                                    "cropWidth":$scope.customAdData.templateSize.width,
                                    'cropHeight':$scope.customAdData.templateSize.height
                                };
                                localStorageService.set('cropData',imageData);
                                openNewCropViewInDialog();
                            }
                        };
                        imageHeightWidth.src = imageBase64Data;
                    };
                    reader.readAsDataURL(event.dataTransfer.files[0]);
                    //}
                    //else {
                    //    showMsg("File Is Not Csv Type", "error")
                    //}
                }, false);
            }

            function openNewCropViewInDialog(){
                    $timeout(function () {
                        var dialog = ngDialog.open({
                            template: 'shared_views/newCropView.html',
                            cache: false,
                            closeByDocument:false,
                            className: 'ngdialog-theme-default ngdialog-theme-default-custom #inner',
                            controller: 'ngImageCropperCtrl'});


                        var broadcastReturn = $scope.$on('imageCropped',function(event,args){
                            var fileFormat = args.split('.').pop();
                            var dataCheck = (fileFormat !== 'jpg' && fileFormat !== 'png' && fileFormat !== 'gif' &&
                            fileFormat !== 'bmp' && fileFormat !== 'jpeg' && fileFormat !== '')?true:false;
                            //console.log("Croped image is here for test :",args);
                            sendNullUrl  = true;
                            $scope.customAdData.croppedImage = args;
                            $scope.imagecallback({data:{imgData:args,height:$scope.customAdData.templateSize.height,width:$scope.customAdData.templateSize.width,sendNullUrl:sendNullUrl}});
                            sendNullUrl  = false;
                            //getImageUrl(args);
                            dialog.close();
                        });

                        dialog.closePromise.then(function(data){
                            $scope.imagecallback({data:{imgData:null,height:$scope.customAdData.templateSize.height,width:$scope.customAdData.templateSize.width,sendNullUrl:sendNullUrl}});
                            //console.log("Data is here for image crop close :",data);
                            localStorageService.remove('cropData');
                            //localStorageService.remove(id);
                            broadcastReturn();
                        });

                    }, 0);

                };

                var changeTemplateImage = function (event) {
                    //alert("here in change image method");
                    var file = event.currentTarget.files[0];
                    console.log("File is here for test data :",event);
                    console.log("Image object is here for test :",this);
                    if(file.size >= 2100000){
                        noty({text: "Image file size should be less than 2 Mb.", timeout: 4000, type: 'error'});
                        $scope.imagecallback({data:{imgData:null,height:$scope.customAdData.templateSize.height,width:$scope.customAdData.templateSize.width,sendNullUrl:sendNullUrl}});
                        return;
                    }
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        //try {
                           // console.log("image file ",event.target.result);
                        //document.getElementById("fileToUpload").remove();
                        //alert("here in change image  44 method");
                        imageBase64Data = event.target.result;
                        var imageHeightWidth = new Image();

                        imageHeightWidth.onload = function(){
                            //alert( i.width+", "+i.height );
                            localStorageService.set('FirstAdImageKey',event.target.result);
                            if(imageHeightWidth.width === $scope.customAdData.templateSize.width && imageHeightWidth.height === $scope.customAdData.templateSize.height){
                                sendNullUrl  = true;
                                $scope.customAdData.croppedImage = imageBase64Data;
                                $scope.imagecallback({data:{imgData:imageBase64Data,height:$scope.customAdData.templateSize.height,
                                                                width:$scope.customAdData.templateSize.width,sendNullUrl:sendNullUrl}});
                                sendNullUrl  = false;
                            }else{
                                var imageData = {
                                    "sourceImgKey":'FirstAdImageKey',
                                    "cropWidth":$scope.customAdData.templateSize.width,
                                    'cropHeight':$scope.customAdData.templateSize.height
                                };
                                localStorageService.set('cropData',imageData);
                                openNewCropViewInDialog();
                            }

                        };
                        imageHeightWidth.src = imageBase64Data;


                        //openNewCropViewInDialog($scope.templateImageUploadParameter[0],$scope.templateImageUploadParameter[1],$scope.templateImageUploadParameter[2]);
                        //});
                    };
                    reader.readAsDataURL(file);
                };

                function init() {
                    $scope.customAdData.templateSize = $scope.datasource.templateSize;
                    $scope.customAdData.croppedImage = $scope.datasource.defaultImage;
                    //var id = document.getElementById('customAdImage');
                    //id.removeAttribute("id");
                    //id.setAttribute("id", $scope.datasource.id);
                    console.log("$scope.datasource.id is here :",$scope.datasource.id);
                    //$scope.dropBoxId = $scope.datasource.id;
                    dragAndDropStart(document.getElementById($scope.datasource.id));
                    //dropBox= null;
                    console.log("Template datasource  is here for test ::::",$scope.customAdData);
                };
                var x;
                function checkOnCancel(){
                    if(x.value.length == 0){
                        $scope.imagecallback({data:{imgData:null,height:$scope.customAdData.templateSize.height,width:$scope.customAdData.templateSize.width,sendNullUrl:sendNullUrl}});
                    }
                    document.body.onfocus = null;
                };
                function charge(){
                    document.body.onfocus = checkOnCancel;
                };
                init();
                $scope.templateImageUploadParameter = [];
                $scope.uploadTemplateImage = function(){
                    x = document.createElement("INPUT");
                    x.setAttribute("type", "file");
                    x.setAttribute("id", "fileToUpload");
                    x.setAttribute("accept", "image/gif,image/jpeg");
                    x.onclick = charge;
                    x.addEventListener("change", changeTemplateImage);
                    x.click();
                };
                $scope.newImageImprove = function(){
                    if(imageBase64Data == null || imageBase64Data === undefined || imageBase64Data=== ''){
                        $scope.uploadTemplateImage();
                    }else{
                        localStorageService.set('FirstAdImageKey',imageBase64Data);
                        var imageData = {
                            "sourceImgKey":'FirstAdImageKey',
                            "cropWidth":$scope.customAdData.templateSize.width,
                            'cropHeight':$scope.customAdData.templateSize.height
                        };
                        localStorageService.set('cropData',imageData);
                        openNewCropViewInDialog();
                    }

                };// newImageImprove end...

            }];

        return {
            restrict: 'EA', //Default in 1.3+
            scope: {
                datasource: '=',
                imagecallback: '&'
            },
            controller: controller,
            templateUrl: '../scripts/lib/customAD/customAd.html'
        };
    });
});

