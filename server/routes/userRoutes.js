const { Router } = require('express');

const {
    registerUser,
    loginUser,
    getUser,
    changeAvatar,
    editUser,
    getAuthors
} = require("../controllers/userControllers");
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

// Corrected route methods
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUser);
router.get('/', getAuthors);
router.post('/change-avatar',authMiddleware, changeAvatar);
router.patch('/edit-user', authMiddleware,editUser);

// Optional: Keep or remove this default route
router.get('/', (req, res) => {
    res.json("User Route");
});

module.exports = router;
