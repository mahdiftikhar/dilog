import mysql.connector
import pandas as pd
import numpy as np
import time

mydb = mysql.connector.connect(
    host="localhost", user="root", password="Halo89527fc4!", database="dilog"
)
mycursor = mydb.cursor()
url = "http://localhost:3000/"
names = pd.read_csv("names.csv").to_numpy()
lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
USERS = 2000  # count of users
POSTS = 4000  # count of posts
COMMENTS = 5000  # count of comments
tags = "competition influencer influencermarketing fridayfeeling MondayMotivation tbt traveltuesday vegan fitness love photooftheday art beautiful photography instagram cute nature tbt summer me beauty instalike smile family photo likeforlike makeup follow4follow model"
tags = tags.split()

inserted_usernames = list()
for i in range(USERS):
    inserted_usernames.append(names[i][0])


def make_10_word_sentence(master):
    to_return = ""

    for i in range(10):
        idx = np.random.randint(0, len(master.split()))
        to_return += master.split()[idx] + " "

    return to_return


def make_3_random_tags(master):
    to_return = ""

    for i in range(3):
        idx = np.random.randint(0, len(master))

        to_return += master[idx]

        if i != 2:
            to_return += ", "

    return to_return


def gen_random_creation_time():
    # year = str(np.random.randint(2010, 2022))
    # month = str(np.random.randint(1, 13))
    # date = str(np.random.randint(1, 29))
    # hour = str(np.random.randint(0, 24))
    # min = str(np.random.randint(0, 60))
    # sec = str(np.random.randint(0, 60))

    # return year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec

    return "2021-12-06 11:00:00"


def select_random_postId(res):
    idx = np.random.randint(0, len(res))
    return res[idx][0]


def select_random_commentId(res):
    idx = np.random.randint(0, len(res))
    return res[idx][0]


def select_random_userId():
    idx = np.random.randint(0, len(inserted_usernames))
    return inserted_usernames[idx]


def insert_users():
    print("Inserting User")
    PASSWORD = "$2a$12$5IjSI1YGKz5eOctLDkk7NeW8ZUoE7zY48CTvMNjXxvtbqeXOeDO.S"  # this is just == password for all users

    sql = "INSERT INTO user (userName, email, dateOfBirth, password) VALUES (%s, %s, %s, %s)"
    val = (
        "u",
        "u@gmail.com",
        "2000-12-30",
        "$2a$12$v1zUOv0CdbrH645y8oGYoedPsFOC4LoAKh4sEftWIhToHDlmhr66.",
    )

    mycursor.execute(sql, val)

    for i in range(USERS):
        username = names[i][0]
        sql = "INSERT INTO user (userName, email, dateOfBirth, password) VALUES (%s, %s, %s, %s)"
        val = (username, username + "@gmail.com", "2000-12-30", PASSWORD)

        mycursor.execute(sql, val)


def insert_admin():
    print("Inserting Admin")
    PASSWORD = "$2a$12$8de9CVtL4sfuaUG66S5Lq.9EHt3OlLpsFuA91U0PCnw.Ypcqifj4W"  # == secretpassword
    ADMIN_USERNAMES = [
        "antonnio",
        "beanbunny",
        "umair14040",
        "nullptr",
        "sjc",
    ]

    for username in ADMIN_USERNAMES:
        sql = "INSERT INTO admin (userName, email, password) VALUES (%s, %s, %s);"
        val = (username, username + "@gmail.com", PASSWORD)
        mycursor.execute(sql, val)


def insert_banned_users():
    print("Inserting Banned Users")
    admin_id = "umair14040"
    banned = list()

    for i in range(USERS, USERS + 500):
        username = select_random_userId()

        while username in banned:
            username = select_random_userId()

        banned.append(username)

        sql = (
            "INSERT INTO bannedusers (adminId, userName, userEmail) VALUES (%s, %s, %s)"
        )
        val = (admin_id, username, username + "@gmail.com")
        mycursor.execute(sql, val)

        sql = "DELETE FROM user WHERE userName = %s"
        val = (username,)
        mycursor.execute(sql, val)

    for username in banned:
        inserted_usernames.remove(username)


def insert_posts():
    print("Inserting Posts")
    for i in range(POSTS):
        idx = np.random.randint(0, len(inserted_usernames))
        username = inserted_usernames[idx]

        tag = make_3_random_tags(tags)
        text = make_10_word_sentence(lorem)
        reacts = 0
        creationTime = gen_random_creation_time()

        sql = "INSERT INTO post (userName, tags, text, reacts, creationTime) VALUES (%s, %s, %s, %s, %s)"
        val = (username, tag, text, reacts, creationTime)

        mycursor.execute(sql, val)


def select_report_reason():
    idx = np.random.randint(0, 9999)
    reasons = ["Harrasment", "Spam", "Hate Speech", "Terrorism", "Threats", "Other"]

    return reasons[idx % len(reasons)]


