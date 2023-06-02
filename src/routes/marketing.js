const { Router } = require("express");
const router = Router();

const {
	getMarketing,
	getMarketings,
	getPerhitungan,
	postPerhitungan,
} = require("../constrollers/marketing");

router.get("/perhitungan", getPerhitungan);
router.post("/perhitungan", postPerhitungan);
router.get("/", getMarketings);
router.get("/:id", getMarketing);

module.exports = router;
