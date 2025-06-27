const db = require('./src/app/infrastructure/database/connection');

// Script to multiply all existing prices by 1000 to correct them
db.query('SELECT idProduk, harga FROM produk', (err, results) => {
  if (err) {
    console.error('Error selecting products:', err);
    return;
  }
  
  results.forEach(product => {
    const correctedPrice = product.harga * 1000;
    db.query('UPDATE produk SET harga = ? WHERE idProduk = ?', 
      [correctedPrice, product.idProduk], 
      (updateErr) => {
        if (updateErr) {
          console.error(`Error updating product ${product.idProduk}:`, updateErr);
        } else {
          console.log(`Updated product ${product.idProduk} price from ${product.harga} to ${correctedPrice}`);
        }
    });
  });
});
