#!/usr/bin/env python
# -*- coding: utf-8 -*-

import csv
import random
import datetime

dayInMonth = {1: 31, 2: 29, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31}

"""
    Function: warmupGenerator
    =========================
    Create warm up visualization data set
    Three students on three subjects (each subject for each visualization)
"""
def warmupGenerator():

    def writeHelper(writerhf, dateList, student, s1, s2, s3):
        for date in dateList:
            writerhf.writerow([student, date, random.randint(s1, s1+9), random.randint(s2, s2+9), random.randint(s3, s3+9)])

    with open("processed/warmup.csv", "w") as f:
        writer = csv.writer(f)
        date = [datetime.date(2017, 1, 1), datetime.date(2017, 4, 1), datetime.date(2017, 7, 1), datetime.date(2017, 10, 1)]
        writer.writerow(["student", "date", "math score", "science score", "history score"])
        writeHelper(writer, date, "student A", 40, 60, 80)
        writeHelper(writer, date, "student B", 60, 80, 40)
        writeHelper(writer, date, "student C", 80, 40, 60)

"""
    Function: temperatureGenerator
    ==============================
    Create data set for 1 parameter visualization with bar graph
"""
def temperatureGenerator():
    date = [datetime.date(2016, i, j) for i in dayInMonth for j in xrange(1, dayInMonth[i] + 1)]
    stanford, bangkok, tokyo = [], [], []
    with open("raw/temp.csv", "r") as f:
        reader = csv.reader(f)
        for i, line in enumerate(reader):
            stanford.append(int(line[0]))
            bangkok.append(int(line[1]))
            tokyo.append(int(line[2]))

    with open("processed/temperature.csv", "w") as f:
        writer = csv.writer(f)
        writer.writerow(["id", "date", "city A", "city B", "city C"])
        for i, d in enumerate(date):
            writer.writerow([i, d, stanford[i], bangkok[i], tokyo[i]])

    with open("processed/temperature1.csv", "w") as f:
        writer = csv.writer(f)
        writer.writerow(["id", "date", "city", "temperature"])
        index = 0
        for i, d in enumerate(date):
            writer.writerow([index, d, "city A" ,stanford[i]])
            writer.writerow([index+1, d, "city B", bangkok[i]])
            writer.writerow([index+2, d, "city C", tokyo[i]])
            index += 3


temperatureGenerator()

"""
    Function: incomeGenerator
    =========================
    Create data set for 1 parameter visualization with scatter plot graph
    Set up:

    Year: 2000
        City A has 33%  N(5000, 1500), 33%  N(10000, 1500), 33%  N(15000, 1500), 1%  N(100000, 10000)
        City B has 33%  N(5000, 3000), 33%  N(10000, 3000), 33%  N(15000, 3000), 1%  N(100000, 20000)
        City C has 40%  N(10000, 2000), 30%  N(20000, 4000), 20%  N(30000, 6000), 10%  N(40000, 8000)

    Proceeding: 0.5 ± 0.01%  Growth Rate until 2009
    Economic Crisis on a random month in 2009: income drop by 50% ± 1%  on C but 40% ± 1%  on A and B
    Recovery Period: 1 ± 0.01%  Monthly Growth Rate for 6 months until 2015
"""
def incomeGenerator():

    numIndividual = 1000
    yearStart = 2000
    yearEnd = 2015
    yearCrisis = 2009

    def randomA():
        rand = random.random()
        if rand < 0.33: return random.gauss(5000, 1500)
        elif rand < 0.66: return random.gauss(10000, 1500)
        elif rand < 0.99: return random.gauss(15000, 1500)
        return random.gauss(100000, 10000)

    def randomB():
        rand = random.random()
        if rand < 0.33: return random.gauss(5000, 3000)
        elif rand < 0.66: return random.gauss(10000, 3000)
        elif rand < 0.99: return random.gauss(15000, 3000)
        return random.gauss(100000, 20000)

    def randomC():
        rand = random.random()
        if rand < 0.4: return random.gauss(10000, 2000)
        elif rand < 0.7: return random.gauss(20000, 4000)
        elif rand < 0.9: return random.gauss(30000, 6000)
        return random.gauss(40000, 8000)

    def write(writer, d, a, b, c):
        for i in xrange(len(a)):
            writer.writerow([i, d, a[i], b[i], c[i]])

    def update(a, b, c, m, s):
        return [map(lambda x: x * random.gauss(m, s), y) for y in [a,b,c]]

    date = [datetime.date(i, j, 1) for i in xrange(yearStart, yearEnd + 1) for j in xrange(1, 13)]
    baseA, baseB, baseC = [randomA() for _ in xrange(numIndividual)], [randomB() for _ in xrange(numIndividual)], [randomC() for _ in xrange(numIndividual)]
    randomDropMonth = datetime.date(yearCrisis, random.randint(1, 12), 1)

    with open("processed/income.csv", 'w') as f:
        writer = csv.writer(f)
        writer.writerow(["individual", "date", "city A", "city B", "city C"])
        for d in date:
            write(writer, d, baseA, baseB, baseC)
            if d == randomDropMonth:
                baseA = map(lambda x: x * random.gauss(0.06, 0.01), baseA)
                baseB = map(lambda x: x * random.gauss(0.06, 0.01), baseB)
                baseC = map(lambda x: x * random.gauss(0.05, 0.01), baseC)
            elif d < randomDropMonth:
                baseA, baseB, baseC = update(baseA, baseB, baseC, 1.005, 0.001)
            else:
                baseA, baseB, baseC = update(baseA, baseB, baseC, 1.01, 0.001)
