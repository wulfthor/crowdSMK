
module.exports = function(app) {

    var UserTagItem = require('./../models/UserTagItem.js');

	app.route('/api/usertagitems/:user')
	.get(function(req,res){
		UserTagItem.find({Author: req.params.user}, function(error,doc){
            if (error) {
                return res.status(404).send();
            }
            var newDoc = [];
            var tagArray = [];
            var tmpObj = {};
			doc.forEach(function(item){
				tmpObj.Tags = item.Tags;
				tmpObj.RelatedArtwork = item.RelatedArtwork;
                tagArray.push(item.Tags);
				tmpObj.Author = item.Author;
				newDoc.push(tmpObj);
			});

			res.send(doc);
		}).limit(10)
	})
	.post(function(req,res) {
        var usertagItem = new UserTagItem(req.body);
        usertagItem.save(function (err, data) {
            if (err) {
                res.status(501).send();
            } else {
                res.status(200).send(data);
            }
        })
    });
    /*
	.delete(function(req,res){
		ArtworkItem.find({_id:req.params.id})
		.remove(function(){
		res.status(202)
			.send();
		})
	})
	.patch(function(req,res){
		ArtworkItem.findOne({
			_id:req.body._id
		},function(err,doc){
			if (!doc){
				return res.status(404).send();
			}

			for (var key in req.body){
				doc[key] = req.body[key];
			};
			doc.save();
			res.status(200).send(doc);
		})

	});
	*/

}
