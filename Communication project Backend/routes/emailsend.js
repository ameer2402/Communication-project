const express = require("express");
const router = express.Router();
const postmark = require("postmark");
const client = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN);

// Send mail using Postmark
router.post("/", (req, res) => {
  try {
    const mailOptions = {
      From: req.body.from,
      To: req.body.to,
      Subject: req.body.subject,
      HtmlBody: req.body.message,
    };

    client.sendEmail(mailOptions)
      .then((response) => {
        console.log("Email sent:", response);
        res.status(201).json({ status: 201, response });
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        res.status(500).json({ status: 500, error: "Internal Server Error" });
      });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
});

module.exports = router;
