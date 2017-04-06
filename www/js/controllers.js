angular.module('kidney.controllers', ['ionic','kidney.services'])//,'ngRoute'

/////////////////////////////zhangying////////////////////////
//登录
.controller('SignInCtrl', ['$scope','$timeout','$state','Storage','loginFactory','$ionicHistory', function($scope, $timeout,$state,Storage,loginFactory,$ionicHistory) {
//.controller('SignInCtrl', ['$scope','$timeout','$state','Storage','loginFactory','$ionicHistory', function($scope, $timeout,$state,Storage,loginFactory,$ionicHistory) {
  $scope.barwidth="width:0%";
  if(Storage.get('USERNAME')!=null){
    $scope.logOn={username:Storage.get('USERNAME'),password:""};

  }else{
    $scope.logOn={username:"",password:""};
  }
  $scope.signIn = function(logOn) {  
    $scope.logStatus='';
	
   //记录登录状态
   var flag=false;
    if((logOn.username!="") && (logOn.password!="")){
    	var phoneReg=/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    	//手机正则表达式验证
    	if(!phoneReg.test(logOn.username)){$scope.logStatus="手机号验证失败！";}
    	else{
    		var usernames = Storage.get('usernames');
			usernames="13709553333,18366113563,18366113564";
			passwords="123,111,111";
    		var index = usernames.indexOf(logOn.username);
    		console.log(index);
			//测试
    		if(index>=0){//查找手机号是否注册过，是否在数据库里
    			//判断密码是否正确
    			console.log(usernames[index]);
    			console.log(passwords[index]);
    			var passwords = Storage.get('passwords');
    			//if(logOn.password != passwords[index]){$scope.logStatus = "密码错误！";}
				//if(logOn.username!="18366113562"||logOn.password!="123") {$scope.logStatus = "密码错误！";}//登录名写死
				//if(loginFactory.isLogin()==false){$scope.logStatus = "密码错误！";}
				if(loginFactory.isLogin(logOn.username,logOn.password)==false){$scope.logStatus = "密码错误！";}
    			else{
					Storage.set('USERNAME',logOn.username);
					Storage.set('IsSignIn','YES');
					$scope.logStatus = "登录成功";
					$ionicHistory.clearCache();
					$ionicHistory.clearHistory();
					$timeout(function(){$state.go('tab.home');},500);
					flag=true;//登录成功
    			}
    		}
    		else{
    			$scope.logStatus = "手机号未激活，请注册！"
    		}
    	}
    	

    }
    else{
    	$scope.logStatus="请输入完整信息！";
    }
	
	//Storage.set("isSignIN")="YES";
	console.log($state);
	//$state.go('tab.home');
    if(flag==true)$state.go('tab.home');   	
  }
  $scope.toRegister = function(){
  	console.log($state);
    $state.go('phonevalid');   
   
  }
  $scope.toReset = function(){
    $state.go('phonevalid');
   
  } 
  
}])


//手机号码验证
.controller('phonevalidCtrl', ['$scope','$state','$interval','$rootScope', 'Storage',  function($scope, $state,$interval,$rootScope,Storage) {
  $scope.barwidth="width:0%";
  
  $scope.veriusername="" 
  $scope.verifyCode="";
  $scope.veritext="获取验证码";
  $scope.isable=false;
  var unablebutton = function(){      
     //验证码BUTTON效果
    $scope.isable=true;
    $scope.veritext="180S再次发送"; 
    var time = 179;
    var timer;
    timer = $interval(function(){
      if(time==0){
        $interval.cancel(timer);
        timer=undefined;        
        $scope.veritext="获取验证码";       
        $scope.isable=false;
      }else{
        $scope.veritext=time+"S再次发送";
        time--;
      }
    },1000);
  }
  //发送验证码
  var sendSMS = function(){
      //结果分为1、验证码发送失败;2、发送成功，获取稍后
    $scope.logStatus="您的验证码已发送，重新获取请稍后";
  }
  //点击获取验证码
  $scope.getcode=function(veriusername){
     $scope.logStatus='';
     if ($scope.veriusername=="") {$scope.logStatus="手机号码不能为空！";return;}
     var phoneReg=/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      //手机正则表达式验证
     if(!phoneReg.test(logOn.veriusername)){$scope.logStatus="手机号验证失败！";return;}
     //先判断用户是否注册过
     var usernames = Storage.get('usernames');
      if (usernames.indexOf($scope.veriusername)>=0) {$scope.logStatus = "该手机号码已经注册！";return;}
     
  


  }

 
  
}])

