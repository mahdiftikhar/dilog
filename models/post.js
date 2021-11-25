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
};
