const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
	res.send("Soal Developer");
});
router.use("/marketing", require("./marketing"));
router.use("/penjualan", require("./penjualan"));

module.exports = router;
