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

    static fetchRow(id, userName) {
        return db.execute(
            "SELECT * FROM postReacts WHERE userName=? and postId=?",
            [userName, id]
        );
    }

    static deleteRow(id, userName) {
        return db.execute(
            "DELETE FROM postReacts WHERE (postId=?) and (userName=?)",
            [id, userName]
        );
    }
};