def insert_reportposts():
    print("Inserting Report Posts")
    mycursor.execute("SELECT * FROM post")
    res = mycursor.fetchall()

    for i in range(500):
        postId = select_random_postId(res)
        creationTime = gen_random_creation_time()
        reportReason = select_report_reason()

        sql = "INSERT INTO reportposts (postID, creationTime, reportReason) VALUES (%s, %s, %s)"
        val = (postId, creationTime, reportReason)
        mycursor.execute(sql, val)


def insert_reportcomments():
    print("Inserting Report Comments")
    mycursor.execute("SELECT * FROM comment")
    res = mycursor.fetchall()

    for i in range(500):
        commentId = select_random_commentId(res)
        creationTime = gen_random_creation_time()
        reportReason = select_report_reason()

        sql = "INSERT INTO reportcomments (commentID, creationTime, reportReason) VALUES (%s, %s, %s)"
        val = (commentId, creationTime, reportReason)
        mycursor.execute(sql, val)


def insert_comments():
    print("Inserting Comments")
    mycursor.execute("SELECT * FROM post")
    res = mycursor.fetchall()

    for i in range(COMMENTS):
        idx = np.random.randint(0, len(inserted_usernames))
        username = inserted_usernames[idx]

        postId = select_random_postId(res)
        creationTime = gen_random_creation_time()
        text = make_10_word_sentence(lorem)

        sql = "INSERT INTO comment (userName, postId, reacts, creationTime, text) VALUES (%s, %s, %s, %s, %s)"
        val = (username, postId, 0, creationTime, text)
        mycursor.execute(sql, val)


def insert_follows():
    print("Inserting Follows")
    # hehehehehe
    for i in range(69):
        followerId = inserted_usernames[i]

        sql = "INSERT INTO follows (followerId, followingId) VALUES (%s, %s)"
        val = (followerId, "u")
        mycursor.execute(sql, val)

    for i in range(10000):
        followerId = select_random_userId()
        followingId = select_random_userId()

        if followerId != followingId:
            try:
                sql = "INSERT INTO follows (followerId, followingId) VALUES (%s, %s)"
                val = (followerId, followingId)
                mycursor.execute(sql, val)
            except mysql.connector.errors.IntegrityError:
                # here this error means that the followerId already follows followingId
                pass


def insert_post_reacts():
    print("Inserting Post Reacts")
    likes = dict()
    mycursor.execute("SELECT * FROM post")
    res = mycursor.fetchall()

    for i in range(10000):
        username = select_random_userId()
        postId = select_random_postId(res)

        if username not in likes.keys():
            likes[username] = [postId]
            update_reacts(postId, username, "postreacts", "post", "postId")

        elif postId not in likes[username]:
            likes[username].append(postId)
            update_reacts(postId, username, "postreacts", "post", "postId")

        else:
            while postId in likes[username]:
                postId = select_random_postId(res)

            update_reacts(postId, username, "postreacts", "post", "postId")


def insert_comment_reacts():
    print("Inserting Comment Reacts")
    likes = dict()
    mycursor.execute("SELECT * FROM comment")
    res = mycursor.fetchall()

    for i in range(10000):
        username = select_random_userId()
        commentId = select_random_commentId(res)

        if username not in likes.keys():
            likes[username] = [commentId]
            update_reacts(commentId, username, "commentreacts", "comment", "commentId")

        elif commentId not in likes[username]:
            likes[username].append(commentId)
            update_reacts(commentId, username, "commentreacts", "comment", "commentId")

        else:
            while commentId in likes[username]:
                commentId = select_random_commentId(res)

            update_reacts(commentId, username, "commentreacts", "comment", "commentId")


def update_reacts(Id, username, react_table, master_table, id_string):
    sql = (
        "INSERT INTO " + react_table + " (" + id_string + ", userName) VALUES (%s, %s)"
    )
    val = (Id, username)
    mycursor.execute(sql, val)

    sql = "SELECT reacts FROM " + master_table + " WHERE id = (%s)"
    val = (Id,)
    mycursor.execute(sql, val)
    reacts = int(mycursor.fetchall()[0][0]) + 1

    sql = "UPDATE " + master_table + " SET reacts = (%s) WHERE id = (%s)"
    val = (reacts, Id)
    mycursor.execute(sql, val)


def main():
    start = time.time()

    print("STARTING SCRIPT")

    print("Dropping Database Entries")
    mycursor.execute("SET SQL_SAFE_UPDATES = 0;")
    mycursor.execute("DELETE FROM admin;")
    mycursor.execute("DELETE FROM user;")
    mycursor.execute("DELETE FROM bannedusers;")
    mycursor.execute("SET SQL_SAFE_UPDATES = 1;")
    print("Dropped")

    print()
    print("Starting Insertions..")
    print()

    insert_admin()
    insert_users()
    insert_banned_users()
    insert_follows()

    insert_posts()
    insert_comments()

    insert_post_reacts()
    insert_comment_reacts()

    insert_reportcomments()
    insert_reportposts()

    mydb.commit()

    end = time.time()
    time_taken = end - start
    print(f"Time taken: {time_taken:.1f}")

    print("ENDING SCRIPT")


main()
