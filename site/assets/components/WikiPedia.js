import { fetchWikiPageSummary } from '../wiki-utils';


const spinnerHTML = `<div class="spinner-grow" role="status">
<span class="visually-hidden">Loading...</span>
</div>`
export class WikiPedia extends HTMLElement {
    static observedAttributes = ["title"];
    constructor() {
        super();
        const lang = this.getAttribute('lang');
        this.innerHTML = spinnerHTML
    }
    readMoreLink(data) {
        const messages = {
            en: `Read more on wikipedia`,
            ml: `വിക്കിപീഡിയയില്‍ കൂടുതല്‍ വായിക്കാം`,
        };
        return `<a target="_blank" href=${data?.content_urls?.desktop?.page}>${messages[this.getAttribute('lang')]}`
    }
    createWikiLink() {
        const lang = this.getAttribute('lang');
        const messages = {
            en: `Create English wikipedia page!`,
            ml: `മലയാളം വികിപീഡിയയില്‍ ചേര്‍ക്കൂ`
        }
        return `<a 
            target="_blank"
            href="https://${lang}.wikipedia.org/wiki/${
                this.getAttribute('draft') || 'Title'
                }">${messages[lang]}
            </a>`
    }
    attributeChangedCallback(name, oldvalue, newValue) {
        const lang = this.getAttribute('lang');
        if (name === "title") {
            if (!newValue) {
                this.innerHTML = `<div class="card">${this.createWikiLink()}</div>`
            } else {
                this.innerHTML = spinnerHTML;
                fetchWikiPageSummary({ lang, title: newValue }).then(data => {
                    this.innerHTML = `<div class="card">
                        ${data.extract_html} ${this.readMoreLink(data)}
                    </div>`
                })
            }
        }
    }
}