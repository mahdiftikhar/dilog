const db = require("../util/database");

module.exports = class User {
    constructor(userName, email, displayPicture, dateOfBirth, bio, password) {
        this.userName = userName;
        this.email = email;
        this.displayPicture = displayPicture;
        this.dateOfBirth = dateOfBirth;
        this.bio = bio;
        this.password = password;
    }

    save() {
        return db.execute(
            "INSERT INTO user (userName, email, dateOfBirth, password) VALUES (?, ?, ?, ?)",
            [this.userName, this.email, this.dateOfBirth, this.password]
        );
    }

    static fetchAll() {}

    static fetchByIdPass(name, pass) {
        return db.execute(
            "SELECT * FROM user WHERE userName=? and password=?",
            [name, pass]
        );
    }

    static fetchByName(name) {
        return db.execute("SELECT * FROM user WHERE userName=?", [name]);
    }

    static addByIdEmailPass(name, email, password) {
        return db.execute(
            "INSERT INTO user (userName, email, password, dateOfBirth) VALUES (?, ?, ?, ?)",
            [name, email, password, "2010-02-02"]
        );
    }

    static updateBio(username, new_bio) {
        return db.execute("UPDATE user SET bio = (?) WHERE userName = (?)", [
            username,
            bio,
        ]);
    }

    static updatePassword(username, new_password) {
        return db.execute(
            "UPDATE user SET password = (?) WHERE userName = (?)",
            [username, new_password]
        );
    }
};
