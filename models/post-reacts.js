const db = require("../util/database");

module.exports = class PostReacts {
    constructor(postId, userName) {
        this.postId = postId;
        this.userName = userName;
    }

    save() {
        return db.execute(
            "INSERT INTO postReacts (postId, userName) VALUES (?, ?)",
            [this.postId, this.userName]
        );
    }

    static fetchById(id) {
        return db.execute("SELECT * FROM postReacts WHERE postId=?", [id]);
    }
};
