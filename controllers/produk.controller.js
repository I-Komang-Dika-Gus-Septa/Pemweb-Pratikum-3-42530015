const ProdukModel = require('../models/produk.model');

// Menampilkan daftar produk ke tabel EJS
exports.getDaftarProduk = async (req, res) => {
    try {
        const produkList = await ProdukModel.getAll();
        res.render('pages/produk-list', {
            pageTitle: 'Daftar Inventaris Produk',
            produkList: produkList
        });
    } catch (error) {
        console.error('[ERROR getDaftarProduk]:', error);
        res.status(500).send('Terjadi galat internal peladen saat mengambil data.');
    }
};

// Menampilkan formulir tambah produk
exports.formTambah = (req, res) => {
    res.render('pages/produk-tambah', {
        pageTitle: 'Tambah Produk Baru'
    });
};

// Menyimpan data produk baru & menerapkan pola PRG (Post-Redirect-Get)
exports.simpanProduk = async (req, res) => {
    try {
        const { nama_produk, kategori, harga, stok } = req.body;
        
        if (!nama_produk || !kategori || !harga || !stok) {
            return res.status(400).send('Semua kolom wajib diisi!');
        }

        await ProdukModel.create({ nama_produk, kategori, harga, stok });
        console.log(`[DATABASE] Data "${nama_produk}" berhasil di-insert.`);
        
        res.redirect('/produk');
    } catch (error) {
        console.error('[ERROR simpanProduk]:', error);
        res.status(500).send('Terjadi galat saat menyimpan data produk.');
    }
};

// Menampilkan formulir edit dengan data awal (pre-filled)
exports.formEdit = async (req, res) => {
    try {
        const { id } = req.params;
        const produk = await ProdukModel.getById(id);

        if (!produk) {
            return res.status(404).send('Produk tidak ditemukan.');
        }

        res.render('pages/produk-edit', {
            pageTitle: 'Edit Data Produk',
            produk: produk
        });
    } catch (error) {
        console.error('[ERROR formEdit]:', error);
        res.status(500).send('Terjadi galat saat memuat form edit.');
    }
};

// Memproses pembaruan data produk
exports.updateProduk = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama_produk, kategori, harga, stok } = req.body;

        if (!nama_produk || !kategori || !harga || !stok) {
            return res.status(400).send('Semua kolom wajib diisi!');
        }

        await ProdukModel.update(id, { nama_produk, kategori, harga, stok });
        console.log(`[DATABASE] Record ID ${id} berhasil diperbarui.`);

        res.redirect('/produk');
    } catch (error) {
        console.error('[ERROR updateProduk]:', error);
        res.status(500).send('Terjadi galat saat memperbarui data produk.');
    }
};

// Menghapus data produk berdasarkan ID
exports.hapusProduk = async (req, res) => {
    try {
        const { id } = req.params;
        await ProdukModel.remove(id);
        console.log(`[DATABASE] Record ID ${id} berhasil dihapus.`);

        res.redirect('/produk');
    } catch (error) {
        console.error('[ERROR hapusProduk]:', error);
        res.status(500).send('Terjadi galat saat menghapus data produk.');
    }
};