//首页
.controller('homeCtrl', ['$scope','$state','$interval','$rootScope', 'Storage','$http','$sce',  function($scope, $state,$interval,$rootScope,Storage,$http,$sce) {
	$scope.barwidth="width:0%";
	$scope.navigation=$sce.trustAsResourceUrl("http://121.43.107.106/");
	console.log(123)
	ionic.DomUtil.ready(function(){
        $http({
          method  : 'POST',
          url     : 'http://121.43.107.106/member.php?mod=logging&action=login&loginsubmit=yes&loginhash=$loginhash&mobile=2',
          params    : {'username':'admin','password':'bme319'},  // pass in data as strings
          headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
        }).success(function(data) {
              //console.log(data);
        });
    })
}])

//咨询
.controller('consultCtrl', ['$scope','$state','$interval','$rootScope', 'Storage',  function($scope, $state,$interval,$rootScope,Storage) {
  $scope.barwidth="width:0%";
  //变量a 等待患者数量 变量b 已完成咨询患者数量
  $scope.doctor={a:3,b:3};
  var now=new Date();
  var year=now.getYear();
  var month=now.getMonth()+1;
  var day=now.getDate();
  var date1=month+"月"+day+"日";
  //var date1=new Date().format("MM月dd日");
  $scope.riqi=date1;
}])

//"咨询”进行中
.controller('doingCtrl', ['$scope','$state','$interval','$rootScope', 'Storage',  function($scope, $state,$interval,$rootScope,Storage) {
  $scope.patients=[
	  {
		  head:"max.png",
		  name:"王大头",
		  gender:"男",
		  age:"32",
		  time:"2017/3/27 9:32",
		  qs:"问题1" 
	  },
	  {
		  head:"mike.png",
		  name:"王二头",
		  gender:"男",
		  age:"32",
		  time:"2017/3/28 10:32",
		  qs:"问题2" 
	  },
	  {
		  head:"adam.jpg",
		  name:"王三头",
		  gender:"男",
		  age:"29",
		  time:"2017/3/28 10:32",
		  qs:"问题2" 
	  }
	  ];
}])

//"咨询”已完成
.controller('didCtrl', ['$scope','$state','$interval','$rootScope', 'Storage',  function($scope, $state,$interval,$rootScope,Storage) {
  $scope.patients=[
	  {
		  head:"max.png",
		  name:"王大头",
		  gender:"男",
		  age:"32",
		  time:"2017/3/27 9:32",
		  qs:"问题1" 
	  },
	  {
		  head:"mike.png",
		  name:"王二头",
		  gender:"男",
		  age:"32",
		  time:"2017/3/28 10:32",
		  qs:"问题2" 
	  },
	  {
		  head:"adam.jpg",
		  name:"王三头",
		  gender:"男",
		  age:"29",
		  time:"2017/3/28 10:32",
		  qs:"问题2" 
	  }
	  ];
}])

//"咨询”问题详情
.controller('detailCtrl', ['$scope','$state','$interval','$rootScope', 'Storage',  function($scope, $state,$interval,$rootScope,Storage) {
  $scope.barwidth="width:0%";
  $scope.detail={
	      head:"mike.png",
		  name:"王二头",
		  gender:"男",
		  age:"32",
		  time:"2017/3/28 10:32",
		  qs:"问题2" ,
		  symptom:"肾内科障碍",
		  type:"肾内科",
		  desc:"医生你好，我想咨询一下"
        };
}])

//"患者”页
.controller('patientCtrl', ['$scope','$state','$interval','$rootScope', 'Storage',  function($scope, $state,$interval,$rootScope,Storage) {
  $scope.barwidth="width:0%";
  $scope.patients=[
	  {
		  head:"max.png",
		  name:"王大头",
		  gender:"男",
		  age:"32",
		  time:"2017/3/27 9:32",
		  appoint:"3/29 10:00-11:00",
		  qs:"问题1" ,
		  labels:"高血压、糖尿病",
		  symptom:"肾内科障碍",
		  type:"肾内科",
		  class:"danger"
	  },
	  {
		  head:"mike.png",
		  name:"王二头",
		  gender:"男",
		  age:"32",
		  time:"2017/3/28 10:32",
		  appoint:"3/29 10:00-11:00",
		  qs:"问题2" ,
		  labels:"高血压、糖尿病",
		  symptom:"肾内科障碍",
		  type:"肾内科",
		  class:"danger"
	  },
	  {
		  head:"adam.jpg",
		  name:"王三头",
		  gender:"男",
		  age:"29",
		  time:"2017/3/28 10:32",
		  appoint:"3/29 10:00-11:00",
		  qs:"问题2" ,
		  labels:"高血压、糖尿病",
		  symptom:"肾内科障碍",
		  type:"肾内科",
		  class:"danger"
	  }
	  ];
}])

