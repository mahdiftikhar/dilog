const db = require("../util/database");

module.exports = class Admin {
    constructor(adminId, email, password) {
        this.adminId = adminId;
        this.email = email;
        this.password = password;
    }

    save() {}

    static fetchAll() {}

    static fetchByName(name) {
        return db.execute("SELECT * FROM admin WHERE userName=?", [name]);
    }
};
