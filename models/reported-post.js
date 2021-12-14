const db = require("../util/database");

module.exports = class ReportedPost {
    constructor(reportId, postId, creationTime, reportReason) {
        this.reportId = reportId;
        this.postId = postId;
        this.creationTime = creationTime;
        this.reportReason = reportReason;
    }

    save() {}

    static fetchAll() {
        return db.execute(
            `SELECT id, userName, postId, reacts, post.creationTime, text, reportReason
             FROM post JOIN reportposts
             ON post.id = reportposts.postId
             ORDER BY(creationTime) desc;`
        );
    }
};
