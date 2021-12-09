const db = require("../util/database");

module.exports = class Recovery {
    constructor(userName, tempPass) {
        this.userName = userName;
        this.tempPass = tempPass
    }

    save() {
        return db.execute(
            "INSERT INTO recovery (recoveryName, tempPass) VALUES (?, ?)",
            [this.userName, this.tempPass]
        );
    }
    
    static updateByName(temp_password, username) {
        return db.execute(
            "UPDATE recovery SET tempPass = (?) WHERE recoveryName = (?)",
            [temp_password, username]
        );
    }

    static fetchByName(username) {
        return db.execute(
            "SELECT tempPass FROM recovery WHERE recoveryName = (?)",
            [username]
        );
    }
    
    static deleteByName(username) {
        return db.execute(
            "DELETE FROM recovery WHERE recoveryName = (?)",
            [username]
        );
    }
};