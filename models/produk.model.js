const db = require('../config/database');

const ProdukModel = {
    // Mengambil seluruh data produk
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM produk ORDER BY id DESC');
        return rows;
    },

    // Mengambil 1 record spesifik berdasarkan ID (untuk form edit)
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM produk WHERE id = ?', [id]);
        return rows[0];
    },

    // Menyimpan data produk baru (INSERT)
    create: async (data) => {
        const sql = 'INSERT INTO produk (nama_produk, kategori, harga, stok) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(sql, [
            data.nama_produk,
            data.kategori,
            data.harga,
            data.stok
        ]);
        return result;
    },

    // Memperbarui record produk berdasarkan ID (UPDATE)
    update: async (id, data) => {
        const sql = 'UPDATE produk SET nama_produk = ?, kategori = ?, harga = ?, stok = ? WHERE id = ?';
        const [result] = await db.query(sql, [
            data.nama_produk,
            data.kategori,
            data.harga,
            data.stok,
            id
        ]);
        return result;
    },

    // Menghapus data produk berdasarkan ID (DELETE)
    remove: async (id) => {
        const sql = 'DELETE FROM produk WHERE id = ?';
        const [result] = await db.query(sql, [id]);
        return result;
    },

    // [TAMBAHAN PENGALAMAN 6] Metode aman menggunakan Prepared Statement untuk Uji Keamanan
    getByKategoriSecure: async (kategoriInput) => {
        const secureSql = 'SELECT * FROM produk WHERE kategori = ?';
        console.log('\n[PREPARED STATEMENT QUERY]:', secureSql, 'WITH VALUE:', [kategoriInput]);
        const [rows] = await db.query(secureSql, [kategoriInput]);
        return rows;
    }
};

module.exports = ProdukModel;