const executeQuery = require("../models/executeQuery");

const createSellerService = async (sellerData) => {
  const { user_id, company_name, phone_number, address } = sellerData;

  const query = `INSERT INTO sellers (user_id, company_name, phone_number, address)
                   VALUES (?, ?, ?, ?)`;

  const result = await executeQuery(query, [
    user_id,
    company_name,
    phone_number || null,
    address || null,
  ]);

  return result;
};

// Update seller
const updateSellerService = async (id, sellerData) => {
  const { company_name, phone_number, address } = sellerData;

  const query = `UPDATE sellers 
                   SET company_name = ?, phone_number = ?, address = ? 
                   WHERE id = ?`;

  const result = await executeQuery(query, [
    company_name,
    phone_number || null,
    address || null,
    id,
  ]);

  return result.affectedRows ? true : false;
};

// Delete seller
const deleteSellerService = async (id) => {
  const query = `DELETE FROM sellers WHERE id = ?`;
  const result = await executeQuery(query, [id]);
  return result.affectedRows ? true : false;
};

module.exports = {
  createSellerService,
  updateSellerService,
  deleteSellerService,
};
