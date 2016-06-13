var demo = angular.module("widget", ["RongWebIMWidget"]);
demo.controller("main", ["$scope", "WebIMWidget", function($scope,WebIMWidget) {
  angular.element(document).ready(function() {
    WebIMWidget.init({
      appkey: "c9kqb3rdklwcj",
      // token: "5FYwSlFu7N5kIDkBnDvvHwRGRBzxPWlUi2kesloL0c+iHzTDQyurYf2/cDS7CRZXFUDjx4X+BOE=", // f2
      token: "dBTXnjKboFZeBRj4C+Ia2gRGRBzxPWlUi2kesloL0c/sTRa+iYFhLvWQYTbKZv5JzBwGXo9KMHs=", // f1
      style: {
        width: 600,
        positionFixed: false,
        bottom: 20,
        left: 300
      },
      displayConversationList: true,
      conversationListPosition: WebIMWidget.EnumConversationListPosition.left,
      onSuccess: function(id){
        // PRIVATE 私聊，GROUP 群聊
        WebIMWidget.setConversation(WebIMWidget.EnumConversationType.GROUP, "g1", "群1", true);
        // WebIMWidget.setConversation(WebIMWidget.EnumConversationType.PRIVATE, "f3", "李四3", true);
        // WebIMWidget.setConversation(WebIMWidget.EnumConversationType.PRIVATE, "f2", "fanwei", true);
        // WebIMWidget.setConversation(WebIMWidget.EnumConversationType.PRIVATE, "f1", "张三1", true);
      },
      onError: function(error){
        var errorCode = error.code;
        var info = "";
        switch (errorCode) {
          case 0:
            info = "token 无效";
            break;
          default:
            info = "";
        }
        console.log(info);
        console.log(errorCode);
      }
    });

    WebIMWidget.show();
    
    WebIMWidget.setUserInfoProvider(function(targetId,obj){
      var user;
      userlist = [
      {"id": "f1", "name":"张三1", "portraitUri": "", "sendShow": true},
      {"id": "f2", "name":"fanwei", "portraitUri": "", "sendShow": true},
      {"id": "f3", "name":"李四3", "portraitUri": "", "sendShow": true}
      ]
      

      userlist.forEach(function(item){
        if(item.id==targetId){
          user=item;
        }
      })

      if(user){
        obj.onSuccess({ id: user.id, name: user.name, portraitUri: user.portraitUri, sendShow: user.sendShow });
      }
    });

    WebIMWidget.setGroupInfoProvider(function(targetId,obj){
      var group;
      grouplist = [
      {"id": "g1", "name": "群1", "portraitUri": "", "sendShow": true}
      ]

      grouplist.forEach(function(item){
        if(item.id==targetId){
          group=item;
        }
      })

      if(group){
        obj.onSuccess({name: group.name, portraitUri: group.portraitUri, sendShow: group.sendShow });
      }
    });




    // WebIMWidget.setConversation(WebIMWidget.EnumConversationType.PRIVATE,"f3","张三");
  });
}]);