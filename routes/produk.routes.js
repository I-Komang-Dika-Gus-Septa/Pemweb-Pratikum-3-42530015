const express = require('express');
const router = express.Router();
const produkController = require('../controllers/produk.controller');
const ProdukModel = require('../models/produk.model');

router.get('/produk', produkController.getDaftarProduk);
router.get('/produk/tambah', produkController.formTambah);
router.post('/produk/tambah', produkController.simpanProduk);
router.get('/produk/edit/:id', produkController.formEdit);
router.post('/produk/edit/:id', produkController.updateProduk);
router.post('/produk/hapus/:id', produkController.hapusProduk);

router.get('/uji-keamanan', async (req, res) => {
    try {
        const inputPayload = req.query.kategori;
        const hasil = await ProdukModel.getByKategoriSecure(inputPayload);
        res.json({ status: "Berhasil diuji", input: inputPayload, jumlahDataDitemukan: hasil.length, data: hasil });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;