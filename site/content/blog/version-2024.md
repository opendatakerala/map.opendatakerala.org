---
title: "Version 2024"
layout: 'meta'
---

With support from [HOT Booster Grant](https://wiki.openstreetmap.org/wiki/Kerala/Grants/HOTBoosterGrant2023/Proposal/Improving_Map_Kerala_Portal_(2023)) we are now releasing a new version of Map Kerala.

This version includes some exciting experiments.

## Redesigned landing page

Earlier we had a colorful, but static landing page:

<img src="https://lh7-us.googleusercontent.com/slidesz/AGV_vUcIj8uAYQf6pXP6WhBYGIVU1lTGNds3uWOnAv3U-a34KHUt1gILG7RpEBS6flPhcT_EarHs6F9EOvYBxS3AwZNLwxMhFntC6QFrXijcRr867hdeDcIvAjf-pH2Om1gbP-TWRNHGn4NCw-doqpKJaGefQau5wIdt=s2048?key=LBgx0i0A8r1gBsNdQ05XHQ" width="90%" />

Now we have a single experience for landing page and all inner pages:

<img src="https://lh7-us.googleusercontent.com/slidesz/AGV_vUfVBD6YXVXCTIDpNC2Gv_sNvLNcnn9U3xvfFHtJD9MVVLMATWvZMkWeqmGMYBJ-EEuUqDWxkdbJhXCNnq6ypgnWW7QMp4zPBNCVhtSJ0nQSd2rKt513iHkPOnKcWWDf41fQsmeqNhZn0Z1C7BR5L0PIJFsFU7VX=s2048?key=LBgx0i0A8r1gBsNdQ05XHQ" width="90%" />

## Side panel control panel

The most difficult change in this release was getting the control panel to work nicely.

We vendored in leaflet-panel-layers and patched it for our needs.

<img src="https://lh7-us.googleusercontent.com/slidesz/AGV_vUfRsuQzKsNoZk2j1EXpDz97k5Sk5Z0PklBM2_YasaeDuqyMGm3dyut6NucSE8y_AaviOqGtgACr0cq5dovwl6fXY-HF-JPAauFza5emPX3Gbx4L17aU3bRyvGzC5A8I2UYG9nblN8Rgn0er6VBNTXWHKlRG0to3=s2048?key=LBgx0i0A8r1gBsNdQ05XHQ" width="90%" />

## Better search

Earlier the search was using native autocomplete and this was not customizable

<img src="https://lh7-us.googleusercontent.com/slidesz/AGV_vUcqAIRVdAmkBcT7jIiKQUw3Qy-oOIkMHVkOp2JonEDaEStyPokIwLPD7pFSJDNmTIv1BkZ-yjiEUBg6sJcI0Ujhb-wwSixkehPbhjqvz2kjIcvLKbI99Jv8Ck8k5xUO0hUSn8nwQNL_57uXr6_fhGj8fw4P6Whp=s2048?key=LBgx0i0A8r1gBsNdQ05XHQ" width="90%" />

Now we have custom rendered component with greater control

<img src="https://lh7-us.googleusercontent.com/slidesz/AGV_vUfp_j4WwhBNfPdVqjuPaNOqzcM-hUbchv-InTwkhFF6Shuj_IyE3BNIqHgzzXH3dBrmlAVdqnTU1mL3k8hykB7QszipNhBxrW_NcA2tSqAJ4Zp6iUeY_ya9F9lxHwsJTetB2deHZlNMRCvWmZKipPPUeXSRtSU=s2048?key=LBgx0i0A8r1gBsNdQ05XHQ" width="90%" />

## More experiments

Towards enabling localized labels, we've added experimental support for [Tangram engine](https://github.com/tangrams/tangram). Note that to get localized labels we still need to do more work as the vector tiles we're getting don't have labels at all levels.

We now use WebComponents for updating Wikidata and Wikipedia cards.

And finally, we are now <a href="https://github.com/opendatakerala/map-kerala">open source!

<img src="https://lh7-us.googleusercontent.com/slidesz/AGV_vUeuMmivA-gK1k_7wsrRCw_bXSzuw7cHo1aKOVdI13Vc3FIpEj7wgL0qdsmOHTVWbwb71WJfdcu2kCIrf2wOc1udJoF3yfK__h0YLA27RT5YlsN-IcIqenGT5P1oksWinAO7rUfG6IBrYp5kXPCfC2iofuIYfqf0=s2048?key=LBgx0i0A8r1gBsNdQ05XHQ" width="90%"/></a>