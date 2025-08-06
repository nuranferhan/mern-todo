const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// SIGN UP
router.post("/register", async (req, res) => {
  try {
        const { email, username, password } = req.body;
        const existingUser = await User.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });
        if (existingUser) {
            return res.status(200).json({ message: "User Already Exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new User({ email, username, password: hashedPassword });
        await user.save();
        res.status(200).json({ message: "Sign Up Successfull" });
   } 
   catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Server Error" });
    }   
});


// SIGN IN 
router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
      return res.status(401).json({ message: "Please Sign Up First" });
    }
    
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Password Is Not Correct" });
    }
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others });

  } catch (error) {
    res.status(500).json({ message: "Server Errors" });
  }
});

module.exports = router;

