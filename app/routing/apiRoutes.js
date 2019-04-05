// Friends Data
var friendsData = require("../data/friends");

module.exports = function(app){
    // GET Friend Data
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

    // POST newFriend Data
    app.post("/api/friends", function(req, res){
        var newFriend = req.body;

        var allFriendDiffArr = [];
        // loop through all friends in friendsData
        for(var i =0; i < friendsData.length; i++){
            // total difference for each friendsData
            var totalDifference = 0;

            // loop through scores and compare newFriend to current friend (roundFriendScores)
            var roundFriendScores = friendsData[i].scores;
            for(var j = 0; j < roundFriendScores.length; j++){
                var searchFriend = parseInt(roundFriendScores[j])
                var testFriend = parseInt(newFriend.scores[j])

                var questionDiff = Math.abs(searchFriend - testFriend);
                totalDifference += questionDiff;
            }
            // added to arr for later check
            allFriendDiffArr.push(totalDifference);
        }
        // function to find the closest friends
        res.json(closestFriend(allFriendDiffArr));

        // add last to prevent matching friend with itself
        friendsData.push(newFriend);
    });

    function closestFriend(arr){
        //find smallest totalDifference
        var min = Math.min.apply(null, arr);
        //find indices of the smallest differences
        var indices = [];
        var index = arr.indexOf(min);
        while (index != -1) {
            indices.push(index);
            index = arr.indexOf(min, index + 1);
        }
        //find each of the closest friend(s)
        var closestArr = [];
        for(var i = 0; i < indices.length; i++){
            var closeIndex = indices[i];
            closestArr.push(friendsData[closeIndex]);
        }
        return closestArr;
    }
};