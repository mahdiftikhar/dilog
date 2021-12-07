const db = require("../util/database");

module.exports = class Follows {
    constructor(followerId, followingId) {
        this.followerId = followerId;
        this.followingId = followingId;
    }

    save() {
        return db.execute(
            "INSERT INTO follows (followerId, followingId) VALUES (?, ?);",
            [this.followerId, this.followingId]
        );
    }

    static isFollowingUser(followerId, followingId) {
        return db.execute(
            "SELECT count(*) as count FROM follows WHERE followerId = (?) AND followingId = (?);",
            [followerId, followingId]
        );
    }

    static unfollowUser(followerId, followingId) {
        return db.execute(
            "DELETE FROM follows WHERE followerId = (?) AND followingId = (?);",
            [followerId, followingId]
        );
    }

    static countFollowers(followingId) {
        return db.execute(
            "SELECT count(*) as n_followers FROM follows WHERE followingId = (?);",
            [followingId]
        );
    }

    static countFollowing(followerId) {
        return db.execute(
            "SELECT count(*) as n_following FROM follows WHERE followerId = (?);",
            [followerId]
        );
    }
};
