import path from "path";

export const spaRedirect = (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../../public', 'index.html')
    );
};

export const forceHttps = (request, response, next) => {
    if (process.env.NODE_ENV != 'development' && !request.secure) {
        return response.redirect("https://" + request.headers.host + request.url);
    }

    next();
}