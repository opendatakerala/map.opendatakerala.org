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

module.exports = {
    fetchJSONWithUrlSearchParams,
    isEmptyObject,
};
