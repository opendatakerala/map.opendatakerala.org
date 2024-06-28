# MapKerala

## Workflow

- Get clean data on OSM and wikidata
  - Ensure the QIDs are correctly mapped in both sites
- Fetch the data from wikidata and save it in a CSV file
- Use this file to generate content for hugo
- Use hugo layouts for all the other features

## Generating site

The `generate.py` script takes the data from `data/lsgkerala.csv` and generates content for the hugo site (one page per LSG).

Running `hugo` inside the site folder will generate the hugo site's output itself.

For example,

```
python generate.py
cd site
npm install
hugo server
```