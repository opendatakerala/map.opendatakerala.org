import { autocomp } from "@knadh/autocomp";
import levenshtein from 'damerau-levenshtein';

const enWordEndings = ["Grama Panchayat", "Municipality", "Municipal Corporation"]
const enRegex = new RegExp(`\\b(?:${enWordEndings.join('|')})\\b$`, 'i');

const justNameEn = (item) => {
    while (enRegex.test(item)) {
        item = item.replace(enRegex, "").trim();
    }
    return item
}

const searchData = fetch("/data.json")
    .then((res) => res.json())
    .then(data => {
        const results = []
        for (const district of Object.keys(data)) {
            for (const el of data[district]) {
                const { urlpath, len, ...rest} = el;
                const target = `/${urlpath}/`
                const lenl = justNameEn(len).toLowerCase();
                results.push({
                    ...rest,
                    len,
                    lenl,
                    district,
                    target,
                })
            }
        }
        return results;
    })

export const getLsgFromPath = async (path) => {
    const data = await searchData;
    const result = data.filter(l => l.target === path);
    return result[0]
}

const orderByScore = (list, scorer) => {
    const scored = list.map(item => ({ item, score: scorer(item) }))
        .filter(i => i.score > 0);
    scored.sort((a, b) => b.score - a.score)
    return scored.map(i => i.item);
}

const searchInData = (data, term) => {
    return orderByScore(data, (item) => {
        if (item.lenl === term) return 100;
        if (item.lml === term) return 100;
        if (item.lenl.startsWith(term)) return 50;
        if (item.lml.startsWith(term)) return 50;
        if (item.lenl.includes(term)) return 20;
        if (item.lml.includes(term)) return 20;
        const lev = levenshtein(term, item.lenl);
        if (lev.steps > 0) return item.len.length - lev.steps;
        return 0;
    })
}

export const setupSearch = (selector, onChange) => {
    autocomp(document.querySelector(selector), {
        onQuery: async (val) => {
            const q = val.trim().toLowerCase();
            return searchData.then(lsg => {
                return searchInData(lsg, q);
            })
        },

        onSelect: (lsg) => {
            document.querySelector(selector).dispatchEvent(new CustomEvent("navigate-to-lsg", {
                detail: {
                    lsg
                }
            }))
            return lsg.len;
        },

        // If this callback is set, every search item (string or object) is passed to this function and its return
        // value (DOMNode), is appended to the results box.
        onRender: (lsg) => {
            const d = document.createElement("div");
            d.appendChild(document.createTextNode(lsg.len + " "));
            d.appendChild(document.createTextNode(lsg.lml));

            return d;
        }
    })
    document.querySelector(selector).addEventListener("navigate-to-lsg", (e) => {
        const {lsg} = e.detail;
        onChange(lsg);
    })
};
