const db = require("../util/database");

module.exports = class ReportedComment {
    constructor(reportId, commentId, creationTime, reportReason) {
        this.reportId = reportId;
        this.commentId = commentId;
        this.creationTime = creationTime;
        this.reportReason = reportReason;
    }

    save() {}

    static fetchAll() {
        return db.execute(
            `SELECT id, userName, postId, reacts, comment.creationTime, text , reportReason
                FROM comment JOIN reportcomments
                ON comment.id = reportcomments.commentId;`
        );
    }
};
