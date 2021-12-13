const db = require("../util/database");

module.exports = class Banned {
    constructor(adminId, userName, userEmail) {
        this.adminId = adminId;
        this.userName = userName;
        this.userEmail = userEmail;
    }

    save() {
        return db.execute(
            "INSERT INTO bannedusers (adminId, userName, userEmail) VALUES (?, ?, ?)",
            [this.adminId, this.userName, this.userEmail]
        );
    }

    static fetchAll() {
        return db.execute("SELECT * FROM bannedusers");
    }
};