//"患者”详情子页
.controller('patientDetailCtrl', ['$scope','$ionicPopup','$state', function($scope, $ionicPopup,$state) {
	$scope.hideTabs = true;
	$scope.p=
	  {
		  head:"max.png",
		  name:"王大头",
		  gender:"男",
		  birthday:"1990-02-03",
		  IDNo:"330175147528475189",
		  provice:"浙江",
		  city:"杭州",
		  VIP:"1",
		  hypertension:"1",
		  type:"肾内科"
		  //class:"danger"
	  };
	  
	$scope.diagnosisInfo=[
		{ 
			time: "2017-03-22", 
			hospital: "浙江省第一医院", 
			department:"肾内科",
			diagnosis: "blabla"
		}, 
		{
			time: "2017-03-23", 
			hospital: "安徽省第二医院", 
			department:"肾内科",
			diagnosis: "blabla"
		}   
	];
	$scope.goToDiagnose=function()
	{
		$state.go("tab.DoctorDiagnose");
	}
	
	
	
}])


//"交流”页
.controller('communicationCtrl', ['$scope','$state','$interval','$rootScope', 'Storage',  function($scope, $state,$interval,$rootScope,Storage) {
  $scope.barwidth="width:0%";
  

}])

//"我”页
.controller('meCtrl', ['$scope','$state','$interval','$rootScope', 'Storage',"meFactory", function($scope, $state,$interval,$rootScope,Storage,meFactory) {
  $scope.barwidth="width:0%";
   
   $scope.userid=Storage.get('userid');
   $scope.doctor=meFactory.GetDoctorInfo($scope.userid);
   //$scope.doctor=meFactory.GetDoctorInfo('D201703240001');
   /*{
		  name:"小丁",
		  gender:"男",
		  title:"主任医生",
		  workUnit:"浙江XXX医院",
		  department:"泌尿科"
    };*/
 
    $scope.user={
		photoUrl:"default.png"
	};
  
}])

//"我”二维码页
.controller('QRcodeCtrl', ['$scope','$state','$interval','$rootScope', 'Storage',"meFactory",  function($scope, $state,$interval,$rootScope,Storage,meFactory) {
    //$scope.hideTabs = true;
	$scope.userid=Storage.get('userid');
    $scope.doctor=meFactory.GetDoctorInfo($scope.userid);
	/*$scope.doctor={
		  name:"小丁",
		  gender:"男",
		  title:"主任医生",
		  workUnit:"浙江XXX医院",
		  department:"泌尿科"
    };*/
	
	$scope.user={
		photoUrl:"default.png"
	};
}])


//"我”个人资料页
.controller('myinfoCtrl', ['$scope','Storage',"meFactory", function($scope, Storage,meFactory) {
	$scope.hideTabs = true;
	$scope.userid=Storage.get('userid');
    $scope.doctor=meFactory.GetDoctorInfo($scope.userid);
	/*$scope.doctor={
		  name:"小丁",
		  gender:"男",
		  title:"主任医生",
		  workUnit:"浙江XXX医院",
		  department:"肾内科",
		  major:"肾小管疾病、间质性肾炎"
    };
	*/
	$scope.user={
		photoUrl:"default.png"
	};
	
	$scope.updateDiv=false;
	$scope.myDiv=true;
    $scope.toggle = function() {
		$scope.myDiv = !$scope.myDiv;
        $scope.updateDiv = !$scope.updateDiv;		
    };
	
}])

//"我”个人收费页
.controller('myfeeCtrl', ['$scope','$ionicPopup','$state', function($scope, $ionicPopup,$state) {
	$scope.hideTabs = true;
	
	$scope.doctor={
		charge1:20,
		charge2:100
	};
	
    $scope.save = function() {
		$state.go('tab.me'); 	
    };
	
	
}])


//"我”的评价
.controller('feedbackCtrl', ['$scope','$ionicPopup','$state', function($scope, $ionicPopup,$state) {
	$scope.hideTabs = true;
	
	$scope.feedbacks=[
	{
		content : "温柔亲切我喜欢", 
		PatientId:"P201703240012",
		patient:"患者甲",
		time:"2017-03-22"
	},
	{
		content : "还耐心", 
		PatientId:"P201703240015",
		patient:"患者乙",
		time:"2017-03-24"
	}
	];
}])


