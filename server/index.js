const express = require('express')
const app = express()
const port = 5000
var cors = require('cors')
const { default: axios } = require('axios')
const user = require('./model/users')
const coachTeamSchema = require('./model/coach')
const venue = require('./model/venue')
const match = require('./model/match-details')
const connectDB = require('./config/db');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const JWT_SECRET = 'jkehgkjrabgjkrgbkjaregnmrnjkghau1749823759!@#$%%^&'
const auth = require("./middleware/auth");
connectDB()
app.use(cors())
app.use(express.json())

app.post('/login', async (req, res) => {
  JSON.stringify(req.body)
  const email = req.body.name;
  const password = req.body.password;
  if (email === "admin") {
    const user1 = user.findOne({ email }).lean()
    const token = jwt.sign({
      id: user1._id,
      username: user1.email
    }, JWT_SECRET);
    console.log(token);
    res.json({ username: 'admin', id: 'admin', role: 'admin', token: token });
  }
  else {
    const user1 = await user.findOne({ email }).lean()
    console.log(user1);
    if (await bcrypt.compare(req.body.password, user1.password)) {
      const token = jwt.sign({
        id: user1._id,
        username: user1.email
      }, JWT_SECRET);
      console.log(token);
      res.json({ username: user1.name, id: user1._id, role: user1.role, token: token });
    }
  }
})


app.post('/register', async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  try {
    const response = user.create(req.body);
    res.json("User created " + response);
  } catch (e) {
    if (e.code === 1100) {
      console.log("Username already exists");
    }
    console.log(e);
  }
  res.json(req.body);
})

app.post("/sendteam", auth, (req, res) => {

  try {
    const respoe = coachTeamSchema.create({ teamName: req.body.teamname, coachId: req.body.coachid, team: req.body.team });
    res.json(respoe);

  } catch (e) {
    console.log(e);
  }

})

app.post("/addVenue", auth, (req, res) => {
  try {
    const respoe = venue.create({ placeName: req.body.placename, loaction: req.body.location, description: req.body.description });
    res.json(respoe);
  } catch (e) {
    console.log(e);
  }
})

app.post("/sendVenue", (req, res) => {
  venue.find({}).then((response) => {
    res.send(response)
  }
  ).catch((err) => {
    console.log(err)
  })
})

app.post("/sendTeams", (req, res) => {
  coachTeamSchema.find({}).then((response) => {
    res.send(response)
  }
  ).catch((err) => {
    console.log(err)
  })
})

app.post("/sendRefree", auth, (req, res) => {
  user.find({ role: "Referee" }).then((response) => {
    res.send(response)
  }
  ).catch((err) => {
    console.log(err)
  })
})

app.post("/addschedules", auth, (req, res) => {

  match.deleteMany({}, (resp) => { console.log(resp) });

  const response = match.create({ schedules: req.body.schedules }).then((response) => {
    res.send(response)
  });
  console.log(response);
})

app.post("/getTeam", auth, (req, res) => {
  coachTeamSchema.find({ coachId: req.body.coachid }).then((response) => {
    console.log(response)
    res.send(response)
  }
  ).catch((err) => {
    console.log(err)
  })
})

app.post("/getupcomingmatches", auth, (req, res) => {
  coachTeamSchema.find({ coachId: req.body.coachId }).then((response1) => {
    match.find({
      date: { $gte: req.body.startDate }
      , teama: response1.teamName
      , teamb: response1.teamName
    })
      .then((response) => {
        console.log(response)
        res.send(response)
      })
  })

})
app.post("/getpastmatches", auth, (req, res) => {
  coachTeamSchema.find({ coachId: req.body.coachId }).then((response1) => {
    console.log(response1.teamName);
    match.find({
      date: { $lt: new Date(new Date(req.body.startDate)) }
      , teama: response1.teamName
      , teamb: response1.teamName
    })
      .then((response) => {
        console.log(response)
        res.send(response)
      })
  })
})

app.post("/sendagg", auth, (req, res) => {

  match.aggregate({
    $group: {
      _id: "$date"
    }
  }).then((response) => {
    res.send(response)
  })
})
app.post("/sendallmatches", auth, (req, res) => {
  match.find({}).sort({ date: 1 }).then((response) => {
    res.send(response)
  }
  ).catch((err) => {
    console.log(err)
  })
})
app.post("/sendallvolunteers", auth, (req, res) => {
  user.find({ role: "Volunteer" }).then((response) => {
    res.send(response)
  }
  ).catch((err) => {
    console.log(err)
  })
})

app.post("/searchmatches", (req, res) => {
  console.log(req.body.teamname);
  match.aggregate([
    {$match: {'schedules.venue': req.body.venue}},
    {$project: {
        schedules: {$filter: {
            input: '$schedules',
            as: 'shape',
            cond: {$eq: ['$$shape.venue', req.body.venue]}
        }},
        _id: 0
    }}
]
   ).then((response) => {
      console.log(response)
      res.send(response)
    })
})
app.post("/getteamname",auth,(req,res)=>{
  coachTeamSchema.find({ coachId: req.body.coachid }).then((response1)=>{
    res.send(response1.teamName)
  })
})
const server = app.listen(5000, () => {
  console.log("listening on 5000 port")
})
