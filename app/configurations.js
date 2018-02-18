module.exports = function(serverInfo) {
    console.log("the environment is ",serverInfo.environment)
    var isCurrencyEditable=serverInfo.environment==="production"?true:true;
    var globalConfiguration={
        "fbAppId":{
            "production":{
                "id": "242286592976863"
            },
            "staging":{
                "id":"242286592976863"
            },
            "other":{
                "id":"242286592976863"
            }
        }

    }
    function selectFbAppId(obj){
        var appId=""
        appId=obj[serverInfo.environment].id
        return appId
    }
    var appConfigurations = {
        "dentsu":{
            "lpConfig":{
                "production":{
                    "landingPageHost": "https://tecspread.chalkdigital.com/"
                },
                "staging":{
                    "landingPageHost":"http://52.23.185.245"+":"+8085+"/"
                },
                "other":{
                    "landingPageHost":"http://dtdev.chalkdigital.com"+":"+8082+"/"
                }
            },
            "fbAppId":selectFbAppId({
                "production":{
                    "id": "357113404729281"
                },
                "staging":{
                    "id":"357113404729281"
                },
                "dev":{
                    "id":"357113404729281"
                }
            }),
            "landingPage":"Dynamic",
            "appName":"Dentsu",
            "appId": "Dentsu",
            "title":"tec_spreAD",
            "isHtmlEmable":true,
            "isClientMonitoing":true,
            "isClientEditable":true,
            "isCurrencyEditable":isCurrencyEditable,
            "adminInfoText":"dentsuInfo",
            "invoiceGenration":true,
            "basicTheme":{
                "backgroundColor":"black",
                "fontColor":"white",
                "otherColor":"rgb(255,141,0)",
                "newAdColor":"rgb(255,51,102)",
                "newAdLoading":"rgb(255,51,102)",
                "homeColor":"rgb(255,141,0)",
                "dashboardColor":"rgb(46,167,224)",
                "clientMonitoringColor":"rgb(124,101,255)",
                "myAdsColor":"rgb(143,195,31)",
                "resourcesColor":"rgb(255,241,0)",
                "adminColor":"#C9A063",
                "rangeColor":"#932D45",
                "uploadBack":"#C9CBCA",
                "disableColor":"#CACACA",
                "ActiveButtonColor":"rgb(46,56,289)",
                "errorColor":"yellow",
                "grayColor":"lightgray",
                'budgteActiveTittle':'white',
                'budgteDisabledTittle':'white',
                'iabBorder':'black',
                "disabledButonColor":"#CACACA",
                "activeFishColor":"black",
                "textDisableColor":"gray",
                "borderColor":"black",
                "paginationColor":"white",
                "mediaDesignBorder":"1px solid transparent",
                "remainingTextColor":"white",
                "images":{
                    "checkImage":"images/temp/check.png",
                    "logincheckImage":"images/temp/logincheck.png",
                    "next":"images/next.png",
                    "back":"images/back.png",
                    "save":"images/save.png",
                    "backDisable":"images/bkd.png",
                    "longButton":"images/long-button.png",
                    "longButtonCancel":"images/long-buttonCancel.png",
                    "nextDisable":"images/nextDisable.png",
                    "dashFish":"images/temp/activeArrowDash.png",
                    "clientFish":"images/temp/clientMonitoringFish.png",
                    "radiusPointer":"images/knob1.png",
                    "calenderLeft":"images/leftt.png",
                    "calenderRighr":"images/rightt.png",
                    "uploadImage":"images/upload.png",
                    "uploadCancel":"images/uploadCancel.png",
                    "resethtml":"images/reset.png",
                    "disableresethtml":"images/sreset.png",
                    "leftArrow":"images/leftArrow.png",
                    "activeTarget":"images/1.jpg",
                    "inactiveTarget":"images/2.png",
                    "searchImg":"/images/viewWhite.png",
                    "tabActive":"/images/save.png",
                    "resetImg":"/images/reset.png",
                    "clickToEdit":"/images/temp/editImage.png",
                }
            },
            "navBar":{
                "backgroundColor":"rgb(38, 38, 38)",
                "box-shadow":"1px 1px 1px 1px black",
                "fontColor":"white",
                "images":{
                    "brandLogo":"https://s3.amazonaws.com/cmsportal/dentsu/resources/tecLogo.png",
                    "navMenu":{
                        "newAd":"images/newNav1.png",
                        "home":"images/homeNav1.png",
                        "dashboard":"images/dashNav111.png",
                        "myAds":"images/myadsNav1.png",
                        "resources":"images/resourceNav11.png",
                        "clientMonitoring":"images/clientMonitoring.png",
                        "newAdActive":"images/newNav11.png",
                        "homeActive":"images/homeNav11.png",
                        "dashboardActive":"images/dashNav1.png",
                        "myAdsActive":"images/myadsNav11.png",
                        "resourcesActive":"images/resourceNav1.png",
                        "clientMonitoringActive":"images/clientMonitoringSelected.png",
                        "admin":"images/admin.png",
                        "adminActive":"images/adminActive.png"
                    }
                }
            },
            "login":{
                "images":{
                    "passShow":"images/showPass.png",
                    "passHide":"images/hideShow.png"
                }
            },
            "home":{
                "images":{
                    "homenewAd":"images/newHome.png",
                    "homemyAds":"images/myads1.png",
                    "homeDash":"images/dash1.png"
                }
            },
            "fishBar":{
                "images":{
                    "fish":"images/temp/arrow2.png",
                    "fishActive":"images/temp/activeArrow.png"
                }
            },
            "infoPage":{
                "fontColor":"pink",
                "datePickerBackGround":"#262626",
                "datePickerDay":"lightgrey",
                "datePickerSelectedDay":"black",
                "disabledDateColor":"black"
            }
        },

        "spread":{
            "lpConfig":{
                "production":{
                    "landingPageHost": "https://spread.chalkdigital.com/"
                },
                "staging":{
                    "landingPageHost":"http://52.23.185.245"+":"+8085
                },
                "other":{
                    "landingPageHost":"http://dtdev.chalkdigital.com"+":"+8082+"/"
                }
            },
            "fbAppId":selectFbAppId({
                "production":{
                    "id": "357113404729281"
                },
                "staging":{
                    "id":"357113404729281"
                },
                "dev":{
                    "id":"357113404729281"
                }
            }),
            "appName":"Dentsu",
            "title":"spreAd",
            "isHtmlEmable":true,
            "isClientMonitoing":true,
            "isClientEditable":true,
            "isCurrencyEditable":isCurrencyEditable,
            "adminInfoText":"otherInfo",
            "invoiceGenration":true,
            "basicTheme":{
                "backgroundColor":"black",
                "fontColor":"white",
                "otherColor":"#FE0100",
                "newAdColor":"#CACACA",
                "newAdLoading":"#CACACA",
                "homeColor":"#A0A0A0",
                "dashboardColor":"#CACACA",
                "clientMonitoringColor":"#CACACA",
                "myAdsColor":"#A0A0A0",
                "resourcesColor":"#A0A0A0",
                "adminColor":"#C9A063",
                "rangeColor":"#DBDBD9",
                "uploadBack":"#A0A0A0",
                "disableColor":"#CACACA",
                "ActiveButtonColor":"gray",
                "errorColor":"yellow",
                "grayColor":"lightgray",
                'budgteActiveTittle':'white',
                'budgteDisabledTittle':'white',
                'iabBorder':'black',
                "disabledButonColor":"#CACACA",
                "activeFishColor":"black",
                "textDisableColor":"gray",
                "borderColor":"black",
                "paginationColor":"white",
                "mediaDesignBorder":"1px solid transparent",
                "remainingTextColor":"white",
                "images":{
                    "checkImage":"'images/temp/scheck.png'",
                    "logincheckImage":"'images/temp/slogincheck.png'",
                    "next":"images/snext.png",
                    "back":"images/sback.png",
                    "save":"images/ssave.png",
                    "backDisable":"images/sbkd.png",
                    "longButton":"images/slong-button.png",
                    "longButtonCancel":"images/slong-buttonCancel.png",
                    "nextDisable":"images/snextDisable.png",
                    "dashFish":"images/temp/sactiveArrowDash.png",
                    "clientFish":"images/temp/s_clientMonitoringFish.png",
                    "radiusPointer":"images/sknob1.png",
                    "calenderLeft":"images/sleftt.png",
                    "calenderRight":"images/srightt.png",
                    "uploadImage":"images/supload.png",
                    "uploadCancel":"images/suploadCancel.png",
                    "resethtml":"images/sreset.png",
                    "disableresethtml":"images/sreset.png",
                    "leftArrow":"images/leftArrow1.png",
                    "activeTarget":"images/s1.jpg",
                    "inactiveTarget":"images/s2.png",
                    "searchImg":"/images/viewWhite.png",
                    "tabActive":"/images/ssave.png",
                    "resetImg":"/images/sreset.png",
                    "clickToEdit":"/images/temp/editImage.png",
                }
            },
            "navBar":{
                "backgroundColor":"rgb(38, 38, 38)",
                "box-shadow":"1px 1px 1px 1px black",
                "fontColor":"white",
                "images":{
                    "brandLogo":"images/spreadLogo.jpg",
                    "navMenu":{
                        "newAd":"images/snewNav1.png",
                        "home":"images/shomeNav1.png",
                        "dashboard":"images/sdashNav111.png",
                        "myAds":"images/smyadsNav1.png",
                        "resources":"images/sresourceNav11.png",
                        "clientMonitoring":"images/s_clientMonitoring.png",
                        "newAdActive":"images/snewNav11.png",
                        "homeActive":"images/shomeNav11.png",
                        "dashboardActive":"images/sdashNav1.png",
                        "myAdsActive":"images/smyadsNav11.png",
                        "resourcesActive":"images/sresourceNav1.png",
                        "clientMonitoringActive":"images/s_clientMonitoringSelected.png",
                        "admin":"images/admin.png",
                        "adminActive":"images/adminActive.png"

                    }
                }
            },
            "login":{
                "images":{
                    "passShow":"images/sshowPass.png",
                    "passHide":"images/shideShow.png"
                }
            },
            "home":{
                "images":{
                    "homenewAd":"images/snewHome.png",
                    "homemyAds":"images/smyads1.png",
                    "homeDash":"images/sdash1.png"
                }
            },
            "fishBar":{
                "images":{
                    "fish":"images/temp/sarrow2.png",
                    "fishActive":"images/temp/sactiveArrow.png"
                }
            },
            "infoPage":{
                "fontColor":"pink",
                "datePickerBackGround":"#262626",
                "datePickerDay":"lightgrey",
                "datePickerSelectedDay":"black",
                "disabledDateColor":"black"
            }
        },

        "clientSpread":{
            "lpConfig":{
                "production":{
                    "landingPageHost": "https://clientspread.chalkdigital.com/"
                },
                "staging":{
                    "landingPageHost":"http://52.23.185.245"+":"+8085
                },
                "other":{
                    "landingPageHost":"http://dtdev.chalkdigital.com"+":"+8082+"/"
                }
            },
            "fbAppId":selectFbAppId({
                "production":{
                    "id": "357113404729281"
                },
                "staging":{
                    "id":"357113404729281"
                },
                "dev":{
                    "id":"357113404729281"
                }
            }),
            "landingPage":"Dynamic",
            "appName":"Dentsu",
            "appId":"clientspread",
            "title":"ClientSpread",
            "isHtmlEmable":true,
            "isClientMonitoing":true,
            "isClientEditable":true,
            "isCurrencyEditable":isCurrencyEditable,
            "adminInfoText":"otherInfo",
            "invoiceGenration":true,
            "basicTheme":{
                "backgroundColor":"black",
                "fontColor":"white",
                "otherColor":"#FE0100",
                "newAdColor":"#CACACA",
                "newAdLoading":"#CACACA",
                "homeColor":"#A0A0A0",
                "dashboardColor":"#CACACA",
                "clientMonitoringColor":"#CACACA",
                "myAdsColor":"#A0A0A0",
                "resourcesColor":"#A0A0A0",
                "adminColor":"#C9A063",
                "rangeColor":"#DBDBD9",
                "uploadBack":"#A0A0A0",
                "disableColor":"#CACACA",
                "ActiveButtonColor":"gray",
                "errorColor":"yellow",
                "grayColor":"lightgray",
                'budgteActiveTittle':'white',
                'budgteDisabledTittle':'white',
                'iabBorder':'black',
                "disabledButonColor":"#CACACA",
                "activeFishColor":"black",
                "textDisableColor":"gray",
                "borderColor":"black",
                "paginationColor":"white",
                "mediaDesignBorder":"1px solid transparent",
                "remainingTextColor":"white",

                "images":{
                    "checkImage":"'images/temp/scheck.png'",
                    "logincheckImage":"'images/temp/slogincheck.png'",
                    "next":"images/snext.png",
                    "back":"images/sback.png",
                    "save":"images/ssave.png",
                    "backDisable":"images/sbkd.png",
                    "longButton":"images/slong-button.png",
                    "longButtonCancel":"images/slong-buttonCancel.png",
                    "nextDisable":"images/snextDisable.png",
                    "dashFish":"images/temp/sactiveArrowDash.png",
                    "clientFish":"images/temp/s_clientMonitoringFish.png",
                    "radiusPointer":"images/sknob1.png",
                    "calenderLeft":"images/sleftt.png",
                    "calenderRight":"images/srightt.png",
                    "uploadImage":"images/supload.png",
                    "uploadCancel":"images/suploadCancel.png",
                    "resethtml":"images/sreset.png",
                    "disableresethtml":"images/sreset.png",
                    "leftArrow":"images/leftArrow1.png",
                    "activeTarget":"images/s1.jpg",
                    "inactiveTarget":"images/s2.png",
                    "searchImg":"/images/viewWhite.png",
                    "tabActive":"/images/ssave.png",
                    "resetImg":"/images/sreset.png",
                    "clickToEdit":"/images/temp/editImage.png",
                }
            },
            "navBar":{
                "backgroundColor":"rgb(38, 38, 38)",
                "box-shadow":"1px 1px 1px 1px black",
                "fontColor":"white",
                "images":{
                    "brandLogo":"images/clientLogo.png",
                    "navMenu":{
                        "newAd":"images/snewNav1.png",
                        "home":"images/shomeNav1.png",
                        "dashboard":"images/sdashNav111.png",
                        "myAds":"images/smyadsNav1.png",
                        "resources":"images/sresourceNav11.png",
                        "clientMonitoring":"images/s_clientMonitoring.png",
                        "newAdActive":"images/snewNav11.png",
                        "homeActive":"images/shomeNav11.png",
                        "dashboardActive":"images/sdashNav1.png",
                        "myAdsActive":"images/smyadsNav11.png",
                        "resourcesActive":"images/sresourceNav1.png",
                        "clientMonitoringActive":"images/s_clientMonitoringSelected.png",
                        "admin":"images/admin.png",
                        "adminActive":"images/adminActive.png",


                    }
                }
            },
            "login":{
                "images":{
                    "passShow":"images/sshowPass.png",
                    "passHide":"images/shideShow.png"
                }
            },
            "home":{
                "images":{
                    "homenewAd":"images/snewHome.png",
                    "homemyAds":"images/smyads1.png",
                    "homeDash":"images/sdash1.png"
                }
            },
            "fishBar":{
                "images":{
                    "fish":"images/temp/sarrow2.png",
                    "fishActive":"images/temp/sactiveArrow.png"
                }
            },
            "infoPage":{
                "fontColor":"pink",
                "datePickerBackGround":"#262626",
                "datePickerDay":"lightgrey",
                "datePickerSelectedDay":"black",
                "disabledDateColor":"black"

            }
        },

        "chalkSpread":{
            "lpConfig":{
                "production":{
                    "landingPageHost": "https://chalkspread.chalkdigital.com/"
                },
                "staging":{
                    "landingPageHost":"http://52.23.185.245"+":"+8085
                },
                "other":{
                    "landingPageHost":"http://dtdev.chalkdigital.com"+":"+8082+"/"
                }
            },
            "fbAppId":selectFbAppId({
                "production":{
                    "id": "357113404729281"
                },
                "staging":{
                    "id":"357113404729281"
                },
                "dev":{
                    "id":"357113404729281"
                }
            }),
            "appName":"Dentsu",
            "appId": "Chalk",
            "title":"Chalk Digital",
            "isHtmlEmable":true,
            "isClientMonitoing":true,
            "isClientEditable":true,
            "isCurrencyEditable":isCurrencyEditable,
            "adminInfoText":"otherInfo",
            "invoiceGenration":true,
            "basicTheme":{
                "backgroundColor":"black",
                "fontColor":"white",
                "otherColor":"orange",
                "newAdColor":"#CACACA",
                "newAdLoading":"#CACACA",
                "homeColor":"#A0A0A0",
                "dashboardColor":"#CACACA",
                "clientMonitoringColor":"#CACACA",
                "myAdsColor":"#A0A0A0",
                "resourcesColor":"#A0A0A0",
                "adminColor":"#C9A063",
                "rangeColor":"#DBDBD9",
                "uploadBack":"#A0A0A0",
                "disableColor":"#CACACA",
                "ActiveButtonColor":"gray",
                "errorColor":"yellow",
                "grayColor":"lightgray",
                'budgteActiveTittle':'white',
                'budgteDisabledTittle':'white',
                'iabBorder':'black',
                "disabledButonColor":"#CACACA",
                "activeFishColor":"black",
                "textDisableColor":"gray",
                "borderColor":"black",
                "paginationColor":"white",
                "mediaDesignBorder":"1px solid transparent",
                "remainingTextColor":"white",

                "images":{
                    "checkImage":"'images/temp/scheck.png'",
                    "logincheckImage":"'images/temp/logincheck.png'",
                    "next":"images/snext.png",
                    "back":"images/sback.png",
                    "save":"images/ssave.png",
                    "backDisable":"images/sbkd.png",
                    "longButton":"images/slong-button.png",
                    "longButtonCancel":"images/slong-buttonCancel.png",
                    "nextDisable":"images/snextDisable.png",
                    "dashFish":"images/temp/sactiveArrowDash.png",
                    "clientFish":"images/temp/s_clientMonitoringFish.png",
                    "radiusPointer":"images/sknob1.png",
                    "calenderLeft":"images/sleftt.png",
                    "calenderRight":"images/srightt.png",
                    "uploadImage":"images/supload.png",
                    "uploadCancel":"images/suploadCancel.png",
                    "resethtml":"images/sreset.png",
                    "disableresethtml":"images/sreset.png",
                    "leftArrow":"images/leftArrow1.png",
                    "activeTarget":"images/s1.jpg",
                    "inactiveTarget":"images/s2.png",
                    "searchImg":"/images/viewWhite.png",
                    "tabActive":"/images/ssave.png",
                    "resetImg":"/images/sreset.png",
                    "clickToEdit":"/images/temp/editImage.png",
                }
            },
            "navBar":{
                "backgroundColor":"rgb(38, 38, 38)",
                "box-shadow":"1px 1px 1px 1px black",
                "fontColor":"white",
                "images":{
                    "brandLogo":"https://s3.amazonaws.com/cmsportal/dentsu/resources/spreadLogo.png",
                    "navMenu":{
                        "newAd":"images/snewNav1.png",
                        "home":"images/shomeNav1.png",
                        "dashboard":"images/sdashNav111.png",
                        "myAds":"images/smyadsNav1.png",
                        "resources":"images/sresourceNav11.png",
                        "clientMonitoring":"images/s_clientMonitoring.png",
                        "newAdActive":"images/snewNav11.png",
                        "homeActive":"images/shomeNav11.png",
                        "dashboardActive":"images/sdashNav1.png",
                        "myAdsActive":"images/smyadsNav11.png",
                        "resourcesActive":"images/sresourceNav1.png",
                        "clientMonitoringActive":"images/s_clientMonitoringSelected.png",
                        "admin":"images/admin.png",
                        "adminActive":"images/adminActive.png"

                    }
                }
            },
            "login":{
                "images":{
                    "passShow":"images/showPass.png",
                    "passHide":"images/hideShow.png"
                }
            },
            "home":{
                "images":{
                    "homenewAd":"images/snewHome.png",
                    "homemyAds":"images/smyads1.png",
                    "homeDash":"images/sdash1.png"
                }
            },
            "fishBar":{
                "images":{
                    "fish":"images/temp/sarrow2.png",
                    "fishActive":"images/temp/sactiveArrow.png"
                }
            },
            "infoPage":{
                "fontColor":"pink",
                "datePickerBackGround":"#262626",
                "datePickerDay":"lightgrey",
                "datePickerSelectedDay":"black",
                "disabledDateColor":"black"
            }
        },

        "locAd":{
            "lpConfig":{
                "production":{
                    "landingPageHost": "https://locad.chalkdigital.com/"
                },
                "staging":{
                    "landingPageHost":"http://52.23.185.245"+":"+8085+"/"
                },
                "other":{
                    "landingPageHost":"http://locad-dev.chalkall.com"+":"+8082+"/"
                }
            },
            "fbAppId":selectFbAppId({
                "production":{
                    "id": "357113404729281"
                },
                "staging":{
                    "id":"357113404729281"
                },
                "dev":{
                    "id":"357113404729281"
                }
            }),
            "landingPage":"Dynamic",
            "appName":"Dentsu",
            "appId": "LocAd",
            "title":"LocAd",
            "isHtmlEmable":true,
            "isClientMonitoing":true,
            "isClientEditable":true,
            "isCurrencyEditable":isCurrencyEditable,
            "adminInfoText":"dentsuInfo",
            "invoiceGenration":true,
            "basicTheme":{
                "backgroundColor":"#ffffff",
                "fontColor":" black",
                "otherColor":" #78a5db",
                "newAdColor":"#78A5DB",
                "newAdLoading":"black",
                "homeColor":"white",
                "dashboardColor":"#e67e22",
                "clientMonitoringColor":"rgb(124,101,255)",
                "myAdsColor":"#0fa3b1",
                "resourcesColor":"black",
                "adminColor":"#C9A063",
                "rangeColor":"rgb(155, 195, 244)",
                "uploadBack":"#C9CBCA",
                "disableColor":"#CACACA",
                "ActiveButtonColor":"rgb(46,56,289)",
                "errorColor":"red",
                "grayColor":"gray",
                'budgteActiveTittle':'#78A5DB',
                'budgteDisabledTittle':'lightgray',
                'iabBorder':'#A9ABA8',
                "disabledButonColor":"black",
                "activeFishColor":"white",
                "textDisableColor":"lightgray",
                "borderColor":"lightgray",
                "paginationColor":"black",
                "mediaDesignBorder":"1px solid lightgray",
                "remainingTextColor":"black",
                "images":{
                     "checkImage":"'images/temp/scheck.png'",
                    "logincheckImage":"'images/temp/logincheck.png'",
                    "next":"images/snext.png",
                    "back":"images/sback.png",
                    "save":"images/ssave.png",
                    "backDisable":"images/sbkd.png",
                    "longButton":"images/slong-button.png",
                    "longButtonCancel":"images/nnupload.png",
                    "nextDisable":"images/snextDisable.png",
                    "dashFish":"images/locAd/nav-bar/png/nn_clientMonitoringFish.png",
                    "clientFish":"images/temp/nn_clientMonitoringFish.png",
                    "radiusPointer":"images/sknob1.png",
                    "calenderLeft":"images/locAd/nav-bar/png/nnleft.png",
                    "calenderRight":"images/locAd/nav-bar/png/rightt.png",
                    "uploadImage":"images/supload.png",
                    "uploadCancel":"images/nnupload.png",
                    "resethtml":"images/sreset.png",
                    "disableresethtml":"images/sreset.png",
                    "leftArrow":"images/leftArrow1.png",
                    "activeTarget":"images/nipS3.png",
                    "inactiveTarget":"images/s2.png",
                    "searchImg":"/images/viewGray.png",
                    "tabActive":"/images/nnsave.png",
                    "resetImg":"/images/nreset.png",
                    "clickToEdit":"/images/temp/neditImage.png",
                }
            },
            "navBar":{
                "backgroundColor":"#ffffff",
                "boxShadow":"1px 1px 1px 1px #ccc",
                "fontColor":" #cacaca",
                "images":{
                    "brandLogo":"https://s3.amazonaws.com/cmsportalother/Dentsu/logoImages/LocAD_Logo_190-90.png",
                    "navMenu":{
                        "newAd":"images/locAd/nav-bar/png/newLocAd.png",
                        "newAdActive":"images/locAd/nav-bar/png/new-active.png",

                        "home":"images/locAd/nav-bar/png/home-inactive.png",
                        "homeActive":"images/locAd/nav-bar/png/home-active.png",

                        "dashboard":"images/locAd/nav-bar/png/dashboard-inactive.png",
                        "dashboardActive":"images/locAd/nav-bar/png/dashboard-active.png",

                        "clientMonitoring":"images/locAd/nav-bar/png/monitor-inactive.png",
                        "clientMonitoringActive":"images/locAd/nav-bar/png/monitor-active.png",

                        "myAds":"images/locAd/nav-bar/png/campaigns-inactive.png",
                        "myAdsActive":"images/locAd/nav-bar/png/campaigns-active.png",

                        "resourcesActive":"images/locAd/nav-bar/png/help-active.png",
                        "resources":"images/locAd/nav-bar/png/help-inactive.png",

                        "admin":"images/locAd/nav-bar/png/admin-active.png",
                        "adminActive":"images/locAd/nav-bar/png/admin-active.png"
                    }
                }
            },
            "login":{
                "images":{
                    "passShow":"images/locAd/nav-bar/png/nnshowPass.png",
                    "passHide":"images/locAd/nav-bar/png/nnhidePass.png"
                }
            },
            "home":{
                "images":{
                    "homenewAd":"images/locAd/home/png/new.png",
                    "homemyAds":"images/locAd/home/png/campaigns.png",
                    "homeDash":"images/locAd/home/png/dashboard.png"
                }
            },
            "fishBar":{
                "images":{
                    "fish":"images/temp/sarrow2.png",
                    "fishActive":"images/temp/nnactiveArrow.png"
                }
            },
            "infoPage":{
                "fontColor":"pink",
                "datePickerBackGround":"#cacaca",
                "datePickerDay":"black",
                "datePickerSelectedDay":"white",
                "disabledDateColor":"gray"
            }
        },

        "gridquire":{
            "lpConfig":{
                "production":{
                    "landingPageHost": "https://platform.gridquirelabs.com/"
                },
                "staging":{
                    "landingPageHost":"http://52.23.185.245"+":"+8085+"/"
                },
                "other":{
                    "landingPageHost":"http://gridquire-dev.chalkall.com"+":"+8082+"/"
                }
            },
            "fbAppId":selectFbAppId({
                "production":{
                    "id": "242286592976863"
                },
                "staging":{
                    "id":"242286592976863"
                },
                "dev":{
                    "id":"242286592976863"
                }
            }),
            "landingPage":"Dynamic",
            "appName":"Dentsu",
            "appId": "gridquire",
            "title":"Grid Quire",
            "isHtmlEmable":true,
            "isClientMonitoing":true,
            "isClientEditable":true,
            "isCurrencyEditable":isCurrencyEditable,
            "adminInfoText":"dentsuInfo",
            "invoiceGenration":true,
            "localization":false,
            "labels":"us",
            "campaignTypes":{
                "location":{
                    "budget":50,
                    "target":{
                        "fields":{
                            "country":{},
                            "zip":{
                                "isSuggestive":true
                            },
                            "state":{
                                "isSuggestive":true
                            },
                            "city":{
                                "isSuggestive":true
                            },
                            "street":{}
                        }
                    }
                },
                "audience":{
                    "budget":50,
                    "target":{
                        "fields":{
                            "state":{
                                "isSuggestive":true,
                                "autoComplete":false
                            }
                        }
                    }
                },
                "retargeting":{
                    "budget":50,
                    "target":{
                        "fields":{
                            "state":{
                                "isSuggestive":true,
                                "autoComplete":false
                            }
                        }
                    }
                },
                "poi":{
                    "budget":50,
                    "target": {
                        "fields": {
                            "state": {
                                "isSuggestive": true,
                                "autoComplete": false
                            }
                        }
                    }
                },
                "facebook":{
                    "budget":500,
                    "target":{
                        "fields":{
                            "country":{},
                            "zip":{
                                "isSuggestive":true
                            },
                            "state":{
                                "isSuggestive":true
                            },
                            "city":{
                                "isSuggestive":true
                            },
                            "street":{}
                        }
                    }
                }
            },
            "basicTheme":{
                "backgroundColor":"#ffffff",
                "fontColor":" black",
                "otherColor":" #F6921E",
                "newAdColor":"#1B75BB",
                "newAdLoading":"black",
                "homeColor":"white",
                "dashboardColor":"#e67e22",
                "clientMonitoringColor":"rgb(124,101,255)",
                "myAdsColor":"#0fa3b1",
                "resourcesColor":"black",
                "adminColor":"#C9A063",
                "rangeColor":"rgb(155, 195, 244)",
                "uploadBack":"#C9CBCA",
                "disableColor":"#CACACA",
                "ActiveButtonColor":"#F6921E",
                "errorColor":"red",
                "grayColor":"gray",
                'budgteActiveTittle':'#1B75BB',
                'budgteDisabledTittle':'lightgray',
                'iabBorder':'#A9ABA8',
                "disabledButonColor":"black",
                "activeFishColor":"white",
                "textDisableColor":"lightgray",
                "borderColor":"lightgray",
                "paginationColor":"black",
                "mediaDesignBorder":"1px solid lightgray",
                "remainingTextColor":"black",
                "images":{
                     "checkImage":"'images/temp/scheck.png'",
                    "logincheckImage":"'images/temp/logincheck.png'",
                    "next":"images/snext.png",
                    "back":"images/sback.png",
                    "save":"images/ssave.png",
                    "backDisable":"images/sbkd.png",
                    "longButton":"images/slong-button.png",
                    "longButtonCancel":"images/nnupload.png",
                    "nextDisable":"images/snextDisable.png",
                    "dashFish":"images/locAd/nav-bar/png/nn_clientMonitoringFish.png",
                    "clientFish":"images/temp/nn_clientMonitoringFish.png",
                    "radiusPointer":"images/sknob1.png",
                    "calenderLeft":"images/locAd/nav-bar/png/nnleft.png",
                    "calenderRight":"images/locAd/nav-bar/png/rightt.png",
                    "uploadImage":"images/supload.png",
                    "uploadCancel":"images/nnupload.png",
                    "resethtml":"images/sreset.png",
                    "disableresethtml":"images/sreset.png",
                    "leftArrow":"images/leftArrow1.png",
                    "activeTarget":"images/nipS3.png",
                    "inactiveTarget":"images/s2.png",
                    "searchImg":"/images/viewGray.png",
                    "tabActive":"/images/nnsave.png",
                    "resetImg":"/images/nreset.png",
                    "clickToEdit":"/images/temp/neditImage.png",
                }
            },
            "navBar":{
                "backgroundColor":"#ffffff",
                "boxShadow":"1px 1px 1px 1px #ccc",
                "fontColor":" #cacaca",
                "images":{
                    "brandLogo":"https://cmsportalother.s3.amazonaws.com/Dentsu/logoImages/gridquire1514356936951.png",
                    "navMenu":{
                        "newAd":"images/locAd/nav-bar/png/newLocAd.png",
                        "newAdActive":"images/locAd/nav-bar/png/new-active.png",

                        "home":"images/locAd/nav-bar/png/home-inactive.png",
                        "homeActive":"images/locAd/nav-bar/png/home-active.png",

                        "dashboard":"images/locAd/nav-bar/png/dashboard-inactive.png",
                        "dashboardActive":"images/locAd/nav-bar/png/dashboard-active.png",

                        "clientMonitoring":"images/locAd/nav-bar/png/monitor-inactive.png",
                        "clientMonitoringActive":"images/locAd/nav-bar/png/monitor-active.png",

                        "myAds":"images/locAd/nav-bar/png/campaigns-inactive.png",
                        "myAdsActive":"images/locAd/nav-bar/png/campaigns-active.png",

                        "resourcesActive":"images/locAd/nav-bar/png/help-active.png",
                        "resources":"images/locAd/nav-bar/png/help-inactive.png",

                        "admin":"images/locAd/nav-bar/png/admin-active.png",
                        "adminActive":"images/locAd/nav-bar/png/admin-active.png"
                    }
                }
            },
            "login":{
                "images":{
                    "passShow":"images/showPass.png",
                    "passHide":"images/hideShow.png"
                }
            },
            "home":{
                "images":{
                    "homenewAd":"images/locAd/home/png/new.png",
                    "homemyAds":"images/locAd/home/png/campaigns.png",
                    "homeDash":"images/locAd/home/png/dashboard.png"
                }
            },
            "fishBar":{
                "images":{
                    "fish":"images/temp/sarrow2.png",
                    "fishActive":"images/temp/nnactiveArrow.png"
                }
            },
            "infoPage":{
                "fontColor":"pink",
                "datePickerBackGround":"#cacaca",
                "datePickerDay":"black",
                "datePickerSelectedDay":"white",
                "disabledDateColor":"gray"
            }
        },

        "spread":{
            "lpConfig":{
                "production":{
                    "landingPageHost": "https://spread.chalkdigital.com/"
                },
                "staging":{
                    "landingPageHost":"http://52.23.185.245"+":"+8085
                },
                "other":{
                    "landingPageHost":"http://dtdev.chalkdigital.com"+":"+8082+"/"
                }
            },
            "fbAppId":selectFbAppId({
                "production":{
                    "id": "357113404729281"
                },
                "staging":{
                    "id":"357113404729281"
                },
                "dev":{
                    "id":"357113404729281"
                }
            }),
            "appName":"Dentsu",
            "title":"spreAd",
            "isHtmlEmable":true,
            "isClientMonitoing":true,
            "isClientEditable":true,
            "isCurrencyEditable":isCurrencyEditable,
            "adminInfoText":"otherInfo",
            "invoiceGenration":true,
            "basicTheme":{
                "backgroundColor":"black",
                "fontColor":"white",
                "otherColor":"#FE0100",
                "newAdColor":"#CACACA",
                "newAdLoading":"#CACACA",
                "homeColor":"#A0A0A0",
                "dashboardColor":"#CACACA",
                "clientMonitoringColor":"#CACACA",
                "myAdsColor":"#A0A0A0",
                "resourcesColor":"#A0A0A0",
                "adminColor":"#C9A063",
                "rangeColor":"#DBDBD9",
                "uploadBack":"#A0A0A0",
                "disableColor":"#CACACA",
                "ActiveButtonColor":"gray",
                "errorColor":"yellow",
                "grayColor":"lightgray",
                'budgteActiveTittle':'white',
                'budgteDisabledTittle':'white',
                'iabBorder':'black',
                "disabledButonColor":"#CACACA",
                "activeFishColor":"black",
                "textDisableColor":"gray",
                "borderColor":"black",
                "paginationColor":"black",
                "mediaDesignBorder":"1px solid transparent",
                "remainingTextColor":"white",

                "images":{
                    "checkImage":"'images/temp/scheck.png'",
                    "logincheckImage":"'images/temp/slogincheck.png'",
                    "next":"images/snext.png",
                    "back":"images/sback.png",
                    "save":"images/ssave.png",
                    "backDisable":"images/sbkd.png",
                    "longButton":"images/slong-button.png",
                    "longButtonCancel":"images/slong-buttonCancel.png",
                    "nextDisable":"images/snextDisable.png",
                    "dashFish":"images/temp/sactiveArrowDash.png",
                    "clientFish":"images/temp/s_clientMonitoringFish.png",
                    "radiusPointer":"images/sknob1.png",
                    "calenderLeft":"images/sleftt.png",
                    "calenderRight":"images/srightt.png",
                    "uploadImage":"images/supload.png",
                    "uploadCancel":"images/suploadCancel.png",
                    "resethtml":"images/sreset.png",
                    "disableresethtml":"images/sreset.png",
                    "leftArrow":"images/leftArrow1.png",
                    "activeTarget":"images/s1.jpg",
                    "inactiveTarget":"images/s2.png",
                    "errorColor":"yellow",
                    "searchImg":"/images/viewWhite.png",
                    "tabActive":"/images/ssave.png",
                    "resetImg":"/images/sreset.png",
                    "clickToEdit":"/images/temp/editImage.png",

                }
            },
            "navBar":{
                "backgroundColor":"rgb(38, 38, 38)",
                "fontColor":"white",
                "box-shadow":"1px 1px 1px 1px black",
                "images":{
                    "brandLogo":"images/spreadLogo.jpg",
                    "navMenu":{
                        "newAd":"images/snewNav1.png",
                        "home":"images/shomeNav1.png",
                        "dashboard":"images/sdashNav111.png",
                        "myAds":"images/smyadsNav1.png",
                        "resources":"images/sresourceNav11.png",
                        "clientMonitoring":"images/s_clientMonitoring.png",
                        "newAdActive":"images/snewNav11.png",
                        "homeActive":"images/shomeNav11.png",
                        "dashboardActive":"images/sdashNav1.png",
                        "myAdsActive":"images/smyadsNav11.png",
                        "resourcesActive":"images/sresourceNav1.png",
                        "clientMonitoringActive":"images/s_clientMonitoringSelected.png",
                        "admin":"images/admin.png",
                        "adminActive":"images/adminActive.png"
                    }
                }
            },
            "login":{
                "images":{
                    "passShow":"images/sshowPass.png",
                    "passHide":"images/shideShow.png"
                }
            },
            "home":{
                "images":{
                    "homenewAd":"images/snewHome.png",
                    "homemyAds":"images/smyads1.png",
                    "homeDash":"images/sdash1.png"
                }
            },
            "fishBar":{
                "images":{
                    "fish":"images/temp/sarrow2.png",
                    "fishActive":"images/temp/sactiveArrow.png"
                }
            },
            "infoPage":{
                "fontColor":"pink",
                "datePickerBackGround":"#262626",
                "datePickerDay":"black",
                "datePickerSelectedDay":"white",
                "disabledDateColor":"lightgrey"
            }
        }
    };
    var ConfigData = JSON.stringify(appConfigurations.dentsu);

    var ClientData = JSON.stringify(appConfigurations.clientSpread);

    var locAdTheme = JSON.stringify(appConfigurations.locAd);


    var honda = JSON.parse(ConfigData);
    honda.navBar.images.brandLogo = "https://www.hondacarindia.com/Content/desktop/images/global/home-logo.png";
    honda.appId = "Honda";
    honda.title = "Honda";

    var resolatte = JSON.parse(ConfigData);
    resolatte.navBar.images.brandLogo = "https://s3.amazonaws.com/cmsportal/dentsu/resources/resolLogo.png";
    resolatte.appId = "resol";
    resolatte.title = "resol";

    var resolLive = JSON.parse(ConfigData);
    resolLive.navBar.images.brandLogo = "https://s3.amazonaws.com/cmsportal/dentsu/resources/resolLogo.png";
    resolLive.appId = "Resol Company";
    resolLive.title = "Resol Company";

    var lotus = JSON.parse(ConfigData);
    lotus.navBar.images.brandLogo = "https://s3.amazonaws.com/cmsportal/dentsu/resources/lotosLogo.png";
    lotus.appId = "Lotus";
    lotus.title = "Lotus";

    var GIGA = JSON.parse(ConfigData);
    GIGA.navBar.images.brandLogo = "https://s3.amazonaws.com/cmsportal/dentsu/resources/gigaLogo.png";
    GIGA.appId = "GIGAVISION";
    GIGA.title = "GIGAVISION";

    var ClientSpreadDemo = JSON.parse(ClientData);
    ClientSpreadDemo.navBar.images.brandLogo = "https://s3.amazonaws.com/cmsportal/dentsu/resources/clientLogo.png";
    ClientSpreadDemo.appId = "ClientSpread";
    ClientSpreadDemo.title = "ClientSpread";

    var donmaruLive = JSON.parse(ConfigData);
    donmaruLive.navBar.images.brandLogo = "https://cmsportalother.s3.amazonaws.com/Dentsu/logoImages/Donmaru1496822073182.png";
    donmaruLive.appId = "Donmaru";
    donmaruLive.title = "Donmaru";

    var cci = JSON.parse(ConfigData);
    cci.navBar.images.brandLogo = "https://cmsportalother.s3.amazonaws.com/Dentsu/logoImages/cci1499828291106.png";
    cci.appId = "cci";
    cci.title = "cci";

    var yadoumaru = JSON.parse(locAdTheme);
    yadoumaru.navBar.images.brandLogo = "https://cmsportalother.s3.amazonaws.com/Dentsu/logoImages/Yadoumaru1514131979651.png";
    yadoumaru.appId = "Yadoumaru";
    yadoumaru.title = "Yadoumaru";
    yadoumaru.lpConfig={
        "production":{
            "landingPageHost": "https://aread.chalkdigital.com/"
        },
        "staging":{
            "landingPageHost":"http://52.23.185.245"+":"+8085+"/"
        },
        "other":{
            "landingPageHost":"http://aread-dev.chalkdigital.com"+":"+8082+"/"
        }
    }
    var mantoinfo = JSON.parse(locAdTheme);
    mantoinfo.navBar.images.brandLogo = "https://cmsportalother.s3.amazonaws.com/Dentsu/logoImages/Mantoinfo1517390111681.png";
    mantoinfo.appId = "Mantoinfo";
    mantoinfo.title = "Mantoinfo";
    mantoinfo.lpConfig={
        "production":{
            "landingPageHost": "https://mantuo.chalkdigital.com/"
        },
        "staging":{
            "landingPageHost":"http://52.23.185.245"+":"+8085+"/"
        },
        "other":{
            "landingPageHost":"http://mantuo-dev.chalkdigital.com"+":"+8082+"/"
        }
    }

    var appPath = {
        'dentsu.localhost':appConfigurations.dentsu,
        'locad.localhost':appConfigurations.locAd,
        "honda-dev.chalkdigital.com": honda,
        "resolad-dev.chalkdigital.com":resolatte,
        "resolad.localhost":resolatte,
        "resolad.chalkdigital.com":resolLive,
        "lotus-dev.chalkdigital.com":lotus,
        "gigavision-dev.chalkdigital.com":GIGA,
        'spread.localhost':appConfigurations.spread,
        'chalkspread.localhost':appConfigurations.chalkSpread,
        'localhost':appConfigurations.dentsu,
        'dtdev.chalkdigital.com':appConfigurations.dentsu,
        'tecspread.chalkdigital.com':appConfigurations.dentsu,
        'dentsu.chalkdigital.com':appConfigurations.dentsu,
        'spread.chalkdigital.com':appConfigurations.spread,
        'spreaddev.chalkdigital.com':appConfigurations.spread,
        'chalkspreaddev.chalkdigital.com':appConfigurations.chalkSpread,
        'chalkspread.chalkdigital.com':appConfigurations.chalkSpread,
        'clientspread.chalkdigital.com':ClientSpreadDemo,
        'client.localhost':ClientSpreadDemo,
        'clientspreaddev.chalkdigital.com':ClientSpreadDemo,
        'donmaru.chalkdigital.com':donmaruLive,
        'cci.chalkdigital.com':cci,
        'locad-dev.chalkall.com':appConfigurations.locAd,
        'locad.chalkdigital.com':appConfigurations.locAd,
        'aread.chalkdigital.com':yadoumaru,
        'aread.localhost':yadoumaru,
        'aread-dev.chalkdigital.com':yadoumaru,
        'gridquire.localhost':appConfigurations.gridquire,
        'gridquire.chalkdigital.com':appConfigurations.gridquire,
        'gridquire-dev.chalkall.com':appConfigurations.gridquire,
        'platform.gridquire.com':appConfigurations.gridquire,
        'platform.gridquirelabs.com':appConfigurations.gridquire,
        'mantuo.chalkdigital.com':mantoinfo,
        'mantuo-dev.chalkall.com':mantoinfo

    };
    return {
        appConfigurations: appConfigurations,
        appPath: appPath,
        globalConfiguration: globalConfiguration
    }
}
