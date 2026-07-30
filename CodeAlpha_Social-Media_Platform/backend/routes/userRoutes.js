const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const {
  getMyProfile,
  getUserById,
  getAllUsers,
  updateProfile,
  uploadProfilePicture,
  changePassword,
  followUser,
} = require("../controllers/userController");

router.get("/", auth, getAllUsers);

router.get("/me", auth, getMyProfile);

router.get("/:id", auth, getUserById);

router.put("/profile", auth, updateProfile);

router.put("/password", auth, changePassword);

router.post(
  "/profile-picture",
  auth,
  upload.single("profilePicture"),
  uploadProfilePicture,
);

router.post("/:id/follow", auth, followUser);

module.exports = router;
