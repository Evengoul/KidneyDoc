angular.module('kidney.services', ['ionic'])

// 本地存储函数
.factory('Storage', ['$window', function ($window) {
  return {
    set: function(key, value) {
      $window.localStorage.setItem(key, value);
    },
    get: function(key) {
      return $window.localStorage.getItem(key);
    },
    rm: function(key) {
      $window.localStorage.removeItem(key);
    },
    clear: function() {
      $window.localStorage.clear();
    }
  };
}])

//自定义函数
//登录
.service("loginFactory",function(Storage){
	var service={};
	var flag=false;
	var userid;//用户ID
	
	this.isLogin=function(user,pwd){
		//账户写死
		if(user=="13709553333"&&pwd=="123") 
		{
			userid="D201703240001";
			Storage.set('userid',userid);//存储全局变量userid,通过本地存储
			flag=true;
		}
		if(user=="13709553334"&&pwd=="123") 
		{
			userid="D201703240002";
			Storage.set('userid',userid);//存储全局变量userid,通过本地存储
			flag=true;
		}
		return flag;
	}
	
	//return service;
})

//我
.factory("meFactory",function(){
	var service={};
	// var flag=false;
	// var userid;//用户ID
	// if(Storage.get('userid')!=null){
		// userid=Storage.get('userid');
	// };	
	service.GetDoctorInfo=function(uid){
		  var  result;//待返回json
		  var doctors=[
		  {
			  photoUrl:"max.png",
			  userId:"D201703240001",
			  name:"小丁",
			  gender:"男",
			  title:"主任医生",
			  workUnit:"浙江XXX医院",
			  department:"泌尿科",
			  major:"肾上腺分泌失调"
          },
		  {
			  photoUrl:"ben.png",
			  userId:"D201703240002",
			  name:"小李",
			  gender:"女",
			  title:"主任医生",
			  workUnit:"浙江XXX医院",
			  department:"泌尿科2",
			  major:"慢性肾炎、肾小管疾病"
          }
		  ];
		  for(var i=0;i<doctors.length;i++){
			  var doctor=doctors[i];
			  if(doctors[i].userId==uid)
			  {
				  result=doctor;
				  break;
			  }
		  }
		  return result;
	}
	return service;
})




