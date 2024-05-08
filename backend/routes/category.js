const router = require("express").Router();
const categoryController = require('../controllers/categoryController');

router.post("/add",categoryController.create );
router.post("/update/:id",categoryController.update );
router.delete("/delete/:id",categoryController.destroy );


module.exports = router;
