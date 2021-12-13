const db = require("../util/database");

countAllEntries = () => {
    let totalcount = 0;

    return db
        .execute("SELECT count(*) AS count FROM user ")
        .then(([data, metadata]) => {
            data = data[0];
            console.log("user table:", data.count);
            totalcount += data.count;

            return db.execute("SELECT count(*) AS count FROM post");
        })
        .then(([data, metadata]) => {
            data = data[0];
            console.log("post table:", data.count);
            totalcount += data.count;

            return db.execute("SELECT count(*) AS count FROM admin");
        })
        .then(([data, metadata]) => {
            data = data[0];
            console.log("admin table:", data.count);
            totalcount += data.count;

            return db.execute("SELECT count(*) AS count FROM bannedusers");
        })
        .then(([data, metadata]) => {
            data = data[0];
            console.log("bannedusers table:", data.count);
            totalcount += data.count;

            return db.execute("SELECT count(*) AS count FROM comment");
        })
        .then(([data, metadata]) => {
            data = data[0];
            console.log("comment table:", data.count);
            totalcount += data.count;

            return db.execute("SELECT count(*) AS count FROM commentmentions");
        })
        .then(([data, metadata]) => {
            data = data[0];
            console.log("commentmentions table:", data.count);
            totalcount += data.count;

            return db.execute("SELECT count(*) AS count FROM follows");
        })
        .then(([data, metadata]) => {
            data = data[0];
            console.log("follows table:", data.count);
            totalcount += data.count;

            return db.execute("SELECT count(*) AS count FROM postmentions");
        })
        .then(([data, metadata]) => {
            data = data[0];
            console.log("postmentions table:", data.count);
            totalcount += data.count;

            return db.execute("SELECT count(*) AS count FROM postreacts");
        })
        .then(([data, metadata]) => {
            data = data[0];
            console.log("postreacts table:", data.count);
            totalcount += data.count;

            return db.execute("SELECT count(*) AS count FROM reportcomments");
        })
        .then(([data, metadata]) => {
            data = data[0];
            console.log("reportcomments table:", data.count);
            totalcount += data.count;

            return db.execute("SELECT count(*) AS count FROM reportposts");
        })
        .then(([data, metadata]) => {
            data = data[0];
            console.log("reportposts table:", data.count);
            totalcount += data.count;

            return db.execute("SELECT count(*) AS count FROM suspendedusers");
        })
        .then(([data, metadata]) => {
            data = data[0];
            console.log("suspendedusers table:", data.count);
            totalcount += data.count;

            return db.execute("SELECT count(*) AS count FROM commentreacts");
        })
        .then(([data, metadata]) => {
            data = data[0];
            console.log("commentreacts table:", data.count);
            totalcount += data.count;

            console.log("total count:", totalcount);
        })
        .catch((err) => {
            console.log(err);
        });
};

countAllEntries();
