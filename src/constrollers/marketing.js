const { marketing, perhitungan } = require("../data/marketing");

function getMarketing(req, res) {
	const { id } = req.params;
	const sales = marketing.filter((market) => market.id === parseInt(id))[0];
	if (!sales)
		return res.status(404).send(`Tidak dapat menemukan sales dengan ID ${id}`);
	res.status(200).json(sales);
}

function getMarketings(req, res) {
	res.status(200).json(marketing);
}

function getPerhitungan(req, res) {
	res.status(200).json(perhitungan);
}

function postPerhitungan(req, res) {
	const { idMarketing, bulan, omzet: omzetString = 0 } = req.body;
	const omzet = parseInt(omzetString);
	try {
		const hasil = { bulan, omzet };
		hasil.marketing = marketing.filter(
			(market) => market.id === parseInt(idMarketing)
		)[0].name;
		if (omzet < 0) throw new Error("Omzet tidak boleh kurang dari 0");

		if (omzet >= 0 && omzet < 100_000_000) hasil.komisi = 0; // 0%
		else if (omzet >= 100_000_000 && omzet < 200_000_000)
			hasil.komisi = 0.025; // 2.5%
		else if (omzet >= 200_000_000 && omzet < 500_000_000)
			hasil.komisi = 0.05; // 5%
		else hasil.komisi = 0.1; // 10%

		hasil.komisiNominal = hasil.komisi * hasil.omzet;
		perhitungan.push(hasil);
		res.status(200).json(perhitungan);
	} catch (e) {
		res.status(400).send(e.message);
	}
}

module.exports = {
	getMarketing,
	getMarketings,
	getPerhitungan,
	postPerhitungan,
};
