#!/usr/bin/env python3

# MapKerala - showcase Kerala sub-maps from OpenStreetMap
# Copyright (C) 2021 Open Data Kerala contributors

# This program is free software: you can redistribute it and/or modify it 
# under the terms of the GNU Affero General Public License as published by 
# the Free Software Foundation, either version 3 of the License, 
# or (at your option) any later version.

# This program is distributed in the hope that it will be useful, 
# but WITHOUT ANY WARRANTY; without even the implied warranty of 
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See 
# the GNU Affero General Public License for more details.

# You should have received a copy of the GNU Affero General Public License 
# along with this program. If not, see <https://www.gnu.org/licenses/>.

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
    row['description'] = f"Geospatial data about {row['len']} ({row['districtLabel']})"
    row['images'] = [f"/img/{row['qid']}.png"]

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

static_json_filename = Path(HUGO_ROOT_DIR, "static", "data.json")
fields_to_keep = ["len", "lml", "qid"]
stripped_data = {
    district: [
        {
            field: lsg[field]
            for field in fields_to_keep
        } for lsg in menu_items[district]
    ] for district in menu_items
}
with open(static_json_filename, 'w') as static_json:
    static_json.write(json.dumps(stripped_data, indent=4))