import csv
import json
from pathlib import Path

DATA_FILE = "data/lsgkerala.csv"
HUGO_ROOT_DIR = "site"


def csvAsSequence(filename):
    with open(filename, newline='') as csvfile:
        csvReader = csv.DictReader(csvfile)
        for row in csvReader:
            yield row


def get_district(row):
    return ' '.join(row['districtLabel'].split(' ')[:-1])

def get_lsg(row):
    return row['len']

def sluggify(name):
    return name.lower().replace(" ", "-")

def get_slug(row):
    return sluggify(get_district(row) + "/" + get_lsg(row))

records = csvAsSequence(DATA_FILE)

# We need a dictionary to group LSGs to districts for select button
menu_items = {}

for row in records:
    # headers are
    # qid,len,lml,districtLabel,mldistrictLabel,enarticle,mlarticle,LGDcode,LSGcode,wards

    row['title'] = f"{row['len']} | {row['lml']} | {row['mldistrictLabel']} | {row['districtLabel']}" 

    district = get_district(row)
    
    # Add LSG to district group
    if district not in menu_items:
        menu_items[district] = []
    menu_items[district].append(row)
    
    # Write LSG details to hugo content
    district_dir = Path(HUGO_ROOT_DIR, "content", district)
    Path(district_dir).mkdir(parents=True, exist_ok=True)

    pagefilename = Path(district_dir, get_lsg(row) + ".md")
    with open(pagefilename, 'w') as page:
        json.dump(row, page)

select_text = '<select name="lsg" id="lsg-select">'
for district in menu_items:
    # each district is an optgroup
    select_text += '<optgroup label="{0}">'.format(district)
    for lsg in menu_items[district]:
        select_text += '<option value="/{0}/">{1}</option>'.format(get_slug(lsg), get_lsg(lsg))
    select_text += '</optgroup>'

select_text += '</select>'
select_html_filename = Path(HUGO_ROOT_DIR, "layouts", "partials", "lsg-select.html")
with open(select_html_filename, 'w') as select_partial:
    select_partial.write(select_text)