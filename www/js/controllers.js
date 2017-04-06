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
.controller('detailCtrl', ['$scope','$state','$rootScope', '$ionicModal','$ionicScrollDelegate','$ionicHistory','$cordovaFile','Camera','voice',function($scope,$state,$rootScope, $ionicModal,$ionicScrollDelegate,$ionicHistory,$cordovaFile,Camera,voice) {
    $scope.test= function(){alert('abc');};
    $scope.input={
        text:''
    }
    $scope.params={
        msgCount:0,
        helpDivHeight:40,
        hidePanel:true
        // helpDivStyle:"{'padding-top':'100px'}"
    }
    $scope.msgs=[];
    $scope.scrollHandle=$ionicScrollDelegate.$getByHandle('myContentScroll');
    //render msgs 
    $scope.$on('$ionicView.beforeEnter',function(){
        getMsg(30);
    });
    $scope.$on('$ionicView.enter',function(){
        $rootScope.conversation.type='single';
        $rootScope.conversation.id=$state.params.chatId;
        if(window.JMessage){
            window.JMessage.enterSingleConversation($state.params.chatId,"");
        }
    })
    function getMsg(num){
        window.JMessage.getHistoryMessages("single",$state.params.chatId,"",$scope.params.msgCount,num,
            function(response){

                var res=JSON.parse(response);
                $scope.$broadcast('scroll.refreshComplete');
                $scope.$apply(function(){
                    for(var i=0;i<res.length;++i) $scope.msgs.unshift(res[i]);    
                });
                console.log($scope.msgs);
                setTimeout(function(){
                    $scope.scrollHandle.scrollBottom();
                },100);
                // $ionicScrollDelegate.scrollBottom();
                $scope.params.msgCount+=res.length;
            },
            function(err){
            });
    }
    function viewUpdate(length,scroll){
        var num = $scope.params.msgCount<length?$scope.params.msgCount:length;
         window.JMessage.getHistoryMessages("single",$state.params.chatId,"",0,num,
            function(response){

                var res=JSON.parse(response);
                $scope.$apply(function(){
                    for(var i=res.length-1,j=$scope.params.msgCount-res.length;i>=0;){
                        if(j==$scope.params.msgCount){
                            $scope.params.msgCount+=i+1;
                            $scope.msgs=$scope.msgs.concat(res.slice(0,i+1));
                            break;
                        }else if($scope.msgs[j]['_id']==res[i]['_id']){
                            $scope.msgs[j]=res[i];
                            ++j;--i;
                        }else{
                             ++j;
                        }

                    }   
                });
                if(scroll){
                    setTimeout(function(){
                        $scope.scrollHandle.scrollBottom();
                    },100);
                }
            },function(){

            });
    }
    // function updateOne(msg){

    // }
    // function addOne(){

    // }
    //receiving new massage
    $scope.$on('receiveMessage',function(event,msg){
        if(msg.targetType=='single' && msg.fromName==$state.params.chatId){
            // event.stopPropagation();
            // msg=JSON.parse(msg);
            viewUpdate(5);
            // $scope.$apply(function(){
            //     $scope.msgs.push(msg);
            // });
            // $scope.params.msgCount+=1;
            // setTimeout(function(){
            //     $ionicScrollDelegate.scrollBottom();
            // },100);
            // $ionicScrollDelegate.scrollBottom();
        }
    });

    // function onGetMsg(res){
    //     res=JSON.parse(res);
    //     $scope.$apply(function(){
    //         for(var i=0;i<res.length;++i) $scope.msgs.unshift(res[i]);    
    //     });
    //     console.log($scope.msgs);
    //     setTimeout(function(){
    //         $ionicScrollDelegate.scrollBottom();
    //     },100);
    //     // $ionicScrollDelegate.scrollBottom();
    //     $scope.params.msgCount+=res.length;
    // }
    // function onGetMsgErr(){
    //     // getMsg();
    // }
    $scope.DisplayMore = function(){
        getMsg(30);
    }
    $scope.scrollBottom = function(){
        $scope.scrollHandle.scrollBottom();
    }
    

    //view image
    $scope.zoomMin=1;
    $scope.imageUrl='';
    $scope.sound={};
    $ionicModal.fromTemplateUrl('templates/msg/imageViewer.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
        // $scope.modal.show();
        $scope.imageHandle=$ionicScrollDelegate.$getByHandle('imgScrollHandle');
    });
    function onImageLoad(path){
        $scope.$apply(function(){
            $scope.imageUrl=path;
        })
        
    }
    function onImageLoadFail(err){

    }
    $scope.$on('image', function(event, args) {
        console.log(args)
        event.stopPropagation();
        $scope.imageUrl=args[2];
        $scope.modal.show();
        if(args[1]=='img'){
            window.JMessage.getOriginImageInSingleConversation($state.params.chatId,args[3],onImageLoad,onImageLoadFail);
        }else{
            // getImage(url,onImageLoad,onImageLoadFail)
            $scope.imageUrl=args[3];
        }
        // $scope.image={src:$scope.msgs[msgIndex].content.localThumbnailPath +'.'+ $scope.msgs[msgIndex].content.format};
        // console.log($scope.allImage);
        // $scope.imageUrl=imageUrl;
        // $scope.showModal('templates/msg/imageViewer.html');
    })
    $scope.$on('voice', function(event, args) {
        console.log(args)
        event.stopPropagation();
        $scope.sound= new Media(args[1],
              function(){
                // resolve(audio.media)
              },function(err){
                console.log(err);
                // reject(err);
              })
        $scope.sound.play();
    })
    $scope.$on('profile', function(event,args) {
        console.log(args)
        event.stopPropagation();
    })
    // $scope.showModal = function(templateUrl) {
        // $ionicModal.fromTemplateUrl(templateUrl, {
            // scope: $scope
        // }).then(function(modal) {
            // $scope.modal = modal;
            // $scope.modal.show();
            // $scope.imageHandle=$ionicScrollDelegate.$getByHandle('imgScrollHandle');
        // });
    // }
    // $scope.getStyle = function(){
    //   let imgHeight=window.document.getElementById('bigPic').height;
    //   let vieheight=
    // }
    $scope.closeModal = function() {
        $scope.imageHandle.zoomTo(1,true);
        $scope.modal.hide();
        // $scope.modal.remove()
    };
    $scope.switchZoomLevel = function(){
      if($scope.imageHandle.getScrollPosition().zoom!=$scope.zoomMin) 
        $scope.imageHandle.zoomTo(1,true);
      else{
        $scope.imageHandle.zoomTo(5,true);
      }
    }
    
    //病例Panel
    $scope.togglePanel = function(){
        $scope.params.hidePanel=!$scope.params.hidePanel;
    }
    $scope.content={
        pics:[
            'img/avatar.png',
            'img/ben.png',
            'img/mike.png'
        ]
    }
    $scope.viewPic = function(url){
        $scope.imageUrl=url;
        $scope.modal.show();
    }
    // function onSuccess(data){
    //   console.log(data);
    //   alert('[send image]:OK')
    // }
    // function onErr(err){
    //     console.log(err);-
    //     alert('[send image]:err');
    // }
    // send message--------------------------------------------------------------------------------
    //
    function onSendSuccess(res){

        // res=JSON.parse(res);
        // console.log(res);
        // $scope.$apply(function(){
        //     $scope.msgs.push(res);
        // });
        // $ionicScrollDelegate.scrollBottom();
        // $scope.params.msgCount+=1;
        viewUpdate(10);
    }
    function onSendErr(err){
        console.log(err);
        alert('[send msg]:err');
        viewUpdate(20);
    }
    // function addNewSend(msgs){
    //     msgs=msgs.JSON.parse(data);
    //     console.log(JSON.parse(data));
    //     for(var i in msgs){
    //         if(msgs[i].fromName==window.JMessage.username)
    //             return addOne(msgs[i]);
    //     }
    // }
    $scope.submitMsg = function(){
        window.JMessage.sendSingleTextMessage($state.params.chatId, $scope.input.text, '', onSendSuccess, onSendErr);
        viewUpdate(5,true);
        // window.JMessage.getHistoryMessages("single",$state.params.chatId,"",0,3,addNewSend,null);
        $scope.input.text='';
    }
    //get image
    $scope.getImage = function(type){
        Camera.getPicture(type)
        .then(function(url){
            console.log(url);

            window.JMessage.sendSingleImageMessage($state.params.chatId, url, '', onSendSuccess, onSendErr);
            viewUpdate(5,true);
            // window.JMessage.getHistoryMessages("single",$state.params.chatId,"",0,3,addNewSend,null);

        },function(err){
            console.log(err)
        })
    }
    //get voice
    $scope.getVoice = function(){
        //voice.record() do 3 things: record --- file manipulation --- send
        voice.record($state.params.chatId)
        .then(function(res){
            console.log(res);
            viewUpdate(5,true);
        },function(err){
            console.log(err);
        });
    }
    $scope.stopAndSend =function(){
        voice.stopRec();
    }



    $scope.goChats = function(){
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('tab.doing');
    }
    

    $scope.$on('keyboardshow',function(event,height){
        $scope.params.helpDivHeight=height+40;
        setTimeout(function(){
            $scope.scrollHandle.scrollBottom();
        },100);
        
    })
    $scope.$on('keyboardhide',function(event){
        $scope.params.helpDivHeight=40;
        // $ionicScrollDelegate.scrollBottom();
    })
    $scope.$on('$ionicView.leave',function(){
        $scope.modal.remove();
        $rootScope.conversation.type=null;
        $rootScope.conversation.id='';
      window.JMessage.exitConversation();
    })
}])
// .controller('detailCtrl', ['$scope','$state','$interval','$rootScope', 'Storage',  function($scope, $state,$interval,$rootScope,Storage) {
//   $scope.barwidth="width:0%";
//   $scope.detail={
// 	      head:"mike.png",
// 		  name:"王二头",
// 		  gender:"男",
// 		  age:"32",
// 		  time:"2017/3/28 10:32",
// 		  qs:"问题2" ,
// 		  symptom:"肾内科障碍",
// 		  type:"肾内科",
// 		  desc:"医生你好，我想咨询一下"
//         };
// }])

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


