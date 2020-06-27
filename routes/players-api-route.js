const db = require("../models");

const nba = require("nba-api-client");

var options = {formatted: true, parameters: true}
// nba.teamDetails({ TeamID: 1610612752 }, options).then(function (res) {
//   console.log(res);
// });

nba.teamPlayerStats({TeamID: 1610612745, MeasureType: 'Advanced', Season: '2017-18', SeasonType: 'Playoffs'}).then(function(data){
  console.table(data);
})

// console.table(nba.getPlayerID("James Harden"));

// console.table(nba.getTeamID("New York Knicks"));

module.exports = function (app) {
  // Find all players and return them to the user with res.json
  app.get("/api/players", async function (req, res) {
    const dbPlayer = await db.player.findAll({
       include: [db.team]
    });
    res.json(dbPlayer);
  });

  app.post("/api/players", async function (req, res) {
    // Create an players with the data available to us in req.body
    console.log(req.body);
    const dbPlayer = await db.player.create(req.body);
    res.json(dbPlayer);
  });

console.log(db.player);

  app.get("/api/players/:id", async function (req, res) {
    // Find one  players with the id in req.params.id and return them to the user with res.json
    const dbPlayer = await db.player.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.team]
    });
    console.log("hello");
    res.json(dbPlayer);
  });

  app.delete("/api/players/:id", async function (req, res) {
    // Delete the  players with the id available to us in req.params.id
    const dbPlayer = await db.player.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(dbPlayer);
  });
};
