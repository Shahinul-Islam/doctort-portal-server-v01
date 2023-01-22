const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = 5000;

//middleware
app.use(cors());
app.use(express.json());

// db_name = "doctors_portal"
// db_password = "ZF1tCSw40OfF7E5k"

const uri =
  "mongodb+srv://doctors_portal:ZF1tCSw40OfF7E5k@cluster0.kdwgcoc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

app.get("/", (req, res) => {
  res.send("Doctors Portal v01 is running");
});

async function run() {
  try {
    //code goes here
    const appointmentCollection = client
      .db("doctorsPortal")
      .collection("appointmentOptions");
    const myAppointmentCollection = client
      .db("doctorsPortal")
      .collection("myAppointment");

    app.get("/appointments", async (req, res) => {
      const query = {}; //joto object ache sob gulo select kore
      const cursor = appointmentCollection.find(query); //like of pointer to get all users
      const appointments = await cursor.toArray(); //cursor ta ke array te convert kore dibe
      res.send(appointments);
    });

    // CRUD er C==Create
    app.post("/myAppointment", async (req, res) => {
      const appointment = req.body;
      console.log(appointment);
      const result = await myAppointmentCollection.insertOne(appointment);
      res.send(result);
    });
    app.get("/allAppointments", async (req, res) => {
      // const email = req.query.body;
      const query = {}; //joto object ache sob gulo select kore
      const cursor = myAppointmentCollection.find(query); //like of pointer to get all users
      const appointments = await cursor.toArray(); //cursor ta ke array te convert kore dibe
      res.send(appointments);
    });

    app.get("/myAppointments", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const cursor = myAppointmentCollection.find(query);
      const appointments = await cursor.toArray();
      res.send(appointments);
    });
  } finally {
    //code goes here
  }
}
run().catch((error) => {
  console.log(error);
});

app.listen(port, () => {
  console.log(port);
});
