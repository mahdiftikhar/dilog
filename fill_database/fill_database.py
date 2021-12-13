from os import name
import mysql.connector
from numpy.lib.function_base import insert
from numpy.random.mtrand import randint
import pandas as pd
import numpy as np

mydb = mysql.connector.connect(
    host="localhost", user="root", password="Halo89527fc4!", database="dilog"
)
mycursor = mydb.cursor()

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
    year = str(np.random.randint(2010, 2022))
    month = str(np.random.randint(1, 13))
    date = str(np.random.randint(1, 29))
    hour = str(np.random.randint(0, 24))
    min = str(np.random.randint(0, 60))
    sec = str(np.random.randint(0, 60))

    return year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec


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
    PASSWORD = "$2a$12$5IjSI1YGKz5eOctLDkk7NeW8ZUoE7zY48CTvMNjXxvtbqeXOeDO.S"  # this is just == password for all users

    for i in range(USERS):
        username = names[i][0]
        sql = "INSERT INTO user (userName, email, dateOfBirth, password) VALUES (%s, %s, %s, %s)"
        val = (username, username + "@gmail.com", "2000-12-30", PASSWORD)

        mycursor.execute(sql, val)


def insert_admin():
    PASSWORD = "$2a$12$8de9CVtL4sfuaUG66S5Lq.9EHt3OlLpsFuA91U0PCnw.Ypcqifj4W"
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
    admin_id = "umair14040"

    for i in range(USERS, USERS + 500):
        username = select_random_userId()

        print(username)

        sql = (
            "INSERT INTO bannedusers (adminId, userName, userEmail) VALUES (%s, %s, %s)"
        )
        val = (admin_id, username, username + "@gmail.com")
        mycursor.execute(sql, val)

        sql = "DELETE FROM user WHERE userName = %s"
        val = (username,)
        mycursor.execute(sql, val)


def insert_posts():
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


def insert_reportposts():
    mycursor.execute("SELECT * FROM post")
    res = mycursor.fetchall()

    for i in range(500):
        postId = select_random_postId(res)
        creationTime = gen_random_creation_time()
        reportReason = "spam"

        sql = "INSERT INTO reportposts (postID, creationTime, reportReason) VALUES (%s, %s, %s)"
        val = (postId, creationTime, reportReason)
        mycursor.execute(sql, val)


def insert_report_comments():
    mycursor.execute("SELECT * FROM comment")
    res = mycursor.fetchall()

    for i in range(500):
        commentId = select_random_commentId(res)
        creationTime = gen_random_creation_time()
        reportReason = "spam"

        sql = "INSERT INTO reportcomments (commentID, creationTime, reportReason) VALUES (%s, %s, %s)"
        val = (commentId, creationTime, reportReason)
        mycursor.execute(sql, val)


def insert_comments():
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
    for i in range(USERS):
        followerId = select_random_userId()
        followingId = select_random_userId()

        if followerId != followingId:
            sql = "INSERT INTO follows (followerId, followingId) VALUES (%s, %s)"
            val = (followerId, followingId)
            mycursor.execute(sql, val)


def main():
    # insert_admin()            # DONE
    # insert_users()            # DONE
    insert_banned_users()  # UNDONE
    # insert_follows()          # DONE

    # insert_posts()            # DONE
    # insert_comments()         # DONE

    # # COMMENT REACTS          # UNDONE
    # # POST REACTS             # UNDONE

    # insert_report_comments()  # DONE
    # insert_reportposts()      # DONE

    mydb.commit()
    print("DONE, Exiting")


main()