.controller('mygrouplistCtrl', ['$scope', '$http','$state','$ionicPopover','Storage', function ($scope, $http, $state,$ionicPopover,Storage) {
  $scope.mygroups = ""

  $http.get("data/grouplist.json").success(function(data){
    $scope.mygroups = data
  })
  var options=[{
        name:'搜索团队',
        href:'#/tab/groups/search'
    },{
        name:'新建团队',
        href:'#/tab/newgroup'
    }]
    $scope.$on('$ionicView.enter',function(){
        $ionicPopover.fromTemplateUrl('partials/group/pop-menu.html', {
          scope: $scope,
        }).then(function(popover) {
          $scope.options=options;
          $scope.popover = popover;
        });
    })
    $scope.enterChat = function(id){
        $state.go('tab.group-chat',{groupId:id});
    }
    $scope.$on('$ionicView.beforeLeave',function(){
        if($scope.popover)$scope.popover.hide();
    })

  

  $scope.groupcommunication = function(group){
    $state.go('tab.group-chat',{groupId:group.groupID,type:1});
    // Storage.set("groupId",group.groupID) 
    // $state.go("tab.groupQRCode")
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
    $state.go('tab.group-chat',{groupId:grouppatient.patientID,type:2});
    // Storage.set("grouppatientID",grouppatient.patientID)
    // $state.go()

    // alert(goruppatient.patientID)
  }
}])

