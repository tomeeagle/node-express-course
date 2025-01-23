const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(method, url, time);
    next();
}


const logging = (req, res, next) => {
    console.log('logging');
    next();
}

module.exports = {logger, logging};