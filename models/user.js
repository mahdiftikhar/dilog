const db = require("./util/database");

module.exports = class User {
    constructor(userName, email, displayPicture, dataOfBirth, bio, password) {
        this.userName = userName;
        this.email = email;
        this.displayPicture = displayPicture;
        this.dataOfBirth = dataOfBirth;
        this.bio = bio;
        this.password = password;
    }

    save() {
        // return db.execute(
        //     "INSERT INTO "
        // )
    }

    static fetchAll() {}
};
