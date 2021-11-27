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

    static findByName(name) {
        return db.execute("SELECT * FROM user WHERE userName=?", [name]);
    }
};
