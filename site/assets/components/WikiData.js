import { wikiBaseGetEntities } from '../wiki-utils';

export class WikiData extends HTMLElement {
    constructor() {
        super();
        const qid = this.getAttribute("qid") || "Q1186";
        const link = `
            <p><a id="wikidata-link" target="_blank" 
                href="https://www.wikidata.org/wiki/${qid}">
                View on Wikidata
            </a></p>`;
        this.innerHTML = link;
        wikiBaseGetEntities({ ids: qid }).then((data) => {
            document.body.dispatchEvent(new CustomEvent('wiki-data-loaded', {
                detail: {
                    data,
                    qid
                }
            }))
        });
    }
}
