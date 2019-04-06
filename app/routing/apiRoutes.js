
var friendsData = require("../data/friends");

module.exports = function(app){
    
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

    
    app.post("/api/friends", function(req, res){
        var newFriend = req.body;

        var allFriendDiffArr = [];
        
        for(var i =0; i < friendsData.length; i++){
            
            var totalDifference = 0;

            
            var roundFriendScores = friendsData[i].scores;
            for(var j = 0; j < roundFriendScores.length; j++){
                var searchFriend = parseInt(roundFriendScores[j])
                var testFriend = parseInt(newFriend.scores[j])

                var questionDiff = Math.abs(searchFriend - testFriend);
                totalDifference += questionDiff;
            }
            
            allFriendDiffArr.push(totalDifference);
        }
        
        res.json(closestFriend(allFriendDiffArr));

        
        friendsData.push(newFriend);
    });

    function closestFriend(arr){
        
        var min = Math.min.apply(null, arr);
        
        var indices = [];
        var index = arr.indexOf(min);
        while (index != -1) {
            indices.push(index);
            index = arr.indexOf(min, index + 1);
        }
        
        var closestArr = [];
        for(var i = 0; i < indices.length; i++){
            var closeIndex = indices[i];
            closestArr.push(friendsData[closeIndex]);
        }
        return closestArr;
    }
};