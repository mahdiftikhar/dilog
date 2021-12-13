from os import name
import mysql.connector
from numpy.random.mtrand import randint
import pandas as pd
import numpy as np

mydb = mysql.connector.connect(
    host="localhost", user="root", password="Halo89527fc4!", database="dilog"
)
mycursor = mydb.cursor()

names = pd.read_csv("names.csv").to_numpy()
lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
USERS = 2000
POSTS = 4000
COMMENTS = 5000
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
    month = str(np.random.randint(1, 12))
    date = str(np.random.randint(1, 28))
    hour = str(np.random.randint(0, 23))
    min = str(np.random.randint(0, 59))
    sec = str(np.random.randint(0, 59))

    return year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec


mycursor.execute("SELECT * FROM post")
res = mycursor.fetchall()


def select_random_postId():
    idx = np.random.randint(0, len(res))
    return res[idx][0]


def insert_users():
    PASSWORD = "$2a$12$5IjSI1YGKz5eOctLDkk7NeW8ZUoE7zY48CTvMNjXxvtbqeXOeDO.S"  # this is just == password for all users

    for i in range(USERS):
        n = names[i][0]
        sql = "INSERT INTO user (userName, email, dateOfBirth, password) VALUES (%s, %s, %s, %s)"
        val = (n, n + "@gmail.com", "2000-12-30", PASSWORD)

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

    # print(idx, len(names))


def insert_comments():
    """
    `INSERT INTO comment
            (userName, postId, reacts, creationTime, text)
            VALUES
            (?, ?, ?, ?, ?);`
    """
    for i in range(COMMENTS):
        idx = np.random.randint(0, len(inserted_usernames))
        username = inserted_usernames[idx]

        postId = select_random_postId()
        creationTime = gen_random_creation_time()
        text = make_10_word_sentence(lorem)

        sql = "INSERT INTO comment (userName, postId, reacts, creationTime, text) VALUES (%s, %s, %s, %s, %s)"
        val = (username, postId, 0, creationTime, text)
        mycursor.execute(sql, val)


# insert_users()
# insert_posts()
# insert_comments()

mydb.commit()

print("end")
