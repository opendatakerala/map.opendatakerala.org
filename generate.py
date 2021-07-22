import csv
import json
from pathlib import Path

DATA_FILE = "data/lsgkerala.csv"
TARGET_DIR = "site/content"


def csvAsSequence(filename):
    with open(filename, newline='') as csvfile:
        csvReader = csv.DictReader(csvfile)
        for row in csvReader:
            yield row


def get_district(row):
    return ' '.join(row['districtLabel'].split(' ')[:-1])

records = csvAsSequence(DATA_FILE)

rowstoread = 0
for row in records:
    # headers are
    # qid,len,lml,districtLabel,mldistrictLabel,enarticle,mlarticle,LGDcode,LSGcode,wards

    row['title'] = f"{row['len']} | {row['lml']} | {row['mldistrictLabel']} | {row['districtLabel']}" 

    district = get_district(row)
    district_dir = TARGET_DIR + "/" + district
    Path(district_dir).mkdir(parents=True, exist_ok=True)

    pagefilename = district_dir + "/" + row['len'] + ".md"
    with open(pagefilename, 'w') as page:
        json.dump(row, page)
    rowstoread -= 1
    if rowstoread == 0:
        break
