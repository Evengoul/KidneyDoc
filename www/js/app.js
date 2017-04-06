// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('kidney',['ionic','kidney.services','kidney.controllers'])

.run(function($ionicPlatform, $state, Storage, $location, $ionicHistory, $ionicPopup) {
	$ionicPlatform.ready(function() {

	    //是否登陆
	    var isSignIN=Storage.get("isSignIN");
	    if(isSignIN=='YES'){
			$state.go('tabs.home');
	    }
	
		//用户ID
		var userid='';
   
	    if(window.cordova && window.cordova.plugins.Keyboard) {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

			// Don't remove this line unless you know what you are doing. It stops the viewport
			// from snapping when text inputs are focused. Ionic handles this internally for
			// a much nicer keyboard experience.
			cordova.plugins.Keyboard.disableScroll(true);
	    }
	    if(window.StatusBar) {
	    	StatusBar.styleDefault();
	    }
	});
})

// --------路由, url模式设置----------------
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js

	//android导航栏在顶部解决办法
	$ionicConfigProvider.platform.android.tabs.style('standard');
	$ionicConfigProvider.platform.android.tabs.position('standard');
	  
	//注册与登录
	$stateProvider
	//登陆
	.state('signin', {
		cache: false,
		url: '/signin',
		templateUrl: 'partials/login/signin.html',
		controller: 'SignInCtrl'
	})
    .state('phonevalid', {
		url: '/phonevalid',
		cache: false,
		templateUrl: 'partials/login/phonevalid.html',
		controller: 'phonevalidCtrl'
    })
    
	
	//选项卡
	.state('tab', {
		url: '/tab',
		abstract: true,
		templateUrl: 'templates/tabs.html'
    }) 
	
	//主页面
	.state('tab.home', {
		//cache: false,
		url: '/home',
		views: {
			'tab-home':{
				controller: 'homeCtrl',
				templateUrl: 'partials/tabs/home/homepage.html'
			}
		}
	})
		
	//咨询
	.state('tab.consult', {
		//cache: false,
		url: '/consult',
		views: {
			'tab-consult':{
				controller: 'consultCtrl',
				templateUrl: 'partials/tabs/consult/consult.html'
			}
		}
	})

	//进行中
	.state('tab.doing', {
		// cache: false,
		url: '/doing',
		views: {
			'tab-consult':{
				controller: 'doingCtrl',
				templateUrl: 'partials/tabs/consult/doing.html'
			}
		}
	})
	//进行中详情
	.state('tab.detail', {
		// cache: false,
		url: '/detail',
		views: {
			'tab-consult':{
				controller: 'detailCtrl',
				templateUrl: 'partials/tabs/consult/detail.html'
			}
		}
	})
	//已完成
	.state('tab.did', {
		// cache: false,
		url: '/did',
		views: {
			'tab-consult':{
				controller: 'didCtrl',
				templateUrl: 'partials/tabs/consult/did.html'
			}
		}
	})
			
	//患者页面
	.state('tab.patient', {
		// cache: false,
		url: '/patient',
		views: {
			'tab-patient':{
				controller: 'patientCtrl',
				templateUrl: 'partials/tabs/patient/patient.html'
			}
		}
	})  
	//患者详情页面
	.state('tab.patientDetail', {
		// cache: false,
		url: '/patientDetail',
		views: {
			'tab-patient':{
				controller: 'patientDetailCtrl',
				templateUrl: 'partials/tabs/patient/patientDetail.html'
			}
		}
	})
	.state('tab.DoctorDiagnose', {
		// cache: false,
		url: '/DoctorDiagnose',
		views: {
			'tab-patient':{
				controller: 'DoctorDiagnoseCtrl',
				templateUrl: 'partials/patient/DoctorDiagnose.html'
			}
		}
	})

	// .state('DoctorDiagnose', {
 //      url: '/DoctorDiagnose',
 //      templateUrl: 'partials/patient/DoctorDiagnose.html',
 //      controller: 'DoctorDiagnoseCtrl'
 //    })
		
	//交流页面
	.state('tab.communication', {
		// cache: false,
		url: '/communication',
		views: {
			'tab-communication':{
				controller: 'mygrouplistCtrl',
				templateUrl: 'partials/group/mygrouplist.html'
			}
		}
	})
    /////tuandui
    .state('tab.grouppatient', {
		// cache: false,
		url: '/grouppatient',
		views: {
			'tab-communication':{
				controller: 'grouppatientCtrl',
				templateUrl: 'partials/group/grouppatient.html'
			}
		}
	})
	.state('tab.groupQRCode', {
		// cache: false,
		url: '/groupQRCode',
		views: {
			'tab-communication':{
				controller: 'groupQRCodeCtrl',
				templateUrl: 'partials/group/groupQRCode.html'
			}
		}
	})
		
	//"我"页面
	.state('tab.me', {
		// cache: false,
		url: '/me',
		views: {
			'tab-me':{
				controller: 'meCtrl',
				templateUrl: 'partials/tabs/me/mepage.html'
			}
		}
	})
	//我的二维码
	.state('tab.QRcode', {
		// cache: false,
		url: '/qrcode',
		views: {
			'tab-me':{
				controller: 'QRcodeCtrl',
				templateUrl: 'partials/tabs/me/qrcode.html'
			}
		}
	})
			
	//我的信息
	.state('tab.myinfo', {
		// cache: false,
		url: '/myinfo',
		views: {
			'tab-me':{
				controller: 'myinfoCtrl',
				templateUrl: 'partials/tabs/me/myinfo.html'
			}
		}
	})
			
	//收费定制
	.state('tab.myfee', {
		// cache: false,
		url: '/myfee',
		views: {
			'tab-me':{
				controller: 'myfeeCtrl',
				templateUrl: 'partials/tabs/me/myfee.html'
			}
		}
	})

	//我的评价
	.state('tab.feedback', {
		// cache: false,
		url: '/feedback',
		views: {
			'tab-me':{
				controller: 'feedbackCtrl',
				templateUrl: 'partials/tabs/me/feedback.html'
			}
		}
	})

	//设置
	.state('tab.set', {
		// cache: false,
		url: '/set',
		views: {
			'tab-me':{
				controller: 'setCtrl',
				templateUrl: 'partials/tabs/me/set.html'
			}
		}
	})
	// 设置内容页
	.state('tab.set-content', {
		url: '/me/set/set-content/:type',
			views: {
			'tab-me': {
				templateUrl: 'partials/tabs/me/set/set-content.html',
				controller: 'set-contentCtrl'
			}
		}
	})

	//关于
	.state('tab.about', {
		// cache: false,
		url: '/about',
		views: {
			'tab-me':{
				controller: 'myinfoCtrl',
				templateUrl: 'partials/tabs/me/about.html'
			}
		}
	})


	$urlRouterProvider.otherwise('/signin');

});   


 
