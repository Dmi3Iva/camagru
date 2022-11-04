const indexView = (req, res) => {
    res.render("index", {
        user: {
            isAuth: false
        }
    });
};


module.exports = {
    indexView,
};