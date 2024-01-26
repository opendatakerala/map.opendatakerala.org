import { autocomp } from "@knadh/autocomp";

const searchData = fetch("/data.json")
    .then((res) => res.json())
    .then(data => {
        const results = []
        for (const district of Object.keys(data)) {
            for (const el of data[district]) {
                const { urlpath, ...rest} = el;
                const target = `/${urlpath}/`
                results.push({
                    ...rest,
                    district,
                    target,
                })
            }
        }
        return results;
    })

const fuzzymatch = (target, searchstring) => {
    if (target.includes(searchstring)) return true;
    return false;
}

export const setupSearch = (selector, onChange) => {
    autocomp(document.querySelector(selector), {
        onQuery: async (val) => {
            const q = val.trim().toLowerCase();
            return searchData.then(lsg => {
                return lsg.filter((lsg) => fuzzymatch(lsg.len, val) || fuzzymatch(lsg.lml, val))
            })
        },

        onSelect: (lsg) => {
            document.querySelector(selector).dispatchEvent(new CustomEvent("navigate-to-lsg", {
                detail: {
                    lsg
                }
            }))
            return lsg.len
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
