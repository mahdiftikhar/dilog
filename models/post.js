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

    save() {
        return db.execute(
            "INSERT INTO post (userName, tags, text, reacts, creationTime) VALUES (?, ?, ?, ?, ?)",
            [
                this.userName,
                this.tags,
                this.text,
                this.reacts,
                this.creationTime,
            ]
        );
    }

    static fetchAll() {
        return db.execute("SELECT * FROM post ORDER BY(creationTime) desc");
    }

    static fetchById(id) {
        return db.execute("SELECT * FROM post WHERE id=(?)", [id]);
    }

    static deleteById(id) {}

    static fetchByUserName(username) {
        return db.execute(
            "SELECT * FROM post WHERE userName = (?) ORDER BY(creationTime) desc",
            [username]
        );
    }

    static fetchLikeTag(tag) {
        return db.execute(
            "SELECT * FROM post WHERE tags LIKE ? ORDER BY(creationTime) desc",
            ["%" + tag + "%"]
        );
    }
};
