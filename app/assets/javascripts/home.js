var demo = angular.module("widget", ["RongWebIMWidget"]);
demo.controller("main", ["$scope", "WebIMWidget", function($scope,WebIMWidget) {
  angular.element(document).ready(function() {
    WebIMWidget.init({
      appkey: "c9kqb3rdklwcj",
      token: "5FYwSlFu7N5kIDkBnDvvHwRGRBzxPWlUi2kesloL0c+iHzTDQyurYf2/cDS7CRZXFUDjx4X+BOE=",
      style: {
        width: 600,
        positionFixed: true,
        bottom: 20,
        left: 300
      },
      displayConversationList: true,
      conversationListPosition: WebIMWidget.EnumConversationListPosition.left,
      onSuccess: function(id){
        WebIMWidget.setConversation(1, "f1", "张三1");
        console.log(id);
      },
      onError: function(error){
        console.log("error:" + error);
      }
    });

    WebIMWidget.show();
    
      WebIMWidget.setUserInfoProvider(function(targetId,obj){
        var user;
        userlist = [
        {"id":"f1","name":"张三1","portraitUri":""},
        {"id":"f2","name":"fanwei","portraitUri":""},
        {"id":"f3","name":"李四3","portraitUri":""}
        ]
        

        userlist.forEach(function(item){
          if(item.id==targetId){
            user=item;
          }
        })

        if(user){
          obj.onSuccess({id:user.id,name:user.name,portraitUri:user.portraitUri});
        }
      });




    // WebIMWidget.setConversation(WebIMWidget.EnumConversationType.PRIVATE,"f3","张三");
  });
}]);