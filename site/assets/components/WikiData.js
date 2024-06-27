import { wikiBaseGetEntities } from '../wiki-utils';

const spinnerHTML = `<div class="spinner-grow" role="status">
<span class="visually-hidden">Loading...</span>
</div>`
export class WikiData extends HTMLElement {
    static observedAttributes = ["qid"];
    constructor() {
        super();
        const qid = this.getAttribute("qid") || "Q1186";
        this.innerHTML = spinnerHTML + this.createWikiLink(qid);
        this.dispatchData(qid)
    }
    dispatchData(qid) {
        wikiBaseGetEntities({ ids: qid }).then((data) => {
            this.innerHTML = this.createWikiLink(qid)
            document.body.dispatchEvent(new CustomEvent('wiki-data-loaded', {
                detail: {
                    data,
                    qid
                }
            }))
        });
    }
    createWikiLink(qid) {
        const link = `
            <p><a id="wikidata-link" target="_blank" 
                href="https://www.wikidata.org/wiki/${qid}">
                View on Wikidata
            </a></p>`;
        return link;
    }
    attributeChangedCallback(name, oldvalue, newValue) {
        if (name === "qid") {
            if (!newValue) {
                this.innerHTML = this.createWikiLink("Q1186")
            } else {
                this.innerHTML = this.createWikiLink(newValue);
                this.dispatchData(newValue);
            }
        }
    }
}
