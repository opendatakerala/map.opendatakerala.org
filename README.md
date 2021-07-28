# MapKerala

## Generating site

The `generate.py` script takes the data from `data/lsgkerala.csv` and generates content for the hugo site (one page per LSG).

Running `hugo` inside the site folder will generate the hugo site's output itself.

For example,

```
python generate.py
cd site
hugo server
```