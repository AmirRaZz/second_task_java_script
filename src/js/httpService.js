const app = axios.create({
    baseURL: "http://localhost:3000",
});

const http = {
    get: app.get,
    post: app.post,
    delete: app.delete,
    put: app.put,
    patch: app.patch,
};

export default http