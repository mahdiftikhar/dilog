const db = require("../util/database");

module.exports = class Post {
    constructor(id, userName, tags, text, image, reacts, creationTime) {
        this.id = id;
        this.userName = userName;
        this.tags = tags;
        this.text = text;
        this.image = image;
        this.reacts = reacts;
        this.creationTime = creationTime;
    }

    save() {}

    static fetchAll() {
        return db.execute("SELECT * FROM post ORDER BY(creationTime) desc");
    }

    static fetchById(id) {
        return db.execute("SELECT * FROM post WHERE id = (?)", id);
    }

    static deleteById(id) {}

    static fetchByUsername(username) {
        return db.execute(
            "SELECT * FROM post WHERE userName = (?) ORDER BY(creationTime) desc",
            [username]
        );
    }

    static save(body, tag, username) {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();

        let creationTime =
            year +
            "-" +
            month +
            "-" +
            date +
            " " +
            hours +
            ":" +
            minutes +
            ":" +
            seconds;

        let reacts = 0;

        return db.execute(
            "INSERT INTO post (userName, tags, text, reacts, creationTime) VALUES (?, ?, ?, ?, ?)",
            [username, tag, body, reacts, creationTime]
        );
    }
};
