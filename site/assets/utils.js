const fetchJSONWithUrlSearchParams = (url, objectWithData) => {
    const params = new URLSearchParams();

    Object.keys(objectWithData).forEach((key) => {
        params.append(key, objectWithData[key]);
    });

    return fetch(url, {
        method: "POST",
        body: params,
        cors: true,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
    }).then((res) => res.json());
};

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const startJSONDownload = (filename, data) => {
    const string = JSON.stringify(data);
    const bytes = new TextEncoder().encode(string);
    const blob = new Blob([bytes], { type: "application/json;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
};

module.exports = {
    fetchJSONWithUrlSearchParams,
    isEmptyObject,
    startJSONDownload
};