//"我”设置页
.controller('setCtrl', ['$scope','$ionicPopup','$state','$timeout','$stateParams', 'Storage',function($scope, $ionicPopup,$state,$timeout,$stateParams,Storage) {
	$scope.hideTabs = true;	
	$scope.logout = function() {
		//Storage.set('IsSignIn','NO');
		$state.logStatus="用户已注销";
		//清除登陆信息
		Storage.rm('IsSignIn');
		//Storage.rm('USERNAME');
		Storage.rm('PASSWORD');
		Storage.rm('userid');
		console.log($state);
		$timeout(function(){$state.go('signin');},500);
    };
	
}])


//"我”设置内容页
.controller('set-contentCtrl', ['$scope','$ionicPopup','$state','$stateParams', function($scope, $ionicPopup,$state,$stateParams) {
	$scope.hideTabs = true;	
	$scope.type = $stateParams.type;
	
}])

/////////////////////////tongdanyang/////////////////
.controller('DoctorDiagnoseCtrl', ['$scope', 'Storage', function ($scope, Storage) {
  $scope.Hypers =
  [
    {Name:"是",Type:1},
    {Name:"否",Type:2}
  ]
  
  $scope.Diseases =
  [
    {Name:"肾移植",Type:1},
    {Name:"CKD1-2期",Type:2},
    {Name:"CKD3-4期",Type:3},
    {Name:"CDK5期未透析",Type:4},
    {Name:"腹透",Type:5},
    {Name:"血透",Type:6}
  ]

  $scope.Diagnose = 
  {
    "KidneyDisease": null,
    "DiseaseDetail": null,
    "OperationDate": null,
    "Hypertension": null,
    "DetailDiagnose": null
  }

  // --------datepicker设置----------------
  var  monthList=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
  var weekDaysList=["日","一","二","三","四","五","六"];
  
  // --------诊断日期----------------
  var DiagnosisdatePickerCallback = function (val) {
    if (typeof(val) === 'undefined') {
      console.log('No date selected');
    } else {
      $scope.datepickerObject1.inputDate=val;
      var dd=val.getDate();
      var mm=val.getMonth()+1;
      var yyyy=val.getFullYear();
      var d=dd<10?('0'+String(dd)):String(dd);
      var m=mm<10?('0'+String(mm)):String(mm);
      //日期的存储格式和显示格式不一致
      $scope.Diagnose.LastDiagnosisTime=yyyy+'/'+m+'/'+d;
    }
  };
  
  $scope.datepickerObject1 = {
    titleLabel: '诊断日期',  //Optional
    todayLabel: '今天',  //Optional
    closeLabel: '取消',  //Optional
    setLabel: '设置',  //Optional
    setButtonType : 'button-assertive',  //Optional
    todayButtonType : 'button-assertive',  //Optional
    closeButtonType : 'button-assertive',  //Optional
    inputDate: new Date(),    //Optional
    mondayFirst: false,    //Optional
    //disabledDates: disabledDates, //Optional
    weekDaysList: weekDaysList,   //Optional
    monthList: monthList, //Optional
    templateType: 'popup', //Optional
    showTodayButton: 'false', //Optional
    modalHeaderColor: 'bar-positive', //Optional
    modalFooterColor: 'bar-positive', //Optional
    from: new Date(1900, 1, 1),   //Optional
    to: new Date(),    //Optional
    callback: function (val) {    //Mandatory
      DiagnosisdatePickerCallback(val);
    }
  };  
  // --------手术日期----------------
  var OperationdatePickerCallback = function (val) {
    if (typeof(val) === 'undefined') {
      console.log('No date selected');
    } else {
      $scope.datepickerObject2.inputDate=val;
      var dd=val.getDate();
      var mm=val.getMonth()+1;
      var yyyy=val.getFullYear();
      var d=dd<10?('0'+String(dd)):String(dd);
      var m=mm<10?('0'+String(mm)):String(mm);
      //日期的存储格式和显示格式不一致
      $scope.Diagnose.OperationDate=yyyy+'/'+m+'/'+d;
    }
  };
  $scope.datepickerObject2 = {
    titleLabel: '手术日期',  //Optional
    todayLabel: '今天',  //Optional
    closeLabel: '取消',  //Optional
    setLabel: '设置',  //Optional
    setButtonType : 'button-assertive',  //Optional
    todayButtonType : 'button-assertive',  //Optional
    closeButtonType : 'button-assertive',  //Optional
    mondayFirst: false,    //Optional
    //disabledDates: disabledDates, //Optional
    weekDaysList: weekDaysList,   //Optional
    monthList: monthList, //Optional
    templateType: 'popup', //Optional
    showTodayButton: 'false', //Optional
    modalHeaderColor: 'bar-positive', //Optional
    modalFooterColor: 'bar-positive', //Optional
    from: new Date(1900, 1, 1),   //Optional
    to: new Date(),    //Optional
    callback: function (val) {    //Mandatory
      OperationdatePickerCallback(val);
    }
  };  
  // --------出生日期----------------
  var BirthdatePickerCallback = function (val) {
    if (typeof(val) === 'undefined') {
      console.log('No date selected');
    } else {
      $scope.datepickerObject3.inputDate=val;
      var dd=val.getDate();
      var mm=val.getMonth()+1;
      var yyyy=val.getFullYear();
      var d=dd<10?('0'+String(dd)):String(dd);
      var m=mm<10?('0'+String(mm)):String(mm);
      //日期的存储格式和显示格式不一致
      $scope.Diagnose.Birthday=yyyy+'/'+m+'/'+d;
    }
  };
  $scope.datepickerObject3 = {
    titleLabel: '出生日期',  //Optional
    todayLabel: '今天',  //Optional
    closeLabel: '取消',  //Optional
    setLabel: '设置',  //Optional
    setButtonType : 'button-assertive',  //Optional
    todayButtonType : 'button-assertive',  //Optional
    closeButtonType : 'button-assertive',  //Optional
    mondayFirst: false,    //Optional
    //disabledDates: disabledDates, //Optional
    weekDaysList: weekDaysList,   //Optional
    monthList: monthList, //Optional
    templateType: 'popup', //Optional
    showTodayButton: 'false', //Optional
    modalHeaderColor: 'bar-positive', //Optional
    modalFooterColor: 'bar-positive', //Optional
    from: new Date(1900, 1, 1),   //Optional
    to: new Date(),    //Optional
    callback: function (val) {    //Mandatory
      BirthdatePickerCallback(val);
    }
  };  
  // --------datepicker设置结束----------------
  $scope.showProgress = function(){
    //console.log($scope.User.KidneyDisease.t.Type);
    if($scope.Diagnose.KidneyDisease == 1 || $scope.Diagnose.KidneyDisease == null || $scope.Diagnose.KidneyDisease == "" ){
      return false;}
    else{
      return true;}
  }

  $scope.showOperationTime = function(){
    //console.log($scope.User.KidneyDisease.t.Type);
    if($scope.Diagnose.KidneyDisease == 1){
      return true;}
    else{
      return false;}
  }

  $scope.reset =function(){
    $scope.Diagnose = 
    {
      "KidneyDisease": null,
      "DiseaseDetail": null,
      "OperationDate": null,
      "Hypertension": null,
      "DetailDiagnose": null
    }
  }
}])


