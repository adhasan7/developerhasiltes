let penjualan = require("../data/penjualan");

function getPenjualan(req, res) {
	res.status(200).json(penjualan);
}

function postPembayaran(req, res) {
	const { id, payment: paymentString } = req.body;
	try {
		let payment = parseInt(paymentString);
		const selectedTransaction = penjualan.filter((transaksi) => {
			return transaksi.id === parseInt(id);
		})[0];
		if (!selectedTransaction)
			throw new Error(
				`Tidak dapat menemukan penjualan kredit dengan ID = ${id}`
			);

		// cargo_fee dikurang payment, namun payment akan dikurang juga karena akan digunakan untuk menghitung total_balance.
		let cargoFee = selectedTransaction.cargo_fee;
		if (cargoFee - payment < 0) {
			selectedTransaction.cargo_fee = 0;
		} else {
			selectedTransaction.cargo_fee -= payment;
		}
		payment -= cargoFee;

		// jika user membayar lebih dari grand_total, maka kredit lunas.
		if (payment >= selectedTransaction.grand_total) {
			selectedTransaction.total_balance = 0;
		} else {
			selectedTransaction.total_balance -= payment;
		}
		selectedTransaction.grand_total =
			selectedTransaction.cargo_fee + selectedTransaction.total_balance;
		selectedTransaction.date = new Date();

		const dataPenjualanTerbaru = penjualan.map((transaksi) =>
			transaksi.id === parseInt(id)
				? { ...transaksi, ...selectedTransaction }
				: transaksi
		);
		penjualan = dataPenjualanTerbaru;
		res.status(200).json(penjualan);
	} catch (error) {
		res.status(400).send(error.message);
	}
}

/**
 *
 * logikanya setiap bulan akan ada pembayaran,
 *
 */
module.exports = {
	getPenjualan,
	postPembayaran,
};
