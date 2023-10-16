const express = require("express");
const router = express.Router();
const storyController = require("./storyController");
const jwt = require("jsonwebtoken");

router.use(async (req, res, next) => {
  if (req.path === "/login" || req.path === "/register") {
    return next();
  }
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("Token not available in request");
    return res.status(401).send("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Error:: " + err);
    return res.status(401).send("Unauthorized");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    storyController.loginUser(email, password, (err, user) => {
      if (err) {
        res.status(400).send(err);
      } else {
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: 30 * 60,
        });

        res.status(200).send({ userData: user, token });
      }
    });
  } catch (error) {
    return res
      .status(400)
      .send("Error:: Plrease try again after sometime " + error);
  }
});

router.post("/register", async (req, res) => {
  try {
    storyController.registerUser(req.body, (err, success) => {
      if (err) {
        res.status(400).send({ message: err });
      } else {
        res
          .status(200)
          .send({ STATUS: "OK", message: "Registered successfully." });
      }
    });
  } catch (error) {
    return res
      .status(400)
      .send("Error:: Plrease try again after sometime " + error);
  }
});

router.post("/createStory", async (req, res) => {
  try {
    req.body.file = req.file.location;
    console.log("Inside create story route , location is ", req.file.location);
    storyController.createStory(req.body, (err, story) => {
      if (err) {
        res.status(400).send({ message: err });
      } else {
        console.log("response success");
        res.status(200).send(story);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating story " + error.message);
  }
});

router.post("/updateStory", async (req, res) => {
  try {
    if (req.file) {
      req.body.file = req.file.path;
    }
    storyController.updateStory(req.body, (err, story) => {
      if (err) {
        res.status(400).send(err.message);
      } else {
        console.log("Story updated...");
        res.status(200).send(story);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating story " + error.message);
  }
});

router.get("/getstories", async (req, res) => {
  try {
    storyController.getAllStories((err, stories) => {
      if (err) {
        res.status(400).send({ message: err });
      }
      res.status(200).send({ STATUS: "OK", data: stories });
    });
  } catch (error) {
    res.status(500).send("Error in fetching stories " + error.message);
  }
});

router.get("/getusers", async (req, res) => {
  try {
    storyController.getAllUsers((err, users) => {
      if (err) {
        res.status(400).send({ message: err });
      }
      res.status(200).send({ STATUS: "OK", data: users });
    });
  } catch (error) {
    res.status(500).send("Error in fetching users " + error.message);
  }
});

router.delete(`/deletestory/:storyId`, async (req, res) => {
  try {
    storyController.deleteStory(req.params.storyId, (err, deltedStory) => {
      if (err) {
        res.status(400).send({ message: err });
      } else {
        res.status(200).send(deltedStory);
      }
    });
  } catch (error) {
    res.status(500).send("Error in deleting Story " + error.message);
  }
});

router.post("/upvote", async (req, res) => {
  try {
    const { userId, storyId } = req.body;
    storyController.upvoteStory(userId, storyId, (err, story) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(story);
      }
    });
  } catch (error) {
    res.status(500).send("Error in upvoting story " + error.message);
  }
});

router.post("/downvote", async (req, res) => {
  try {
    const { userId, storyId } = req.body;
    console.log(req.body);
    storyController.downvoteStory(userId, storyId, (err, story) => {
      if (err) {
        res.status(400).send({ message: err });
      } else {
        res.status(200).send(story);
      }
    });
  } catch (error) {
    res.status(500).send("Error in downvoting story " + error.message);
  }
});

router.post("/comment", async (req, res) => {
  try {
    const { userId, body, storyId } = req.body;
    storyController.commentStory(userId, body, storyId, (err, comments) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(comments);
      }
    });
  } catch (error) {
    res
      .status(500)
      .send("Error occured when commenting story " + error.message);
  }
});

module.exports = router;
