define(['angular'], function (angular) {
    'use strict';

    var UtilityServices = angular.module('UtilityServices', []);

    UtilityServices.service('UtilityServices', ['$location','$log','$http','localStorageService','$window',
        function ($location,$log,$http,localStorageService,$window) {
        return {
            isVoid: function(obj){
                switch(typeof(obj)){

                    case "undefined":
                    case "object":
                        for(var x in obj){
                            if(obj.hasOwnProperty(x))
                                return false;
                            else
                                return true;
                        }
                        return true;
                    case "number":
                    case "boolean":
                        return false;
                        break;
                    case "string":
                        if(obj == "")
                            return true;
                        else
                            return false;
                    default:
                        return false;
                }
            },
            findUniqueObject : function(array,keyName){
                var unique = {};
                var distinct = [];
                for( var i in array ){
                    if( typeof(unique[array[i][keyName]]) == "undefined"){
                        if(array[i][keyName] !== undefined && array[i][keyName] !== '' && array[i][keyName] !== null){
                            distinct.push(array[i]);
                        }
                    }
                    unique[array[i][keyName]] = 0;
                }
                return distinct;
            },
            getCurrencySymbol: function(currencyName){
                var currencySymb = {
                    'usd':'$',
                    'thb':'฿',
                    'jpy':'¥'
                }
                return currencySymb[currencyName];
            },
            emailValid: function (email) {


                if(this.isVoid(email)){
                    return false;
                }else{
                    var atpos = email.indexOf("@");
                    var dotpos = email.lastIndexOf(".");
                    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            phoneValid: function (phone) {
                // $log.debug("phn is bfr string",phone)
                
                var phnString=phone+""
                var res = phnString.substring(0, 1);
                // $log.debug("the first char is ",res)
                if(res==="0"){
                    phnString= phnString.substring(1, phnString.length);
                }else {
                    phnString=phnString;
                }
                // $log.debug("phn is ",phnString)
                var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3,6})$/;
                if(this.isVoid(phnString)){
                    return false;
                }else {
                    if ((phnString.match(phoneno))) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
             validateUrl: function (url)
            {

             //    var regexp =  /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
                //var regexp = new RegExp("^http(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$");
                //var regexp =  /^(ftp|http|https):\/\/[^ "]+$/;
                var regexp =  /^((?:http|ftp)s?:\/\/)(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::\d+)?(?:\/?|[\/?]\S+)$/i;

                // var regexp =  /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
                // $log.info("url to validate is :",url);
                if(!regexp.test(url))
                {
                    // $log.debug("A invalid URL");

                    return true;
                }
                else {
                    // $log.debug("A valid URL");
                    return false;
                }

            },
            validUrlwithhttpp: function(url){
                //var regexp =  /^((?:http|ftp)s?:\/\/)(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::\d+)?(?:\/?|[\/?]\S+)$/i;
                var regexp =/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/;
                if(this.isVoid(url)){
                    return false;
                }
                else {
                    if(!regexp.test(url))
                    {
                        return false;
                    }
                    else {

                        return true;
                    }
                }

            },
            validUrlwithhttppLogo: function(url){
                var regexp =  /^((?:http|ftp)s?:\/\/)(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::\d+)?(?:\/?|[\/?]\S+)$/i;
                //var regexp =/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/;
                if(this.isVoid(url)){
                    return false;
                }
                else {
                    if(!regexp.test(url))
                    {
                        return false;
                    }
                    else {

                        return true;
                    }
                }

            },
             createHyperlinkfromText: function (text)
            {
                if(text) {
                    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
                    var text1=text.replace(exp, "<a target='_blank' href='$1'>$1</a>");
                    var exp2 =/(^|[^\/])(www\.[\S]+(\b|$))/gim;
                    var link = text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');
                    var regexp =  /^((?:http|ftp)s?:\/\/)(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::\d+)?(?:\/?|[\/?]\S+)$/i;
                    return link;
                }
            },
            CSVToArray: function( strData, strDelimiter ){
                // Check to see if the delimiter is defined. If not,
                // then default to comma.
                $log.info("in Csv file service csvTo Arry 1");

                strDelimiter = (strDelimiter || ",");
                // Create a regular expression to parse the CSV values.
                var objPattern = new RegExp(
                    (
                        // Delimiters.
                        "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                        // Quoted fields.
                        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                        // Standard fields.
                        "([^\"\\" + strDelimiter + "\\r\\n]*))"
                    ),
                    "gi"
                );
                // Create an array to hold our data. Give the array
                // a default empty first row.
                var arrData = [[]];
                // Create an array to hold our individual pattern
                // matching groups.
                var arrMatches = null;
                // Keep looping over the regular expression matches
                // until we can no longer find a match.
                while (arrMatches = objPattern.exec( strData )){
                    // Get the delimiter that was found.
                    var strMatchedDelimiter = arrMatches[ 1 ];
                    // Check to see if the given delimiter has a length
                    // (is not the start of string) and if it matches
                    // field delimiter. If id does not, then we know
                    // that this delimiter is a row delimiter.
                    if (
                        strMatchedDelimiter.length &&
                        (strMatchedDelimiter != strDelimiter)
                    ){
                        // Since we have reached a new row of data,
                        // add an empty row to our data array.
                        arrData.push( [] );
                    }
                    // Now that we have our delimiter out of the way,
                    // let's check to see which kind of value we
                    // captured (quoted or unquoted).
                    if (arrMatches[ 2 ]){
                        // We found a quoted value. When we capture
                        // this value, unescape any double quotes.
                        var strMatchedValue = arrMatches[ 2 ].replace(
                            new RegExp( "\"\"", "g" ),
                            "\""
                        );
                    } else {
                        // We found a non-quoted value.
                        var strMatchedValue = arrMatches[ 3 ];
                    }
                    // Now that we have our value string, let's add
                    // it to the data array.
                    arrData[ arrData.length - 1 ].push( strMatchedValue.trim() );
                }
                // Return the parsed data.
                var arrayCheckString = '';
                return( arrData.filter(function(v){
                    arrayCheckString = '';
                    v.forEach(function(v){
                        arrayCheckString += v;
                    });
                    return (arrayCheckString.trim() != '');
                }) );
            },
            isSuperUserAcess:function(){
                //return true
                if(localStorageService.get('savedAdAccess')==="true" || localStorageService.get('savedAdAccess')===true){
                    return true
                }else {
                    return false
                }
            },
            getKey :function(val,array){
                for (var key in array) {
                    var this_val = array[key];
                    if(this_val == val){
                        return key;
                        break;
                    }
                }
            },
            getISOCodeForPortal: function(country){ // country(parameter) is the name of country, if country(parameter) is undefined then it will return object {'countryName':'countryCode'} of all countries.
                var isoCodes = {"Afghanistan":"AF","Aland Islands":"AX","Albania":"AL","Algeria":"DZ","American Samoa":"AS","Andorra":"AD","Angola":"AO","Anguilla":"AI","Antarctica":"AQ","Antigua And Barbuda":"AG","Argentina":"AR","Armenia":"AM","Aruba":"AW","Australia":"AU","Austria":"AT","Azerbaijan":"AZ","Bahamas":"BS","Bahrain":"BH","Bangladesh":"BD","Barbados":"BB","Belarus":"BY","Belgium":"BE","Belize":"BZ","Benin":"BJ","Bermuda":"BM","Bhutan":"BT","Bolivia":"BO","Bosnia And Herzegovina":"BA","Botswana":"BW","Bouvet Island":"BV","Brazil":"BR","British Indian Ocean Territory":"IO","Brunei Darussalam":"BN","Bulgaria":"BG","Burkina Faso":"BF","Burundi":"BI","Cambodia":"KH","Cameroon":"CM","Canada":"CA","Cape Verde":"CV","Cayman Islands":"KY","Central African Republic":"CF","Chad":"TD","Chile":"CL","China":"CN","Christmas Island":"CX","Cocos (Keeling) Islands":"CC","Colombia":"CO","Comoros":"KM","Congo":"CG","Congo, Democratic Republic":"CD","Cook Islands":"CK","Costa Rica":"CR","Cote D'Ivoire":"CI","Croatia":"HR","Cuba":"CU","Cyprus":"CY","Czech Republic":"CZ","Denmark":"DK","Djibouti":"DJ","Dominica":"DM","Dominican Republic":"DO","Ecuador":"EC","Egypt":"EG","El Salvador":"SV","Equatorial Guinea":"GQ","Eritrea":"ER","Estonia":"EE","Ethiopia":"ET","Falkland Islands (Malvinas)":"FK","Faroe Islands":"FO","Fiji":"FJ","Finland":"FI","France":"FR","French Guiana":"GF","French Polynesia":"PF","French Southern Territories":"TF","Gabon":"GA","Gambia":"GM","Georgia":"GE","Germany":"DE","Ghana":"GH","Gibraltar":"GI","Greece":"GR","Greenland":"GL","Grenada":"GD","Guadeloupe":"GP","Guam":"GU","Guatemala":"GT","Guernsey":"GG","Guinea":"GN","Guinea-Bissau":"GW","Guyana":"GY","Haiti":"HT","Heard Island & Mcdonald Islands":"HM","Holy See (Vatican City State)":"VA","Honduras":"HN","Hong Kong":"HK","Hungary":"HU","Iceland":"IS","India":"IN","Indonesia":"ID","Iran, Islamic Republic Of":"IR","Iraq":"IQ","Ireland":"IE","Isle Of Man":"IM","Israel":"IL","Italy":"IT","Jamaica":"JM","Japan":"JP","Jersey":"JE","Jordan":"JO","Kazakhstan":"KZ","Kenya":"KE","Kiribati":"KI","Korea":"KR","Kuwait":"KW","Kyrgyzstan":"KG","Lao People's Democratic Republic":"LA","Latvia":"LV","Lebanon":"LB","Lesotho":"LS","Liberia":"LR","Libyan Arab Jamahiriya":"LY","Liechtenstein":"LI","Lithuania":"LT","Luxembourg":"LU","Macao":"MO","Macedonia":"MK","Madagascar":"MG","Malawi":"MW","Malaysia":"MY","Maldives":"MV","Mali":"ML","Malta":"MT","Marshall Islands":"MH","Martinique":"MQ","Mauritania":"MR","Mauritius":"MU","Mayotte":"YT","Mexico":"MX","Micronesia, Federated States Of":"FM","Moldova":"MD","Monaco":"MC","Mongolia":"MN","Montenegro":"ME","Montserrat":"MS","Morocco":"MA","Mozambique":"MZ","Myanmar":"MM","Namibia":"NA","Nauru":"NR","Nepal":"NP","Netherlands":"NL","Netherlands Antilles":"AN","New Caledonia":"NC","New Zealand":"NZ","Nicaragua":"NI","Niger":"NE","Nigeria":"NG","Niue":"NU","Norfolk Island":"NF","Northern Mariana Islands":"MP","Norway":"NO","Oman":"OM","Pakistan":"PK","Palau":"PW","Palestinian Territory, Occupied":"PS","Panama":"PA","Papua New Guinea":"PG","Paraguay":"PY","Peru":"PE","Philippines":"PH","Pitcairn":"PN","Poland":"PL","Portugal":"PT","Puerto Rico":"PR","Qatar":"QA","Reunion":"RE","Romania":"RO","Russian Federation":"RU","Rwanda":"RW","Saint Barthelemy":"BL","Saint Helena":"SH","Saint Kitts And Nevis":"KN","Saint Lucia":"LC","Saint Martin":"MF","Saint Pierre And Miquelon":"PM","Saint Vincent And Grenadines":"VC","Samoa":"WS","San Marino":"SM","Sao Tome And Principe":"ST","Saudi Arabia":"SA","Senegal":"SN","Serbia":"RS","Seychelles":"SC","Sierra Leone":"SL","Singapore":"SG","Slovakia":"SK","Slovenia":"SI","Solomon Islands":"SB","Somalia":"SO","South Africa":"ZA","South Georgia And Sandwich Isl.":"GS","Spain":"ES","Sri Lanka":"LK","Sudan":"SD","Suriname":"SR","Svalbard And Jan Mayen":"SJ","Swaziland":"SZ","Sweden":"SE","Switzerland":"CH","Syrian Arab Republic":"SY","Taiwan":"TW","Tajikistan":"TJ","Tanzania":"TZ","Thailand":"TH","Timor-Leste":"TL","Togo":"TG","Tokelau":"TK","Tonga":"TO","Trinidad And Tobago":"TT","Tunisia":"TN","Turkey":"TR","Turkmenistan":"TM","Turks And Caicos Islands":"TC","Tuvalu":"TV","Uganda":"UG","Ukraine":"UA","United Arab Emirates":"AE","United Kingdom":"GB","United States":"US","United States Outlying Islands":"UM","Uruguay":"UY","Uzbekistan":"UZ","Vanuatu":"VU","Venezuela":"VE","Viet Nam":"VN","Virgin Islands, British":"VG","Virgin Islands, U.S.":"VI","Wallis And Futuna":"WF","Western Sahara":"EH","Yemen":"YE","Zambia":"ZM","Zimbabwe":"ZW"};
                if( !this.isVoid(country)&& country.length === 2) {
                    return this.getKey(country,isoCodes);
                }else{
                    if (!this.isVoid(country)) {
                        if (isoCodes.hasOwnProperty(country)) {
                            return isoCodes[country];
                        } else {
                            return country;
                        }
                    } else {
                        return isoCodes;
                    }
                }
            },
            getISOCode: function(country){ // country(parameter) is the name of country, if country(parameter) is undefined then it will return object {'countryName':'countryCode'} of all countries.
                var isoCodes = {"Afghanistan":"AF","Aland Islands":"AX","Albania":"AL","Algeria":"DZ","American Samoa":"AS","Andorra":"AD","Angola":"AO","Anguilla":"AI","Antarctica":"AQ","Antigua And Barbuda":"AG","Argentina":"AR","Armenia":"AM","Aruba":"AW","Australia":"AU","Austria":"AT","Azerbaijan":"AZ","Bahamas":"BS","Bahrain":"BH","Bangladesh":"BD","Barbados":"BB","Belarus":"BY","Belgium":"BE","Belize":"BZ","Benin":"BJ","Bermuda":"BM","Bhutan":"BT","Bolivia":"BO","Bosnia And Herzegovina":"BA","Botswana":"BW","Bouvet Island":"BV","Brazil":"BR","British Indian Ocean Territory":"IO","Brunei Darussalam":"BN","Bulgaria":"BG","Burkina Faso":"BF","Burundi":"BI","Cambodia":"KH","Cameroon":"CM","Canada":"CA","Cape Verde":"CV","Cayman Islands":"KY","Central African Republic":"CF","Chad":"TD","Chile":"CL","China":"CN","Christmas Island":"CX","Cocos (Keeling) Islands":"CC","Colombia":"CO","Comoros":"KM","Congo":"CG","Congo, Democratic Republic":"CD","Cook Islands":"CK","Costa Rica":"CR","Cote D'Ivoire":"CI","Croatia":"HR","Cuba":"CU","Cyprus":"CY","Czech Republic":"CZ","Denmark":"DK","Djibouti":"DJ","Dominica":"DM","Dominican Republic":"DO","Ecuador":"EC","Egypt":"EG","El Salvador":"SV","Equatorial Guinea":"GQ","Eritrea":"ER","Estonia":"EE","Ethiopia":"ET","Falkland Islands (Malvinas)":"FK","Faroe Islands":"FO","Fiji":"FJ","Finland":"FI","France":"FR","French Guiana":"GF","French Polynesia":"PF","French Southern Territories":"TF","Gabon":"GA","Gambia":"GM","Georgia":"GE","Germany":"DE","Ghana":"GH","Gibraltar":"GI","Greece":"GR","Greenland":"GL","Grenada":"GD","Guadeloupe":"GP","Guam":"GU","Guatemala":"GT","Guernsey":"GG","Guinea":"GN","Guinea-Bissau":"GW","Guyana":"GY","Haiti":"HT","Heard Island & Mcdonald Islands":"HM","Holy See (Vatican City State)":"VA","Honduras":"HN","Hong Kong":"HK","Hungary":"HU","Iceland":"IS","India":"IN","Indonesia":"ID","Iran, Islamic Republic Of":"IR","Iraq":"IQ","Ireland":"IE","Isle Of Man":"IM","Israel":"IL","Italy":"IT","Jamaica":"JM","Japan":"JP","Jersey":"JE","Jordan":"JO","Kazakhstan":"KZ","Kenya":"KE","Kiribati":"KI","Korea":"KR","Kuwait":"KW","Kyrgyzstan":"KG","Lao People's Democratic Republic":"LA","Latvia":"LV","Lebanon":"LB","Lesotho":"LS","Liberia":"LR","Libyan Arab Jamahiriya":"LY","Liechtenstein":"LI","Lithuania":"LT","Luxembourg":"LU","Macao":"MO","Macedonia":"MK","Madagascar":"MG","Malawi":"MW","Malaysia":"MY","Maldives":"MV","Mali":"ML","Malta":"MT","Marshall Islands":"MH","Martinique":"MQ","Mauritania":"MR","Mauritius":"MU","Mayotte":"YT","Mexico":"MX","Micronesia, Federated States Of":"FM","Moldova":"MD","Monaco":"MC","Mongolia":"MN","Montenegro":"ME","Montserrat":"MS","Morocco":"MA","Mozambique":"MZ","Myanmar":"MM","Namibia":"NA","Nauru":"NR","Nepal":"NP","Netherlands":"NL","Netherlands Antilles":"AN","New Caledonia":"NC","New Zealand":"NZ","Nicaragua":"NI","Niger":"NE","Nigeria":"NG","Niue":"NU","Norfolk Island":"NF","Northern Mariana Islands":"MP","Norway":"NO","Oman":"OM","Pakistan":"PK","Palau":"PW","Palestinian Territory, Occupied":"PS","Panama":"PA","Papua New Guinea":"PG","Paraguay":"PY","Peru":"PE","Philippines":"PH","Pitcairn":"PN","Poland":"PL","Portugal":"PT","Puerto Rico":"PR","Qatar":"QA","Reunion":"RE","Romania":"RO","Russian Federation":"RU","Rwanda":"RW","Saint Barthelemy":"BL","Saint Helena":"SH","Saint Kitts And Nevis":"KN","Saint Lucia":"LC","Saint Martin":"MF","Saint Pierre And Miquelon":"PM","Saint Vincent And Grenadines":"VC","Samoa":"WS","San Marino":"SM","Sao Tome And Principe":"ST","Saudi Arabia":"SA","Senegal":"SN","Serbia":"RS","Seychelles":"SC","Sierra Leone":"SL","Singapore":"SG","Slovakia":"SK","Slovenia":"SI","Solomon Islands":"SB","Somalia":"SO","South Africa":"ZA","South Georgia And Sandwich Isl.":"GS","Spain":"ES","Sri Lanka":"LK","Sudan":"SD","Suriname":"SR","Svalbard And Jan Mayen":"SJ","Swaziland":"SZ","Sweden":"SE","Switzerland":"CH","Syrian Arab Republic":"SY","Taiwan":"TW","Tajikistan":"TJ","Tanzania":"TZ","Thailand":"TH","Timor-Leste":"TL","Togo":"TG","Tokelau":"TK","Tonga":"TO","Trinidad And Tobago":"TT","Tunisia":"TN","Turkey":"TR","Turkmenistan":"TM","Turks And Caicos Islands":"TC","Tuvalu":"TV","Uganda":"UG","Ukraine":"UA","United Arab Emirates":"AE","United Kingdom":"GB","United States":"US","United States of America":"US","United States Outlying Islands":"UM","Uruguay":"UY","Uzbekistan":"UZ","Vanuatu":"VU","Venezuela":"VE","Viet Nam":"VN","Virgin Islands, British":"VG","Virgin Islands, U.S.":"VI","Wallis And Futuna":"WF","Western Sahara":"EH","Yemen":"YE","Zambia":"ZM","Zimbabwe":"ZW"};
                if(country != undefined) {
                    if (isoCodes.hasOwnProperty(country)) {
                        return isoCodes[country];
                    } else {
                        return country;
                    }
                }else{
                    return isoCodes;
                }
            },
            sort_by : function(field, reverse, primer){

                var key = primer ?
                    function(x) {return primer(x[field])} :
                    function(x) {return x[field]};

                reverse = !reverse ? 1 : -1;

                return function (a, b) {
                    return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
                }
            },
            sortJson: function(json,by){
                return json.sort(this.sort_by(by, false, function(a){return a.toUpperCase()}));
            },
            sortJsonNumber: function(json,by){
                return json.sort(this.sort_by(by, false, function(a){return a}));
            },
            onlyEnlishAndNumber:function(string){
                if(this.isVoid(string)){
                    return false;
                }
                else{
                   var stringType=/^[a-zA-Z0-9()\s]*$/
                    if (string.match(stringType)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            noUrl:function(string){
                if(this.isVoid(string)){
                    return false;
                }
                else{
                   var stringType=/^[a-zA-Z0-9]*$/
                    if (string.match(stringType)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            formatTiers:function(tiers){
                $log.debug("tiers are ",tiers);
                if(!this.isVoid(tiers)){
                   for(var u=0;u<tiers.length;u++){
                       if(typeof tiers[u].tier==="string"){
                           tiers[u]["portalName"]=tiers[u].name;
                           tiers[u].name=tiers[u].name+ " (Tier-"+tiers[u].tier+")"
                       }
                       else {
                           tiers[u]["portalName"]=tiers[u].name;
                           tiers[u].name=tiers[u].name+ " (Tier-"+tiers[u].tier.tier+")"
                       }
                   }
                }
                return tiers
            },
            excludeFilters:function(type,values){
                var dataFull={
                    "os":["iOS","Android","O","X"],
                    "age":["0","1","2","3","4","5","6","7","X"],
                    "language":["en","ja","zh","zh-hk","zh-tw","th","X"]
                }
                var data=dataFull[type];
                for(var e=0;e<values.length;e++){
                    if(data.indexOf(values[e])!==-1){
                        data.splice(data.indexOf(values[e]),1)
                    }
                }
                var unique = data.filter(function(elem, index, self) {
                    return index == self.indexOf(elem);
                });
                return unique
            },
            excludeFiltersUs:function(type,values){
                var dataFull={
                    "os":["iOS","Android","O","X"],
                    "age":["0","1","2","3","4","5","6","7","X"],
                    "language":["en","es","fr","X"]
                }
                var data=dataFull[type];
                for(var e=0;e<values.length;e++){
                    if(data.indexOf(values[e])!==-1){
                        data.splice(data.indexOf(values[e]),1)
                    }
                }
                var unique = data.filter(function(elem, index, self) {
                    return index == self.indexOf(elem);
                });
                return unique
            },
            excludeFiltersForMyAds:function(type,values){
                var data=type==="os"?["iOS","Android","O"]:type==="age"?["0","1","2","3","4","5","6","7"]:"";
                $log.debug("the type is ,",typeof(values))
                $log.debug("the values is ,",this.isVoid(values))
                $log.debug("the values is ,",type)


                if(typeof(values)==="string" || this.isVoid(values)){
                    return data
                }
                for(var e=0;e<values.length;e++){
                    if(data.indexOf(values[e])!==-1){
                        data.splice(data.indexOf(values[e]),1)
                    }
                }
                var unique = data.filter(function(elem, index, self) {
                    return index == self.indexOf(elem);
                });
                if(unique.indexOf("X")!==-1)
                {
                    unique.splice(unique.indexOf("X"),1);
                }
                return unique
            },
            excludeFiltersCodes:function(type,values){
                var dataFull={
                    "os":["iOS","Android","Others","X"],
                    "age":["0","1","2","3","4","5","6","7","X"],
                    "language":["en","ja","zh","zh-hk","zh-tw","th","X"]
                }
                var data=dataFull[type];
                for(var e=0;e<values.length;e++){
                    if(data.indexOf(values[e])!==-1){
                        data.splice(data.indexOf(values[e]),1)
                    }
                }
                var unique = data.filter(function(elem, index, self) {
                    return index == self.indexOf(elem);
                });
                return unique
            },
            swapKeyValue : function(json){
                var ret = {};
                for(var key in json){
                    ret[json[key]] = key;
                }
                return ret;
            },
            getIndexOfArryOfJsonByValue:function (array,keyJson,value) {
                console.log(array,keyJson,value)
                var index=-1
                index = array.findIndex(function(item, i){
                    return item[keyJson] === value
                });
                return index

            },
            getCountryByISOCode: function(isoCode){
                var isoCodes = {"Afghanistan":"AF","Aland Islands":"AX","Albania":"AL","Algeria":"DZ","American Samoa":"AS","Andorra":"AD","Angola":"AO","Anguilla":"AI","Antarctica":"AQ","Antigua And Barbuda":"AG","Argentina":"AR","Armenia":"AM","Aruba":"AW","Australia":"AU","Austria":"AT","Azerbaijan":"AZ","Bahamas":"BS","Bahrain":"BH","Bangladesh":"BD","Barbados":"BB","Belarus":"BY","Belgium":"BE","Belize":"BZ","Benin":"BJ","Bermuda":"BM","Bhutan":"BT","Bolivia":"BO","Bosnia And Herzegovina":"BA","Botswana":"BW","Bouvet Island":"BV","Brazil":"BR","British Indian Ocean Territory":"IO","Brunei Darussalam":"BN","Bulgaria":"BG","Burkina Faso":"BF","Burundi":"BI","Cambodia":"KH","Cameroon":"CM","Canada":"CA","Cape Verde":"CV","Cayman Islands":"KY","Central African Republic":"CF","Chad":"TD","Chile":"CL","China":"CN","Christmas Island":"CX","Cocos (Keeling) Islands":"CC","Colombia":"CO","Comoros":"KM","Congo":"CG","Congo, Democratic Republic":"CD","Cook Islands":"CK","Costa Rica":"CR","Cote D'Ivoire":"CI","Croatia":"HR","Cuba":"CU","Cyprus":"CY","Czech Republic":"CZ","Denmark":"DK","Djibouti":"DJ","Dominica":"DM","Dominican Republic":"DO","Ecuador":"EC","Egypt":"EG","El Salvador":"SV","Equatorial Guinea":"GQ","Eritrea":"ER","Estonia":"EE","Ethiopia":"ET","Falkland Islands (Malvinas)":"FK","Faroe Islands":"FO","Fiji":"FJ","Finland":"FI","France":"FR","French Guiana":"GF","French Polynesia":"PF","French Southern Territories":"TF","Gabon":"GA","Gambia":"GM","Georgia":"GE","Germany":"DE","Ghana":"GH","Gibraltar":"GI","Greece":"GR","Greenland":"GL","Grenada":"GD","Guadeloupe":"GP","Guam":"GU","Guatemala":"GT","Guernsey":"GG","Guinea":"GN","Guinea-Bissau":"GW","Guyana":"GY","Haiti":"HT","Heard Island & Mcdonald Islands":"HM","Holy See (Vatican City State)":"VA","Honduras":"HN","Hong Kong":"HK","Hungary":"HU","Iceland":"IS","India":"IN","Indonesia":"ID","Iran, Islamic Republic Of":"IR","Iraq":"IQ","Ireland":"IE","Isle Of Man":"IM","Israel":"IL","Italy":"IT","Jamaica":"JM","Japan":"JP","Jersey":"JE","Jordan":"JO","Kazakhstan":"KZ","Kenya":"KE","Kiribati":"KI","Korea":"KR","Kuwait":"KW","Kyrgyzstan":"KG","Lao People's Democratic Republic":"LA","Latvia":"LV","Lebanon":"LB","Lesotho":"LS","Liberia":"LR","Libyan Arab Jamahiriya":"LY","Liechtenstein":"LI","Lithuania":"LT","Luxembourg":"LU","Macao":"MO","Macedonia":"MK","Madagascar":"MG","Malawi":"MW","Malaysia":"MY","Maldives":"MV","Mali":"ML","Malta":"MT","Marshall Islands":"MH","Martinique":"MQ","Mauritania":"MR","Mauritius":"MU","Mayotte":"YT","Mexico":"MX","Micronesia, Federated States Of":"FM","Moldova":"MD","Monaco":"MC","Mongolia":"MN","Montenegro":"ME","Montserrat":"MS","Morocco":"MA","Mozambique":"MZ","Myanmar":"MM","Namibia":"NA","Nauru":"NR","Nepal":"NP","Netherlands":"NL","Netherlands Antilles":"AN","New Caledonia":"NC","New Zealand":"NZ","Nicaragua":"NI","Niger":"NE","Nigeria":"NG","Niue":"NU","Norfolk Island":"NF","Northern Mariana Islands":"MP","Norway":"NO","Oman":"OM","Pakistan":"PK","Palau":"PW","Palestinian Territory, Occupied":"PS","Panama":"PA","Papua New Guinea":"PG","Paraguay":"PY","Peru":"PE","Philippines":"PH","Pitcairn":"PN","Poland":"PL","Portugal":"PT","Puerto Rico":"PR","Qatar":"QA","Reunion":"RE","Romania":"RO","Russian Federation":"RU","Rwanda":"RW","Saint Barthelemy":"BL","Saint Helena":"SH","Saint Kitts And Nevis":"KN","Saint Lucia":"LC","Saint Martin":"MF","Saint Pierre And Miquelon":"PM","Saint Vincent And Grenadines":"VC","Samoa":"WS","San Marino":"SM","Sao Tome And Principe":"ST","Saudi Arabia":"SA","Senegal":"SN","Serbia":"RS","Seychelles":"SC","Sierra Leone":"SL","Singapore":"SG","Slovakia":"SK","Slovenia":"SI","Solomon Islands":"SB","Somalia":"SO","South Africa":"ZA","South Georgia And Sandwich Isl.":"GS","Spain":"ES","Sri Lanka":"LK","Sudan":"SD","Suriname":"SR","Svalbard And Jan Mayen":"SJ","Swaziland":"SZ","Sweden":"SE","Switzerland":"CH","Syrian Arab Republic":"SY","Taiwan":"TW","Tajikistan":"TJ","Tanzania":"TZ","Thailand":"TH","Timor-Leste":"TL","Togo":"TG","Tokelau":"TK","Tonga":"TO","Trinidad And Tobago":"TT","Tunisia":"TN","Turkey":"TR","Turkmenistan":"TM","Turks And Caicos Islands":"TC","Tuvalu":"TV","Uganda":"UG","Ukraine":"UA","United Arab Emirates":"AE","United Kingdom":"GB","United States":"US","United States Outlying Islands":"UM","Uruguay":"UY","Uzbekistan":"UZ","Vanuatu":"VU","Venezuela":"VE","Viet Nam":"VN","Virgin Islands, British":"VG","Virgin Islands, U.S.":"VI","Wallis And Futuna":"WF","Western Sahara":"EH","Yemen":"YE","Zambia":"ZM","Zimbabwe":"ZW"};
                var countrys= this.swapKeyValue(isoCodes)
                if(isoCode != undefined) {
                    if (countrys.hasOwnProperty(isoCode)) {
                        return countrys[isoCode];
                    } else {
                        return isoCode;
                    }
                }else{
                    return countrys;
                }
            },
            getKeyByValue: function(object, value) {
                return Object.keys(object).find(key => object[key].toLowerCase() === value);
            },
            getStateCodeAbbrivation: function(country, keyOrValue){
                var USA_STATE_LIST_DATA = {"AL": "Alabama", "AK": "Alaska", "AS": "American Samoa", "AZ": "Arizona", "AR": "Arkansas", "CA": "California", "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "DC": "District Of Columbia", "FM": "Federated States Of Micronesia", "FL": "Florida", "GA": "Georgia", "GU": "Guam", "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MH": "Marshall Islands", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "MP": "Northern Mariana Islands", "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon", "PW": "Palau", "PA": "Pennsylvania", "PR": "Puerto Rico", "RI": "Rhode Island", "SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VI": "Virgin Islands", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming"};
                var CANADA_STATE_LIST = {"AB": "Alberta", "BC": "British Columbia", "MB": "Manitoba", "NB": "New Brunswick", "NL": "Newfoundland and Labrador", "NS": "Nova Scotia", "NT": "Northwest Territories", "NU": "Nunavut", "ON": "Ontario", "PE": "Prince Edward Island", "QC": "Quebec", "SK": "Saskatchewen", "YT": "Yukon"};
                var stateList=""
                if('us' === country.toLowerCase() || 'united states' === country.toLowerCase()){
                    var stateList =USA_STATE_LIST_DATA;
                }
                if('ca' === country.toLowerCase() || 'canada' === country.toLowerCase()){
                    var stateList =CANADA_STATE_LIST;
                }
                if(country.toLowerCase()!=='jp'){
                    if(keyOrValue.length === 2){
                        return stateList[keyOrValue.toUpperCase()];
                    }else{
                        var a = this.getKeyByValue(stateList, keyOrValue.toLowerCase());
                        return this.isVoid(a) ? keyOrValue : a.toLowerCase();
                    }
                }
                else{
                    return keyOrValue;
                }
            },
            changeIndexOfArrayElement:function (array, fromIndex, toIndex) {
                    var element = array[fromIndex];
                    array.splice(fromIndex, 1);
                    array.splice(toIndex, 0, element);
                    return array
            },
            getKeysByValue:function(json,value){
                var keys=Object.keys(json);
                var arr=[];
                if(!this.isVoid(json) && keys.length>0){
                    keys.map(function(v){
                        if(json[v]===value){
                            arr.push(v)
                        }
                    });
                }
                return arr;
            },
            getFilterdJsonByValue:function(json,key,semiKey,value){
                $log.debug("the json was",json)
                $log.debug("the key was",key)
                $log.debug("the jvaluewas",value)
                var jsonFilter = json.filter(function (a) {
                    return a[key][semiKey] === value;
                });
                $log.debug("returnable json is ",jsonFilter)
                return jsonFilter

            },
            setCookie:function (cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires="+d.toUTCString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            },
            getCookie:function (cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for(var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            },
            getFilterdJsonByValueWithoutSemiKey:function(json,key,value){
                $log.debug("the json was",json)
                $log.debug("the key was",key)
                $log.debug("the jvaluewas",value)
                var jsonFilter = json.filter(function (a) {
                    return a[key] === value;
                });
                $log.debug("returnable json is ",jsonFilter)
                return jsonFilter

            },
            isCurrencyEditableFlag : function(){
                var configFile = localStorageService.get('configurations');
                return configFile.isCurrencyEditable
            },
            getFbAppId : function(){
                // var fbAppId = localStorageService.get('fbAppId');
                var configFile = localStorageService.get('configurations');
                if(!this.isVoid(configFile.fbAppId)){
                    return configFile.fbAppId
                }
                else {
                    return fbAppId
                }
            },
            getAvails : function(params,success,fail){
                $http({ method: 'POST',
                    url:'/api/avails',
                    data: params
                }).
                then(success,fail)
                //$log.debug("the params for avails are--******",params)
            },
            base64Image : function (ImageDataArray,base64ImageSuccess,base64Fail){
                $http({method: 'POST', url: '/api/base64ToImg', data: ImageDataArray, headers:{"Content-Type":"application/json"}}).
                    then(base64ImageSuccess, base64Fail);

            },
            clearDataForNewAd : function(){
                localStorageService.remove('newInfoData');
                localStorageService.remove('newTargetData');
                localStorageService.remove('newBudgetData');
                localStorageService.remove('newBannerDesignData');
                localStorageService.remove('newLandingPageData');
                localStorageService.remove('newSummaryData');
                localStorageService.remove('bigBannerImgUrl');
                localStorageService.remove('smallBannerImgUrl');
                localStorageService.remove('editAd');
                localStorageService.remove('U_id');
                localStorageService.remove('editForApproval');
                localStorageService.remove('pulishAdId');
                // localStorageService.remove('clientSaved');
                //localStorageService.remove('executeHtml2Canvas');
                localStorageService.remove('supervisorMobile');
                return ;
            },
            detectBrowser:function(){
                var userAgent = $window.navigator.userAgent;
                var browsers = {iexp : /.net/i,chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /internet explorer/i, edge:/Edge/i};
                var agents = [];
                for(var key in browsers) {
                    if (browsers[key].test(userAgent)) {
                        agents.push(key);
                    }
                };
                if(agents.indexOf('edge') < 0)
                    return agents[0];
                else
                    return 'edge';
                return 'unknown';
            },
            get_browserVersion: function (){
                var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                if(/trident/i.test(M[1])){
                    tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
                    return (tem[1]||'');
                }
                if(M[1]==='Chrome'){
                    tem=ua.match(/\bOPR\/(\d+)/)
                    if(tem!=null)   {return tem[1]}
                }
                M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
                if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
                return  M[1]


            },
            getColorCodes:function(){
                var configFile = localStorageService.get('configurations');
                //$log.info("configuration file in utility service is color function",configFile)
                var  basicBackground="black";
                var  basicFontColor="white";
                var  basicOtherColor="orange";
                var newAdColor="rgb(255,51,102)";
                var homeColor="rgb(255,141,0)";
                var dashboardColor="rgb(46,167,224)";
                var clientMonitoringColor="rgb(124,101,255)";
                var myAdsColor="rgb(143,195,31)";
                var resourcesColor="rgb(255,241,0)";
                var infoPageBackground=basicBackground;
                var infoPageFontColor=basicFontColor;
                var infoPageOtherColor=basicOtherColor;
                var navBarBackground=basicBackground;
                var navBarFontColor=basicFontColor;
                var navBarOtherColor=basicOtherColor;
                var navBarShadow ="1px 1px 1px 1px black";
                var rangeColor="#DBDBD9";
                var uploadBack="#C9CBCA";
                var disableColor="#ffffff";
                var adminColor="#C9A063";
                var datePickerBackGround="#262626";
                var datePickerDay = "gray";
                var datePickerSelectedDay="black";
                var errorColor="yellow";
                var disabledDateColor ="black";
                var newAdLoading = "rgb(255,51,102)";
                var grayColor = "gray";
                var budgteActiveTittle = 'white';
                var budgteDisabledTittle  = 'white';
                var iabBorder = "black";
                var disabledButonColor = "#CACACA";
                var activeFishColor = "black";
                var textDisableColor ="gray";
                var borderColor = "black";
                var paginationColor = "white";
                var mediaDesignBorder = "1px solid rgba(0, 0, 0, 0.4)";
                var remainingTextColor= "yellow"
                var fontColor= "black"

                if(!this.isVoid(configFile)){
                    if(!this.isVoid(configFile.basicTheme))
                    {
                        basicBackground=!this.isVoid(configFile.basicTheme.backgroundColor)?configFile.basicTheme.backgroundColor:basicBackground;
                        basicFontColor=!this.isVoid(configFile.basicTheme.fontColor)?configFile.basicTheme.fontColor:basicFontColor;
                        basicOtherColor=!this.isVoid(configFile.basicTheme.otherColor)?configFile.basicTheme.otherColor:basicOtherColor;
                        newAdColor=!this.isVoid(configFile.basicTheme.newAdColor)?configFile.basicTheme.newAdColor:newAdColor;
                        newAdLoading=!this.isVoid(configFile.basicTheme.newAdLoading)?configFile.basicTheme.newAdLoading:newAdLoading;
                        homeColor=!this.isVoid(configFile.basicTheme.homeColor)?configFile.basicTheme.homeColor:homeColor;
                        dashboardColor=!this.isVoid(configFile.basicTheme.dashboardColor)?configFile.basicTheme.dashboardColor:dashboardColor;
                        clientMonitoringColor=!this.isVoid(configFile.basicTheme.clientMonitoringColor)?configFile.basicTheme.clientMonitoringColor:clientMonitoringColor;
                        myAdsColor=!this.isVoid(configFile.basicTheme.myAdsColor)?configFile.basicTheme.myAdsColor:myAdsColor;
                        resourcesColor=!this.isVoid(configFile.basicTheme.resourcesColor)?configFile.basicTheme.resourcesColor:resourcesColor;
                        rangeColor=!this.isVoid(configFile.basicTheme.rangeColor)?configFile.basicTheme.rangeColor:rangeColor;
                        uploadBack=!this.isVoid(configFile.basicTheme.uploadBack)?configFile.basicTheme.uploadBack:uploadBack;
                        disableColor=!this.isVoid(configFile.basicTheme.disableColor)?configFile.basicTheme.disableColor:disableColor;
                        adminColor=!this.isVoid(configFile.basicTheme.adminColor)?configFile.basicTheme.adminColor:adminColor;
                        errorColor=!this.isVoid(configFile.basicTheme.errorColor)?configFile.basicTheme.errorColor:errorColor;
                        grayColor=!this.isVoid(configFile.basicTheme.grayColor)?configFile.basicTheme.grayColor:grayColor;
                        budgteActiveTittle =!this.isVoid(configFile.basicTheme.budgteActiveTittle)?configFile.basicTheme.budgteActiveTittle:budgteActiveTittle;
                        budgteDisabledTittle  =!this.isVoid(configFile.basicTheme.budgteDisabledTittle)?configFile.basicTheme.budgteDisabledTittle:budgteDisabledTittle;
                        iabBorder  =!this.isVoid(configFile.basicTheme.iabBorder)?configFile.basicTheme.iabBorder:iabBorder;
                        disabledButonColor  =!this.isVoid(configFile.basicTheme.disabledButonColor)?configFile.basicTheme.disabledButonColor:disabledButonColor;
                        activeFishColor  =!this.isVoid(configFile.basicTheme.activeFishColor)?configFile.basicTheme.activeFishColor:activeFishColor;
                        textDisableColor  =!this.isVoid(configFile.basicTheme.textDisableColor)?configFile.basicTheme.textDisableColor:textDisableColor;
                        borderColor  =!this.isVoid(configFile.basicTheme.borderColor)?configFile.basicTheme.borderColor:borderColor;
                        paginationColor  =!this.isVoid(configFile.basicTheme.paginationColor)?configFile.basicTheme.paginationColor:paginationColor;
                        mediaDesignBorder  =!this.isVoid(configFile.basicTheme.mediaDesignBorder)?configFile.basicTheme.mediaDesignBorder:mediaDesignBorder;
                        remainingTextColor  =!this.isVoid(configFile.basicTheme.remainingTextColor)?configFile.basicTheme.remainingTextColor:remainingTextColor;
                        fontColor  =!this.isVoid(configFile.basicTheme.fontColor)?configFile.basicTheme.fontColor:fontColor;

                    }
                    if(!this.isVoid(configFile.infoPage))
                    {
                        console.log("configFile.infoPage.datePickerBackGround",configFile.infoPage.datePickerBackGround);
                        infoPageBackground=!this.isVoid(configFile.infoPage.backgroundColor)?configFile.infoPage.backgroundColor:basicBackground;
                        infoPageFontColor=!this.isVoid(configFile.infoPage.fontColor)?configFile.infoPage.fontColor:basicFontColor;
                        infoPageOtherColor=!this.isVoid(configFile.infoPage.otherColor)?configFile.infoPage.otherColor:basicOtherColor;
                        datePickerBackGround = !this.isVoid(configFile.infoPage.datePickerBackGround)?configFile.infoPage.datePickerBackGround:datePickerBackGround;
                        datePickerDay = !this.isVoid(configFile.infoPage.datePickerDay)?configFile.infoPage.datePickerDay:datePickerDay;
                        datePickerSelectedDay = !this.isVoid(configFile.infoPage.datePickerSelectedDay)?configFile.infoPage.datePickerSelectedDay:datePickerSelectedDay;
                        disabledDateColor = !this.isVoid(configFile.infoPage.disabledDateColor)?configFile.infoPage.disabledDateColor:disabledDateColor;
                    }
                    if(!this.isVoid(configFile.navBar))
                    {
                        navBarBackground=!this.isVoid(configFile.navBar.backgroundColor)?configFile.navBar.backgroundColor:basicBackground;
                        navBarFontColor=!this.isVoid(configFile.navBar.fontColor)?configFile.navBar.fontColor:basicFontColor;
                        navBarOtherColor=!this.isVoid(configFile.navBar.otherColor)?configFile.navBar.otherColor:basicOtherColor;
                        navBarShadow = !this.isVoid(configFile.navBar.boxShadow)?configFile.navBar.boxShadow:navBarShadow;
                    }
                }
                console.log("navBarShadow Colors---",navBarShadow);
                var cp={
                    "basicBackground":basicBackground,
                    "basicFontColor":basicFontColor,
                    "basicOtherColor":basicOtherColor,
                    "navBarBackground":navBarBackground,
                    "navBarFontColor":navBarFontColor,
                    "navBarOtherColor":navBarOtherColor,
                    "navBarShadow":navBarShadow,
                    "infoPageBackground":infoPageBackground,
                    "infoPageFontColor":infoPageFontColor,
                    "infoPageOtherColor":infoPageOtherColor,
                    "newAdColor":newAdColor,
                    "homeColor":homeColor,
                    "dashboardColor":dashboardColor,
                    "clientMonitoringColor":clientMonitoringColor,
                    "myAdsColor":myAdsColor,
                    "resourcesColor":resourcesColor,
                    "rangeColor":rangeColor,
                    "uploadBack":uploadBack,
                    "disableColor":disableColor,
                    "adminColor":adminColor,
                    "datePickerBackGround":datePickerBackGround,
                    "datePickerDay":datePickerDay,
                    "datePickerSelectedDay":datePickerSelectedDay,
                    "errorColor":errorColor,
                    "disabledDateColor":disabledDateColor,
                    "newAdLoading":newAdLoading,
                    "grayColor":grayColor,
                    "budgteActiveTittle" :budgteActiveTittle,
                    "budgteDisabledTittle" :budgteDisabledTittle,
                    "iabBorder": iabBorder,
                    "disabledButonColor":disabledButonColor,
                    "activeFishColor":activeFishColor,
                    "textDisableColor":textDisableColor,
                    "borderColor":borderColor,
                    "paginationColor":paginationColor,
                    "mediaDesignBorder":mediaDesignBorder,
                    "remainingTextColor":remainingTextColor,
                    "fontColor":fontColor
                }
                console.log('Theme Object is--',cp);
                return cp
            },
            getColorForPagination:function(){
                var configFile = localStorageService.get('configurations');
                var dashboardColor="rgb(46,167,224)";
                var clientMonitoringColor="rgb(139,64,196)";
                var ActiveButtonColor="rgb(46,56,289)";
                var myAdsColor="rgb(143,195,31)";
                if(!this.isVoid(configFile)) {
                    if (!this.isVoid(configFile.basicTheme)) {
                        dashboardColor = !this.isVoid(configFile.basicTheme.dashboardColor) ? configFile.basicTheme.dashboardColor : dashboardColor;
                        clientMonitoringColor = !this.isVoid(configFile.basicTheme.clientMonitoringColor) ? configFile.basicTheme.clientMonitoringColor : clientMonitoringColor;
                        myAdsColor = !this.isVoid(configFile.basicTheme.myAdsColor) ? configFile.basicTheme.myAdsColor : myAdsColor;
                        ActiveButtonColor = !this.isVoid(configFile.basicTheme.ActiveButtonColor) ? configFile.basicTheme.ActiveButtonColor : ActiveButtonColor;
                    }
                }
                var pcp={
                    "dashboardColor":dashboardColor,
                    "clientMonitoringColor":clientMonitoringColor,
                    "myAdsColor":myAdsColor,
                    "ActiveButtonColor":ActiveButtonColor
                }
                return pcp
            },
            getColorForNewSection:function(){
                var configFile = localStorageService.get('configurations');
                var  newSectionColor="rgb(255,51,102)";
                var  basicBackground="black";
                if(!this.isVoid(configFile)) {
                    if (!this.isVoid(configFile.basicTheme)) {
                        basicBackground = !this.isVoid(configFile.basicTheme.backgroundColor) ? configFile.basicTheme.backgroundColor : basicBackground;
                        newSectionColor = !this.isVoid(configFile.basicTheme.newAdColor) ? configFile.basicTheme.newAdColor : newAdColor;
                    }
                }
                var cp1={
                    "basicBackground":basicBackground,
                    "newSectionColor":newSectionColor
                }
                return cp1;
            },
            getAdminInfoText:function(){
                var configFile = localStorageService.get('configurations');
                var  infoText="dentsuInfo";
                if(!this.isVoid(configFile)) {
                    if (!this.isVoid(configFile.adminInfoText)) {
                        infoText = !this.isVoid(configFile.adminInfoText) ? configFile.adminInfoText : infoText;
                    }
                }

                return infoText;
            },
            localizationSupport:function(){
                var configFile = localStorageService.get('configurations');
                var  isLocalization=true;
                if(!this.isVoid(configFile)) {
                    if (!this.isVoid(configFile.localization)) {
                        isLocalization = !this.isVoid(configFile.localization) ? configFile.localization : isLocalization;
                    }
                }

                return isLocalization;
            },
            campaignTypes:function(){
                var configFile = localStorageService.get('configurations');
                var  types=[];
                if(!this.isVoid(configFile)) {
                    if (!this.isVoid(configFile.campaignTypes)) {
                        types=Object.keys(configFile.campaignTypes);
                    }
                }

                return types;
            },
            lableType:function(type,page){
                return this.globleLanguage();
            },
            globleLanguage:function(){
                var configFile = localStorageService.get('configurations');
                var  style=localStorageService.get("language");
                if(!this.isVoid(configFile) && !this.isVoid(configFile.labels)) {
                    console.log("in addressTheme ",configFile.labels)
                    return configFile.labels;
                }

                return style;
            },
            getMaxBudgetLimit:function(type){
                var configFile = localStorageService.get('configurations');
                if(type=="mobile" || type=="facebook"){
                    var limit =300000
                }
                else{
                    var limit =1000
                }
                if(!this.isVoid(configFile) && !this.isVoid(configFile.campaignTypes) && !this.isVoid(configFile.campaignTypes[type]) && !this.isVoid(configFile.campaignTypes[type].budget)) {
                    console.log("buget limit is  ",configFile.campaignTypes[type].budget)
                    return configFile.campaignTypes[type].budget;
                }
                return limit;
            },
            replaceAt:function(index, replacement, str) {
                return str.substr(0, index) + replacement+ str.substr(index + replacement.length);
            },
            replaceAll:function(search, replacement, str) {
                return str.replace(new RegExp(search, 'g'), replacement);
            },
            getFields:function(type,page){
                console.log("in getFields ",type)
                var configFile = localStorageService.get('configurations');
                if(type=="location" || type=="facebook"){
                   var  fields={
                        "country":{},
                        "zip":{
                            "isSuggestive":true
                        },
                        "state":{
                            "isSuggestive":false
                        },
                        "city":{
                            "isSuggestive":false
                        },
                        "street":{}
                    };
                }
                else{
                    var fields= {
                        "state": {
                            "isSuggestive": true,
                            "autoComplete": true
                        }
                    }
                }

                if(!this.isVoid(configFile) && !this.isVoid(configFile.campaignTypes)) {
                    console.log("in addressTheme ",configFile.campaignTypes)
                    if (!this.isVoid(configFile.campaignTypes[type])
                        && !this.isVoid(configFile.campaignTypes[type])
                        && !this.isVoid(configFile.campaignTypes[type][page])
                        && !this.isVoid(configFile.campaignTypes[type][page].fields)) {
                        fields=configFile.campaignTypes[type][page].fields;
                    }
                }

                return fields;
            },
            getImages:function(){
                var configFile = localStorageService.get('configurations');
                //$log.info("configuration file in utility service is image function",configFile)
                var brandLogo="";
                var newAd="images/newNav1.png";
                var home="images/homeNav1.png";
                var dashboard="images/dashNav111.png";
                var myAds="images/myadsNav1.png";
                var resources="images/resourceNav11.png";
                var clientMonitoring="images/clientMonitoring.png";
                var newAdActive="images/newNav11.png";
                var homeActive="images/homeNav11.png";
                var dashboardActive="images/dashNav1.png";
                var myAdsActive="images/myadsNav11.png";
                var resourcesActive="images/resourceNav1.png";
                var clientMonitoringActive="images/clientMonitoringSelected.png";
                var homenewAd="images/newHome.png";
                var homemyAds="images/myads1.png";
                var homeDash="images/dash1.png";
                var passShow="images/showPass.png";
                var passHide="images/hideShow.png";
                var fish="images/temp/arrow2.png";
                var fishActive="images/temp/activeArrow.png";
                var checkImage="images/temp/check.png";
                var admin="images/admin.png";
                var adminActive="images/adminActive.png";
                var searchImg = "/images/viewWhite.png";
                var resetImg = "/images/reset.png";
                var clickToEdit ="/images/temp/editImage.png";

                if(!this.isVoid(configFile)){
                    if(!this.isVoid(configFile.navBar)) {
                        if (!this.isVoid(configFile.navBar.images)) {
                            brandLogo =!this.isVoid(configFile.navBar.images.brandLogo)?configFile.navBar.images.brandLogo:brandLogo;
                            if (!this.isVoid(configFile.navBar.images.navMenu)) {
                                newAd = !this.isVoid(configFile.navBar.images.navMenu.newAd)?configFile.navBar.images.navMenu.newAd:newAd;
                                home = !this.isVoid(configFile.navBar.images.navMenu.home)?configFile.navBar.images.navMenu.home:home;
                                dashboard = !this.isVoid(configFile.navBar.images.navMenu.dashboard)?configFile.navBar.images.navMenu.dashboard:dashboard;
                                myAds = !this.isVoid(configFile.navBar.images.navMenu.myAds)?configFile.navBar.images.navMenu.myAds:myAds;
                                resources = !this.isVoid(configFile.navBar.images.navMenu.resources)?configFile.navBar.images.navMenu.resources:resources;
                                clientMonitoring = !this.isVoid(configFile.navBar.images.navMenu.clientMonitoring)?configFile.navBar.images.navMenu.clientMonitoring:clientMonitoring;
                                newAdActive = !this.isVoid(configFile.navBar.images.navMenu.newAdActive)?configFile.navBar.images.navMenu.newAdActive:newAdActive;
                                homeActive = !this.isVoid(configFile.navBar.images.navMenu.homeActive)?configFile.navBar.images.navMenu.homeActive:homeActive;
                                dashboardActive = !this.isVoid(configFile.navBar.images.navMenu.dashboardActive)?configFile.navBar.images.navMenu.dashboardActive:dashboardActive;
                                myAdsActive = !this.isVoid(configFile.navBar.images.navMenu.myAdsActive)?configFile.navBar.images.navMenu.myAdsActive:myAdsActive;
                                resourcesActive = !this.isVoid(configFile.navBar.images.navMenu.resourcesActive)?configFile.navBar.images.navMenu.resourcesActive:resourcesActive;
                                clientMonitoringActive = !this.isVoid(configFile.navBar.images.navMenu.clientMonitoringActive)?configFile.navBar.images.navMenu.clientMonitoringActive:clientMonitoringActive;
                                admin = !this.isVoid(configFile.navBar.images.navMenu.admin)?configFile.navBar.images.navMenu.admin:admin;
                                adminActive = !this.isVoid(configFile.navBar.images.navMenu.adminActive)?configFile.navBar.images.navMenu.adminActive:adminActive;
                            }
                        }
                    }
                    if(!this.isVoid(configFile.home)){
                        if(!this.isVoid(configFile.home.images)){
                            homenewAd=!this.isVoid(configFile.home.images.homenewAd)?configFile.home.images.homenewAd:homenewAd;
                            homemyAds=!this.isVoid(configFile.home.images.homemyAds)?configFile.home.images.homemyAds:homemyAds;
                            homeDash=!this.isVoid(configFile.home.images.homeDash)?configFile.home.images.homeDash:homeDash;
                        }
                    }
                    if(!this.isVoid(configFile.login)){
                        if(!this.isVoid(configFile.login.images)){
                            passShow=!this.isVoid(configFile.login.images.passShow)?configFile.login.images.passShow:passShow;
                            passHide=!this.isVoid(configFile.login.images.passHide)?configFile.login.images.passHide:passHide;
                        }
                    }
                    if(!this.isVoid(configFile.fishBar)){
                        if(!this.isVoid(configFile.fishBar.images)){
                            fish=!this.isVoid(configFile.fishBar.images.fish)?configFile.fishBar.images.fish:fish;
                            fishActive=!this.isVoid(configFile.fishBar.images.fishActive)?configFile.fishBar.images.fishActive:fishActive;
                        }
                    }
                    if(!this.isVoid(configFile.basicTheme)){
                        if(!this.isVoid(configFile.basicTheme.images)){
                            checkImage=!this.isVoid(configFile.basicTheme.images.checkImage)?configFile.basicTheme.images.checkImage:checkImage;
                        }
                    }
                if(!this.isVoid(configFile.basicTheme)){
                        if(!this.isVoid(configFile.basicTheme.images)){
                            searchImg=!this.isVoid(configFile.basicTheme.images.searchImg)?configFile.basicTheme.images.searchImg:searchImg;
                            resetImg=!this.isVoid(configFile.basicTheme.images.resetImg)?configFile.basicTheme.images.resetImg:resetImg;
                            clickToEdit=!this.isVoid(configFile.basicTheme.images.clickToEdit)?configFile.basicTheme.images.clickToEdit:clickToEdit;
                        }
                    }
                }

                var ip={
                    "brandLogo":brandLogo,
                    "newAd":newAd,
                    "home":home,
                    "dashboard":dashboard,
                    "myAds":myAds,
                    "resources":resources,
                    "clientMonitoring":clientMonitoring,
                    "newAdActive":newAdActive,
                    "homeActive":homeActive,
                    "dashboardActive":dashboardActive,
                    "myAdsActive":myAdsActive,
                    "resourcesActive":resourcesActive,
                    "clientMonitoringActive":clientMonitoringActive,
                    "admin":admin,
                    "adminActive":adminActive,
                    "homenewAd":homenewAd,
                    "homemyAds":homemyAds,
                    "homeDash":homeDash,
                    "passShow":passShow,
                    "passHide":passHide,
                    "fishActive":fishActive,
                    "fish":fish,
                    "checkImage":checkImage,
                    "searchImg":searchImg,
                    "resetImg":resetImg,
                    "clickToEdit":clickToEdit
                }
                return ip;
            },
            getCommonImages:function(){
                var configFile = localStorageService.get('configurations');
                var next="images/next.png";
                var back="images/back.png";
                var save="images/ave.png";
                var backDisable="images/bkd.png";
                var longButton="images/long-button.png";
                var longButtonCancel="images/long-buttonCancel.png";
                var nextDisable="images/nextDisable.png";
                var dashFish="images/temp/activeArrowDash.png";
                var clientFish="images/temp/clientMonitoringFish.png";
                var radiusPointer="images/knob1.png";
                var checkImage="images/temp/check.png";
                var logincheckImage="images/temp/logincheck.png";
                var calenderLeft="images/leftt.png";
                var calenderRight="images/rightt.png";
                var uploadImage="images/upload.png";
                var uploadCancel="images/uploadCancel.png";
                var leftArrow = "images/leftArrow.png";
                var resethtml="images/reset.png";
                var disableresethtml="images/sreset.png";
                var activeTarget="images/1.jpg";
                var inactiveTarget="images/2.png";
                var tabActive = ""    

                if(!this.isVoid(configFile)){
                    if(!this.isVoid(configFile.basicTheme)){
                        if(!this.isVoid(configFile.basicTheme.images)){
                            next=!this.isVoid(configFile.basicTheme.images.next)?configFile.basicTheme.images.next:next;
                            back=!this.isVoid(configFile.basicTheme.images.back)?configFile.basicTheme.images.back:back;
                            save=!this.isVoid(configFile.basicTheme.images.save)?configFile.basicTheme.images.save:save;
                            backDisable=!this.isVoid(configFile.basicTheme.images.backDisable)?configFile.basicTheme.images.backDisable:backDisable;
                            longButton=!this.isVoid(configFile.basicTheme.images.longButton)?configFile.basicTheme.images.longButton:longButton;
                            longButtonCancel=!this.isVoid(configFile.basicTheme.images.longButtonCancel)?configFile.basicTheme.images.longButtonCancel:longButtonCancel;
                            nextDisable=!this.isVoid(configFile.basicTheme.images.nextDisable)?configFile.basicTheme.images.nextDisable:nextDisable;
                            dashFish=!this.isVoid(configFile.basicTheme.images.dashFish)?configFile.basicTheme.images.dashFish:dashFish;
                            clientFish=!this.isVoid(configFile.basicTheme.images.clientFish)?configFile.basicTheme.images.clientFish:clientFish;
                            radiusPointer=!this.isVoid(configFile.basicTheme.images.radiusPointer)?configFile.basicTheme.images.radiusPointer:radiusPointer;
                            checkImage=!this.isVoid(configFile.basicTheme.images.checkImage)?configFile.basicTheme.images.checkImage:checkImage;
                            logincheckImage=!this.isVoid(configFile.basicTheme.images.logincheckImage)?configFile.basicTheme.images.logincheckImage:logincheckImage;
                            calenderLeft=!this.isVoid(configFile.basicTheme.images.calenderLeft)?configFile.basicTheme.images.calenderLeft:calenderLeft;
                            calenderRight=!this.isVoid(configFile.basicTheme.images.calenderRight)?configFile.basicTheme.images.calenderRight:calenderRight;
                            uploadImage=!this.isVoid(configFile.basicTheme.images.uploadImage)?configFile.basicTheme.images.uploadImage:uploadImage;
                            uploadCancel=!this.isVoid(configFile.basicTheme.images.uploadCancel)?configFile.basicTheme.images.uploadCancel:uploadCancel;
                            leftArrow = !this.isVoid(configFile.basicTheme.images.leftArrow)?configFile.basicTheme.images.leftArrow:leftArrow;
                            resethtml=!this.isVoid(configFile.basicTheme.images.resethtml)?configFile.basicTheme.images.resethtml:resethtml;
                            disableresethtml=!this.isVoid(configFile.basicTheme.images.disableresethtml)?configFile.basicTheme.images.disableresethtml:disableresethtml;
                            activeTarget=!this.isVoid(configFile.basicTheme.images.activeTarget)?configFile.basicTheme.images.activeTarget:activeTarget;
                            inactiveTarget=!this.isVoid(configFile.basicTheme.images.inactiveTarget)?configFile.basicTheme.images.inactiveTarget:inactiveTarget;
                            tabActive=!this.isVoid(configFile.basicTheme.images.tabActive)?configFile.basicTheme.images.tabActive:tabActive;
              
                        }
                    }

                }
                var cip={
                    "next":next,
                    "back":back,
                    "save":save,
                    "backDisable":backDisable,
                    "longButton":longButton,
                    "longButtonCancel":longButtonCancel,
                    "nextDisable":nextDisable,
                    "dashFish":dashFish,
                    "clientFish":clientFish,
                    "radiusPointer":radiusPointer,
                    "checkImage":checkImage,
                    "logincheckImage":logincheckImage,
                    "calenderRight":calenderRight,
                    "calenderLeft":calenderLeft,
                    "uploadImage":uploadImage,
                    "uploadCancel":uploadCancel,
                    "leftArrow":leftArrow,
                    "resethtml":resethtml,
                    "disableresethtml":disableresethtml,
                    "activeTarget":activeTarget,
                    "inactiveTarget":inactiveTarget,
                    "tabActive":tabActive,
                }
                return cip;
            },
            getEnableStatusHtml :function(){
                var configFile = localStorageService.get('configurations');
                var isHtml=false;
                if(!this.isVoid(configFile)){
                    isHtml=configFile.isHtmlEmable;
                }
                return isHtml;
            },
            gettitle :function()
            {
                var configFile = localStorageService.get('configurations');
                var title="DENTSU SPP";
                if(!this.isVoid(configFile)){
                    title=configFile.title;
                }
                return title;
            },
            isInvoiceGenration : function(){
                var configFile = localStorageService.get('configurations');
                var isInvoice=true;
                if(!this.isVoid(configFile)){
                    isInvoice=configFile.invoiceGenration;
                }
                return isInvoice;
            },
            compareDate : function (dateTimeA, dateTimeB) {
                /*
                 The method returns 1 if dateTimeA is greater than dateTimeB
                 The method returns 0 if dateTimeA equals dateTimeB
                 The method returns -1 if dateTimeA is less than dateTimeB
                 */
                if(dateTimeB === undefined || dateTimeB === "undefined" || dateTimeB === "") {
                    $log.info("target date is undefined");
                    return 1;
                } else {
                    $log.debug("At compare current date ------ ", dateTimeA, " with target------",dateTimeB);
                    /*var momentA = moment(dateTimeA,"DD/MM/YYYY");
                     var momentB = moment(dateTimeB,"DD/MM/YYYY");*/
                    var momentB = moment(dateTimeB).format('YYYY-MM-DD');
                    var momentA = moment(dateTimeA).format('YYYY-MM-DD');
                    $log.debug("At compare current date moment ------ ", momentA, " with target moment------",momentB);
                    if (momentA > momentB) {
                        $log.info("todays > target date");
                        return 1; // note ad target date can never be less than today's date
                    }
                    else if (momentA < momentB) {
                        $log.info("today < target date");
                        return 0; //-1;
                    }
                    else {
                        $log.info("today == target date");
                        return 0;
                    }
                }

            },
            isEnableClientMonitoring :function(){
                var configFile = localStorageService.get('configurations');
                var flagInLogin=localStorageService.get('clientMonitoringAccess');
                var cm=flagInLogin;
                if(!this.isVoid(configFile)){
                    cm=(configFile.isClientMonitoing && flagInLogin);
                }
                if(cm==="false" || !cm){
                    return false
                }
                else {
                    return true
                }
            },
            isClientEditableStatus :function(){
                var configFile = localStorageService.get('configurations');
                var ce=true;
                if(!this.isVoid(configFile)){
                    ce=configFile.isClientEditable;
                }
                return ce;
            },
            splitText:function(value,areaStart,areaEnd,fontStyle,fontsize,sliceCount){
                var finalReturn={}
                var text=value.slice(0,sliceCount);
                if(text.length<2){
                    finalReturn= {
                        "value":"",
                        "fontSize":fontsize,
                        "width":0
                    }
                }
                var size = calculateSize(text, {
                    font: fontStyle,
                    fontSize: fontsize
                });
                var area=areaEnd-areaStart;
                if(size.width<area){
                    text=value.slice(0,(sliceCount-3))
                    text=text+"..."
                    finalReturn= {
                        "value":text,
                        "fontSize":fontsize,
                        "width":size.width
                    }
                }
                else {
                    finalReturn=this.splitText(value,areaStart,areaEnd,fontStyle,fontsize,sliceCount-1)
                }
                return finalReturn;
            },
            splitTextForFb:function(value,areaStart,areaEnd,fontStyle,fontsize,sliceCount){
                var finalReturn={}
                var text=value.slice(0,sliceCount);
                var size = calculateSize(text, {
                    font: fontStyle,
                    fontSize: fontsize
                });
                var area=areaEnd-areaStart;
                if(size.width<area){
                    text=value.slice(0,sliceCount-1)
                    text=text+"..."
                    finalReturn= {
                        "value":text,
                        "fontSize":fontsize,
                        "width":size.width
                    }
                }
                else {
                    finalReturn=this.splitTextForFb(value,areaStart,areaEnd,fontStyle,fontsize,sliceCount-1)
                }
                return finalReturn;
            },
            extractHostname:function (url) {
                var hostname;
                //find & remove protocol (http, ftp, etc.) and get hostname

                if (url.indexOf("://") > -1) {
                    hostname = url.split('/')[2];
                }
                else {
                    hostname = url.split('/')[0];
                }

                //find & remove port number
                hostname = hostname.split(':')[0];
                //find & remove "?"
                hostname = hostname.split('?')[0];

                return hostname;
            },
            calculateTextAndfont:function (value,areaStart,areaEnd,fontStyle,fontsize){
                var finalReturn={}
                var size = calculateSize(value, {
                    font: fontStyle,
                    fontSize: fontsize
                });
                var area=areaEnd-areaStart;
                if(size.width<area){
                    finalReturn= {
                        "value":value,
                        "fontSize":fontsize,
                        "width":size.width
                    }
                }
                else {
                    if((parseInt(fontsize)-1)<12){
                        finalReturn= this.splitText(value,areaStart,areaEnd,fontStyle,fontsize,-1)

                    }
                    else {
                        finalReturn=this.calculateTextAndfont(value,areaStart,areaEnd,fontStyle,(parseInt(fontsize)-1)+"px")
                    }
                }
                return finalReturn


            }
        }
    }])
    return UtilityServices;
});

