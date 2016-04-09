
module.exports = function(app){

	var ArtworkItem = require('./../models/ArtworkItem.js');
	var UserTagItem = require('./../models/UserTagItem.js');

	app.route('/api/items')
	.get(function(req,res){
		ArtworkItem.find(function(error,doc){
			var newDoc = [];
            doc.forEach(function(item){
                var tagCollector = [];
                item.Tags.forEach(function(subitem) {
                    tagCollector.push(subitem.Tags);
                });

                var tmpObj = {};

				tmpObj.Link = item.Url;
				tmpObj._id = item._id;
				tmpObj.Artistname = item.Artistname;
				tmpObj.Title = item.Title;
				tmpObj.DateText = item.DateText;
				tmpObj.DateLatest = item.DateLatest;
				tmpObj.Tags = tagCollector;
				tmpObj.Url = item.Url + "?mode=width&width=300";
				console.log("ITE: " + JSON.stringify(tmpObj));
				newDoc.push(tmpObj);
			});

			res.send(newDoc);
		})
	})
	.post(function(req,res){
		var artworkItem = new ArtworkItem(req.body);
		artworkItem.save(function(err,data){
			if (err) {
				res.status(501).send();
			} else {
				res.status(200).send(data);
			}
		});
		;
	});

	app.route('/api/items/:id')
	.get(function(req,res){
		ArtworkItem.find({_id:req.params.id},function(error,doc){
			if (error){
				return res.status(404).send();
			}

			res.status(200)
				.send(doc);
		})
	})
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


    app.route('/api/items/:id/tags')
    .post(function(req,res){
        var usertagItem = new UserTagItem({
            Author:req.body.user,
            Tags:req.body.tags,
            RelatedArtwork:req.body.id
        });
        console.log("P " + req.body.id);
        usertagItem.save(function(err,data) {
            if (err) {
                res.status(501).send();
            }
        });

        ArtworkItem
            .findById(req.body.id)
            .select('Tags')
            .exec(
                function(err,artwork) {
                    if (err) {
                        res.status(501).send();
                    } else {

                        console.log(JSON.stringify(artwork));
                        console.log(JSON.stringify(usertagItem));
                        artwork.Tags.push(usertagItem);
                        artwork.save(function(err,aw) {
                            if (err) {
                                console.log(err);
                                res.status(501).send();
                            } else {
                                res.status(200).send();
                            }

                        });
                    }
                })

    })
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
