var demo = angular.module("widget", ["RongWebIMWidget"]);
demo.controller("main", ["$scope", "WebIMWidget", function($scope,WebIMWidget) {
  angular.element(document).ready(function() {
    WebIMWidget.init({
      appkey: "c9kqb3rdklwcj",
      token: "ngIjxKIKtcZbrEJcYFsjkJd0d70yTO5eXlGYpPD6C2HBW4YF26lf/8emO0ff8n/hLipiFxpV/YvB/n+h21FKXA==",
      style: {
        width: 600,
        positionFixed: true,
        bottom: 20,
        left: 300
      },
      displayConversationList: true,
      conversationListPosition: WebIMWidget.EnumConversationListPosition.left,
      onSuccess: function(id){
        WebIMWidget.setConversation(1, "f3", "李四3");
        console.log(id);
      },
      onError: function(error){
        console.log("error:" + error);
      }
    });

    WebIMWidget.show();
    var user;
    userlist = [
    {"id":"f1","name":"张三1","portraitUri":""},
    {"id":"f2","name":"fanwei","portraitUri":""},
    {"id":"f3","name":"李四3","portraitUri":""}
    ]
    userlist.forEach(function(user){
      WebIMWidget.setUserInfoProvider(function(targetId,obj){
        obj.onSuccess({id:user.id,name:user.name,portraitUri:user.portraitUri});
      });
    });


    // WebIMWidget.setConversation(WebIMWidget.EnumConversationType.PRIVATE,"f3","张三");
  });
}]);