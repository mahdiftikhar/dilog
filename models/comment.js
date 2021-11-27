const db = require("../util/database");

module.exports = class Post {
    constructor(id, postId, tags, text, image, reacts, creationTime) {
        this.id = id;
        this.postId = postId;
        this.tags = tags;
        this.text = text;
        this.image = image;
        this.reacts = reacts;
        this.creationTime = creationTime;
    }

    save() {}

    static fetchAll() {
        return db.execute("SELECT * FROM comment ORDER BY(creationTime) desc");
    }

    static fetchById(id) {
        return db.execute("SELECT * FROM comment WHERE id = ?", [id]);
    }

    static fetchByPostId(postId) {
        return db.execute("SELECT * from comment WHERE postId=?", [postId]);
    }

    static deleteById(id) {}
};
