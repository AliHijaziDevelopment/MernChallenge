const router = require("express").Router();
const itemsController = require('../controllers/itemsController');

router.get("/",itemsController.index );
router.post("/add",itemsController.create );
router.post("/update/:id",itemsController.update );
router.delete("/delete/:id",itemsController.destroy );


module.exports = router;
