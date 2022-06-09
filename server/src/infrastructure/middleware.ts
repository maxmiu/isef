import path from "path";

export const spaRedirect = (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../../public', 'index.html')
    );
};