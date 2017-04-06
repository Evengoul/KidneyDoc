angular.module('zjubme.filters', [])
.filter('sex', function() {
    return function(input) {
        switch (input) {
            case '1':
                return '男';
                break;
            case '2':
                return '女';
                break;
            case '3':
                return '其他';
                break;
            case 'null':
                return '未知';
                break;
        }
    };
})
.filter('msgdate', ['$filter', function($filter) {
    return function(milliseconds) {
        var curTime = new Date();
        var msgTime = new Date(milliseconds);
        if (curTime.toDateString() == msgTime.toDateString()) return $filter('date')(msgTime, 'h:mm a');
        return $filter('date')(msgTime, 'M/d/yy h:mm a');
    }
}])
.filter('age', function() {
    return function(input) {
        return input ? '30' : '20';
    };
});

