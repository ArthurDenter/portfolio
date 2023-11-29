const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

const app = express();

// cors
app.use(cors({ origin: "*" }));

app.use("/public", express.static(process.cwd() + "/public")); //make public static

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
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

app.post("/send", (req, res) => {
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
                res.status(500).send("Something went wrong.");
            } else {
                res.status(200).send("Email successfully sent to recipient!");
            };
        });
    });
});

//Index page (static HTML)
app.route("/").get(function (req, res) {
    res.sendFile(process.cwd() + "/public/index.html");
  });
  
