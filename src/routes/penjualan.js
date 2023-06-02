const { Router } = require("express");
const router = Router();

const { getPenjualan, postPembayaran } = require("../constrollers/penjualan");

router.get("/", getPenjualan);
router.post("/bayar", postPembayaran);

module.exports = router;
