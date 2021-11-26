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

    save() {}

    static fetchAll() {}

    static fetchByIdPass(name, pass) {
        return db.execute(
            "SELECT * FROM user WHERE userName=? and password=?",
            [name, pass]
        );
    }

    static fetchInfo(username) {
        return db.execute("SELECT * FROM user WHERE userName = (?)", [
            username,
        ]);
    }

    static addByIdEmailPass(name, email, password) {
        return db.execute(
            "INSERT INTO user (userName, email, password, dateOfBirth) VALUES (?, ?, ?, ?)",
            [name, email, password, "2010-02-02"]
        );
    }
};
