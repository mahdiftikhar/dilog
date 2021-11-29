const db = require("../util/database");

module.exports = class CommentReact {
    constructor(postId, userName) {
        this.postId = postId;
        this.userName = userName;
    }

    save() {
        return db.execute(
            "INSERT INTO commentReacts (commentId, userName) VALUES (?, ?)",
            [this.postId, this.userName]
        );
    }

    static fetchById(id) {
        return db.execute("SELECT * FROM commentReacts WHERE commentId=?", [
            id,
        ]);
    }

    static fetchRow(id, userName) {
        return db.execute(
            "SELECT * FROM commentReacts WHERE userName=? and commentId=?",
            [userName, id]
        );
    }

    static deleteRow(id, userName) {
        return db.execute(
            "DELETE FROM commentReacts WHERE (commentId=?) and (userName=?)",
            [id, userName]
        );
    }
};
