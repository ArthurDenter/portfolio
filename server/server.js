const https = require('node:https');
const fs = require('node:fs');

const express = require("../nodevenv/server-node/10/lib/node_modules/express");
const cors = require("../nodevenv/server-node/10/lib/node_modules/cors");
const nodemailer = require("../nodevenv/server-node/10/lib/node_modules/nodemailer");
const multiparty = require("../nodevenv/server-node/10/lib/node_modules/multiparty");
require("../nodevenv/server-node/10/lib/node_modules/dotenv").config();

const key = fs.readFileSync('./certs/c570d_507cd_00e6de723b4f263bcb193641b210c787.pem');
const cert = fs.readFileSync('./certs/adomaitis_xyz_c570d_507cd_1708819199_1137cc290a4443bef610a0ce8dd51d2b.pem');
const app = express();
const server = https.createServer({key: key, cert: cert }, app);
const PORT = process.env.PORT || 5000;

// cors
app.use(cors({ origin: "*" }));

server.listen(PORT, () => { 
    console.log(`Listening on port ${PORT}...`); 
});


const transporter = nodemailer.createTransport({
    host: "mail.adomaitis.xyz",
    port: 465,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    };
});

app.get('/', (req, res) => { 
    res.send('this is an secure server'); 
});

app.post("/", (req, res) => {
    let form = new multiparty.Form();
    let data = {};
    form.parse(req, function (err, fields) {
        console.log(fields);
        Object.keys(fields).forEach(function (property) {
            data[property] = fields[property.toString()];
        });


        const mail = {
            from: `${data.fname} ${data.lname}`,
            to: process.env.EMAIL,
            subject: `${data.subj}`,
            text: `${data.fname} ${data.lname} <${data.mail}> \n${data.msg}`,
        };

        transporter.sendMail(mail, (err, data) => {
            if (err) {
                console.log(err);
                res.json("Something went wrong.");
            } else {
                res.json("Email successfully sent to recipient!");
            };
        });
    });
});

//Index page (static HTML)
// app.route("/").get(function (req, res) {
//     res.sendFile(process.cwd() + "/index.html");
//   });
  