// .controller('groupQRCodeCtrl', ['$scope', 'Storage', function ($scope, Storage) {
//   $scope.groupQRCodedata = "www.baidu.com"
// }])
.controller('GroupsCtrl', ['$scope','$state','$ionicPopover',function($scope,$state,$ionicPopover) {
    var options=[{
        name:'搜索团队',
        href:'#/tab/groups/search'
    },{
        name:'新建团队',
        href:'#/tab/newgroup'
    }]
    $scope.$on('$ionicView.enter',function(){
        $ionicPopover.fromTemplateUrl('templates/pop-menu.html', {
          scope: $scope,
        }).then(function(popover) {
          $scope.options=options;
          $scope.popover = popover;
        });
        // $rootScope.conversation.type='single';
        // $rootScope.conversation.id=$state.params.chatId;
        // if(window.JMessage){
        //     window.JMessage.enterSingleConversation($state.params.chatId,"");
        //     getMsg();
        // }
    })
    $scope.enterChat = function(id){
        $state.go('tab.group-chat',{groupId:id});
    }
    $scope.$on('$ionicView.beforeLeave',function(){
        $scope.popover.hide();
    })
}])
.controller('NewGroupCtrl', ['$scope','$state',function($scope,$state){
    $scope.addMember = function(){
        $state.go('tab.group-add-member');
    }
    $scope.group={
        id:$state.params.groupId,
        name:'折翼肾病管家联盟',
        admin:'ABC',
        number:15,
        locale:'中国杭州',
        createAt:'2016-1-1',
        description:'Material takes cues from contemporary architecture, road signs, pavement marking tape, and athletic courts. Color should be unexpected and vibrant.',
        members:[
            {url:'img/ben.png',name:'Green'},
            {url:'img/perry.png',name:'Gray'},
            {url:'img/adam.jpg',name:'White'},
            {url:'img/max.png',name:'Blue'},
            {url:'img/ben.png',name:'Black'},
            {url:'img/max.png',name:'Blue'},
            {url:'img/ben.png',name:'Nat King Cole'}
        ]
    }
}])
.controller('GroupsSearchCtrl',['$scope','$state',function($scope,$state){
    $scope.viewGroupInfo= function(id){
        $state.go('tab.group-add',{groupId:id});
    }
}])
.controller('GroupAddCtrl',['$scope','$state',function($scope,$state){
    console.log($state);
    $scope.group={
        id:$state.params.groupId,
        name:'折翼肾病管家联盟',
        admin:'ABC',
        number:15,
        locale:'中国杭州',
        createAt:'2016-1-1',
        description:'Material takes cues from contemporary architecture, road signs, pavement marking tape, and athletic courts. Color should be unexpected and vibrant.',
        members:[
            {url:'img/ben.png',name:'Green'},
            {url:'img/perry.png',name:'Gray'},
            {url:'img/adam.jpg',name:'White'},
            {url:'img/max.png',name:'Blue'},
            {url:'img/ben.png',name:'Black'}
        ]
    }
}])
.controller('GroupDetailCtrl',['$scope','$state','$ionicModal',function($scope,$state,$ionicModal){
    $scope.addMember = function(){
        $state.go('tab.group-add-member',{groupId:$scope.group.id});
    }
    // $scope.showQRCode = function(){

    // }
    // $scope.zoomMin=1;
    // $scope.imageUrl='';
    // $ionicModal.fromTemplateUrl('templates/qr-code.html', {
    //     scope: $scope
    // }).then(function(modal) {
    //     $scope.modal = modal;
    //     // $scope.modal.show();
    //     // $scope.imageHandle=$ionicScrollDelegate.$getByHandle('imgScrollHandle');
    // });
    $scope.showQRCode = function() {
        $state.go('tab.group-qrcode',{groupId:$scope.group.id});
    }
    $scope.closeModal = function() {
        // $scope.imageHandle.zoomTo(1,true);
        $scope.modal.hide();
        $scope.modal.remove()
    };
    $scope.group={
        id:$state.params.groupId,
        name:'折翼肾病管家联盟',
        admin:'ABC',
        number:15,
        locale:'中国杭州',
        createAt:'2016-1-1',
        description:'Material takes cues from contemporary architecture, road signs, pavement marking tape, and athletic courts. Color should be unexpected and vibrant.',
        members:[
            {url:'img/ben.png',name:'Green'},
            {url:'img/perry.png',name:'Gray'},
            {url:'img/adam.jpg',name:'White'},
            {url:'img/max.png',name:'Blue'},
            {url:'img/ben.png',name:'Black'},
            {url:'img/ben.png',name:'Green'},
            {url:'img/perry.png',name:'Gray'},
            {url:'img/adam.jpg',name:'White'},
            {url:'img/max.png',name:'Blue'},
            {url:'img/ben.png',name:'Black'},
            {url:'img/ben.png',name:'Green'},
            {url:'img/perry.png',name:'Gray'},
            {url:'img/adam.jpg',name:'White'},
            {url:'img/max.png',name:'Blue'},
            {url:'img/adam.jpg',name:'White'},
            {url:'img/max.png',name:'Blue'},
            {url:'img/ben.png',name:'Nat King Cole'}
        ]
    }
}])
.controller('GroupQrcodeCtrl',['$scope','$state',function($scope,$state){
    $scope.params={
        // groupId:$state.params.groupId
        groupId: '123123123'

    }
}])
.controller('GroupAddMemberCtrl',['$scope','$state',function(){
    //get groupId via $state.params.groupId

}])
.controller('GroupChatCtrl',['$scope','$state','$rootScope',function($scope,$state,$rootScope){
  $scope.params={
      type:$state.params.type,
      groupId:$state.params.groupId,
        msgCount:0,
        helpDivHeight:40,
        hidePanel:true,
        isDiscuss:false
        // helpDivStyle:"{'padding-top':'100px'}"
    }
    $scope.$on('$ionicView.beforeEnter',function(){
      if($scope.params.type==2)$scope.params.isDiscuss=true;
    })
    $scope.$on('$ionicView.enter',function(){
        $rootScope.conversation.type='group';
        $rootScope.conversation.id=$state.params.groupId;
        if(window.JMessage){
            window.JMessage.enterSingleConversation($state.params.chatId,"");
            getMsg();
        }
    })
    $scope.togglePanel = function(){
        $scope.params.hidePanel=!$scope.params.hidePanel;
    }
    $scope.content={
        pics:[
            'img/avatar.png',
            'img/ben.png',
            'img/mike.png'
        ]
    }
    $scope.group={
        name:'BME319',
        id:$state.params.groupId,

    }

}]);