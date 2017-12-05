import json
import csv
from pprint import pprint

question = {1: "w1", 2: "w2", 3: "bs1", 4: "bs2", 5: "bsm1", 6: "bsm2", 7: "ss1", 8: "ss2", 9: "ssm1", 10: "ssm2"}

def parseUserData():
    users = json.load(open("user.json"))
    result = {}
    for user in users:
        result[user["participantId"]]  = user
    return result

def parsePaperData():
    papers = json.load(open("paper.json"))
    result = {}
    for paper in papers:
        result[paper["userId"]] = paper
    return result

def validate(users, papers):
    result = {}
    for user in users:
        if user not in papers: continue
        if users[user]["device"] != "phone": continue
        if len(papers[str(user)]["eval"]) == 10:
            result[user] = {
                "firstName": users[user]["firstName"],
                "lastName": users[user]["lastName"],
                "device": users[user]["device"],
                "screenWidth": users[user]["screenWidth"],
                "screenHeight": users[user]["screenHeight"],
                "screenRatio": users[user]["devicePixelRatio"],
                "eval": dict((k, {}) for k in question.values())
            }

            if "gender" in users[user]:
                result[user]["gender"] = users[user]["gender"]
            else:
                result[user]["gender"] = "n/a"

            answers = papers[user]["eval"]
            questionOrder = [users[user]["questionOrder"][str(i)] for i in xrange(1, 11)]

            for i, q in enumerate(questionOrder):
                # print type(q)
                if i == 0:
                    result[user]["eval"]["w1"] = answers[q - 1]
                    continue
                if i == 1:
                    result[user]["eval"]["w2"] = answers[q - 1]
                    continue
                result[user]["eval"][question[q]] = answers[q - 1]
            # pprint(result[user])
            # break

    return result

def writeData(data):
    with open('data.csv', 'w') as f:
        writer = csv.writer(f)
        firstRow = ["first name", "last name", "gender", "device", "screen width", "screen height", "pixel ratio"]
        for q in question.values():
            firstRow += [q + " result", q + " first time", q + " last time", q + " relunctance"]
        writer.writerow(firstRow)
        for userId in data:
            row = [data[userId]["firstName"], data[userId]["lastName"], data[userId]["gender"], data[userId]["device"], data[userId]["screenWidth"], data[userId]["screenHeight"], data[userId]["screenRatio"]]
            evaluation = data[userId]["eval"]
            for q in question.values():
                evalQ = evaluation[q]
                if "result" not in evalQ: break
                row += [evalQ["result"], evalQ["firstDecided"], evalQ["lastDecided"], evalQ["reluctance"]]
            writer.writerow(row)


def main():
    users = parseUserData()
    papers = parsePaperData()
    data = validate(users, papers)
    writeData(data)
    pprint(data)




main()