.controller('mygrouplistCtrl', ['$scope', '$http','$state','Storage', function ($scope, $http, $state,Storage) {
  $scope.mygroups = ""

  $http.get("data/grouplist.json").success(function(data){
    $scope.mygroups = data
  })

  $scope.groupcommunication = function(group){
    Storage.set("groupId",group.groupID) 
    $state.go("tab.groupQRCode")
    //alert(group.groupID)
  }

  $scope.grouppatients = function(group){
    Storage.set("groupId",group.groupID) 
     $state.go("tab.grouppatient")
    //alert(group.groupID)
  }
}])

.controller('grouppatientCtrl', ['$scope', '$http','$state','Storage', function ($scope, $http, $state,Storage) {
  $scope.grouppatients1 = ""
  $scope.grouppatients2 = ""

  $http.get("data/grouppatient1.json").success(function(data){
    $scope.grouppatients1 = data
    $scope.ongoingcounts = data.length
  })

  $http.get("data/grouppatient2.json").success(function(data){
    $scope.grouppatients2 = data
    $scope.finishedcounts = data.length
  })

  $scope.addgroup = function(){
    // $state.go()
  }

  $scope.groupcommunication = function(grouppatient){
    Storage.set("grouppatientID",goruppatient.patientID)
    // $state.go()
    alert(goruppatient.patientID)
  }
}])

.controller('groupQRCodeCtrl', ['$scope', 'Storage', function ($scope, Storage) {
  $scope.groupQRCodedata = "www.baidu.com"
}])