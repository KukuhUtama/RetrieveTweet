TweetModule.controller('HomeController', HomeController);

HomeController.$inject = ['$scope', '$location','ngTableParams','TweetService'];

function HomeController($scope, $location, ngTableParams, TweetService) {
     
     $scope.title = "Home";
     $scope.tweets = []; //array of tweets
     $scope.tweet = '';
     $scope.user= {};
     $scope.message = '';
   
     buttonInit();
     TweetService.initialize();

    $scope.reloadTable = function(){
       $scope.tweetsTable.reload();
    }
    
    $scope.tweetsTable = new ngTableParams({
        page: 1,
        count: 10
    }, {
        total: $scope.randomLength,
        getData: function ($defer, params) {
           if (TweetService.isReady()) {
                 $scope.data=[];
                 TweetService.getLatestTweets(200).then(function(data) {
                 $scope.tweets = $scope.tweets.concat(data);
                 $scope.data = $scope.tweets;
                 params.total($scope.data.length);
                 $defer.resolve($scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count())); 
                 }, function() {
                 console.log("Something bad happen");
                 });
           } else {
               $scope.message = "Connect twitter first";
           }
        }
    });
    
    //when the user clicks the connect twitter button, the popup authorization window opens
    $scope.connectButton = function() {
        TweetService.connectTwitter().then(function() {
            if (TweetService.isReady()) {
                //if the authorization is successful, hide the connect button and display tweet, sign out button
                $('#connectButton').fadeOut(function() {
                    $('#tweetButton, #signOut').fadeIn();
                });
                $scope.message = '';
            } else {

            }
        });
    }

    //sign out clears the OAuth cache, the user will have to reauthenticate when returning
    $scope.signOut = function() {
        TweetService.clearCache();
        $scope.tweets.length = 0;
         $('#tweetButton, #signOut').fadeOut(function() {
             $('#connectButton').fadeIn();
        });
    }
  
    if (TweetService.isReady()) {
        $('#connectButton').hide();
        $('#tweetButton, #signOut').show();
    }
    
    $scope.postTweet = function(){
        TweetService.postTweet($scope.tweet);
        $scope.tweet='';
    }
    
    $scope.getUser = function(){
        if (TweetService.isReady()) {
           TweetService.getCredential().then(function(data){
               $scope.user=data;
            }, function(){
                console.log("Something bad happen");
           });
        } else {
             $scope.message = "Connect twitter first";
        }
    }
    
    function buttonInit(){
        $('#connectButton').show();
        $('#tweetButton').hide();
        $('#signOut').hide();
    }
    
}