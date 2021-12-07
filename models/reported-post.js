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
            "SELECT id, userName, postId, reacts, dilog.post.creationTime, text , reportReason FROM dilog.post JOIN dilog.reportposts ON dilog.post.id = dilog.reportposts.postId"
        );
    }
};
