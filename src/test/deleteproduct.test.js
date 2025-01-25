const request = require('supertest');
const express = require('express');
const app = express();
const adminController = require('../app/controller/admincontroller');
const db = require('../app/infrastructure/database/connection');

jest.mock('../app/infrastructure/database/connection');

app.delete('/admin/product/:id', adminController.deleteProduct);

describe('DELETE /admin/product/:id', () => {
    it('should delete a product and return 200 status', async () => {
        const mockId = 1;
        db.query.mockImplementation((sql, params, callback) => {
            if (sql.includes('DELETE FROM foto')) {
                callback(null, { affectedRows: 1 });
            } else if (sql.includes('DELETE FROM produk')) {
                callback(null, { affectedRows: 1 });
            }
        });

        const response = await request(app).delete(`/admin/product/${mockId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Berhasil menghapus product');
    });

    it('should return 404 if product not found', async () => {
        const mockId = 999;
        db.query.mockImplementation((sql, params, callback) => {
            callback(null, { affectedRows: 0 });
        });

        const response = await request(app).delete(`/admin/product/${mockId}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Data product dengan ID 999 tidak ditemukan');
    });

    it('should return 500 if there is a database error', async () => {
        const mockId = 1;
        db.query.mockImplementation((sql, params, callback) => {
            callback(new Error('Database error'), null);
        });

        const response = await request(app).delete(`/admin/product/${mockId}`);
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Kegagalan menghapus product');
    });
});
