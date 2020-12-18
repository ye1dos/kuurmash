const MongoClient = require("mongodb").MongoClient;

const mongoClient = new MongoClient(process.env.MONGO_URL, { useNewUrlParser: true });

module.exports = {
getRandom: (req, res) => {
    MongoClient.connect(process.env.MONGO_URL ,function (err, client) {
        if (err) console.error(err);
        const db = client.db("mydb");
        const collection = db.collection("sst");

        collection.aggregate([{ $match: { gender: 'Female' } }, { $sample: { size: 2 } }]).toArray((err, result) => {
            if (err) console.error(err);
            else {
                res.setHeader('Content-Type', 'application/json');
                //console.log(result);
                res.send(JSON.stringify(result));
                // res.send("hiii")
            }
        });
        client.close();
    });
}
,

updScore: (req, res) => {
    mongoClient.connect(function (err, client) {
        if (err) console.error(err);
        const db = client.db("mydb");
        const collection = db.collection("sst");

        const query = { $or: [{name: req.body.winner}, {name: req.body.loser}] };
        collection.find(query).toArray((err, result) => {
            // res.send(query)
            // res.send(result)
            if (err) {console.error(err);}
            else {
                res.send(query)
                let winnerScore = 0;
                let loserScore = 0;

                if (req.body.winner === result[0].name) {
                    winnerScore = result[0].score;
                    loserScore = result[1].score;
                } else {
                    winnerScore = result[1].score;
                    loserScore = result[0].score;
                }


                let newWinScore = winnerScore + 20;
                let newLoseScore = loserScore - 20;
                collection.updateOne({ name: req.body.winner }, { $set: { score: newWinScore }});
                collection.updateOne({ name: req.body.loser }, { $set: { score: newLoseScore }});
                // client.close();
                // res.send("Match data updated.");
            }
        });
        // client.close();
    });
}
,
getTop: (req, res) => {
    mongoClient.connect(function (err, client) {
        if (err) console.error(err);
        const db = client.db("mydb");
        const collection = db.collection("sst");

        collection.find({gender: "Female"}).sort({ score: -1 }).toArray((err, result) => {
            if (err) {console.log(err);}
            else {
                res.setHeader("Content-Type", "application/json");
                // res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(result));
                // client.close();
            }
        });
    });
},

}