TweetModule.service('TweetService', TweetService);

TweetService.$inject = ['$http', '$q', 'commonEnum'];

function TweetService($http, $q, commonEnum) {
       var authorizationResult = false;
       
        var TweetService = {
              initialize: initialize,
              isReady:  isReady,
              connectTwitter:  connectTwitter,
              clearCache: clearCache,
              getLatestTweets: getLatestTweets,
              postTweet: postTweet,
              getCredential: getCredential 
       }
 
       return TweetService;
       
       function initialize(){
            OAuth.initialize('B6xg4wJ5HZgvBAhp9edwdTabr58', {
                cache: true
            });
            authorizationResult = OAuth.create("twitter");
       }
       
       function isReady(){
            return (authorizationResult);
       }
       
       function connectTwitter(){
            var deferred = $q.defer();
            OAuth.popup("twitter", {
                cache: true
            }, function(error, result) {
                if (!error) {
                    authorizationResult = result;
                    deferred.resolve();
                } else {
                  

                }
            });
            return deferred.promise;
       }
       
       
       function clearCache(){
            OAuth.clearCache('twitter');
            authorizationResult = false;
       }
       
       function  getLatestTweets(count){
           
            var deferred = $q.defer();
            var url='/1.1/statuses/user_timeline.json';
            if (count) {
                url += '?count=' + count;
            }
            var promise = authorizationResult.get(url).done(function(data) {
                deferred.resolve(data);
            }).fail(function(err) {
                deferred.reject(err);
            });
            
            return deferred.promise;
       }
       
       function postTweet(updateStatus){
            var deferred = $q.defer();
            var url='/1.1/statuses/update.json';
            if (updateStatus) {
                url += '?status=' + updateStatus;
            }
            var promise = authorizationResult.post(url).done(function(data) {
                deferred.resolve(data);
            }).fail(function(err) {
                deferred.reject(err);
            });
            
            return deferred.promise;
       }
       
       function getCredential(){
            var deferred = $q.defer();
            var url='/1.1/account/verify_credentials.json';
            var promise = authorizationResult.get(url).done(function(data) {
                deferred.resolve(data);
            }).fail(function(err) {
                deferred.reject(err);
            });
            
            return deferred.promise;
       }
}