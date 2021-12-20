const sql = require("./db.js");

// 1. Basic Header is Missing
// 2. Inline Comments are Missing
const Address = function (address) {
  this.name = address.name;
  this.street = address.street;
  this.post_code = address.post_code;
  this.state = address.state;
  this.city = address.city;
  this.country = address.country;
  this.phone_number = address.phone_number;
};

// 3. Basic Header is Missing
Address.create = (newAddress) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO address SET ?", newAddress, (err, res) => {
      if (err) {
        console.log('error while creating address');
        reject(err);
      }else{
        console.log(res.insertId);
        resolve({id: res.insertId, ...newAddress});
      }
    });
  });
};
// 4. Basic Header is Missing
Address.createAsync = async (newAddress) => {
  return await create(newAddress);
}

// 5. Basic Header is Missing
Address.updateById = (id, address, result) => {
  sql.query(
    "UPDATE address SET name = ?, street = ?, post_code = ?, street = ?, city = ?, country = ?, phone_number = ? WHERE id = ?",
    [address.name, address.street, address.post_code, address.street, address.city, address.country, address.phone_number, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Address with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated address: ", { id: id, ...address });
      result(null, { id: id, ...address });
    }
  );
};

module.exports = Address;