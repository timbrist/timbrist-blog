

// route handler

class Router{
    constructor(){
        //string -> handler
        // "GET /api" -> callback function
        this.routes = new Map();
    }
    
    get(pathname, handler) {
        this.addRoute("GET", pathname, handler);
        return this;
    }

    post(pathname, handler) {
        this.addRoute("POST", pathname, handler);
        return this;
    }

    put(pathname, handler) {
        this.addRoute("PUT", pathname, handler);
        return this;
    }

    delete(pathname, handler) {
        this.addRoute("DELETE", pathname, handler);
        return this;
    }

    /**
     * 
     * @param {string} method 
     * @param {string} pathname 
     * @returns 
     */
    routeKey(method, pathname) {
        return `${method.toUpperCase()} ${pathname}`;
    }

    /**
     * 
     * @param {string} method 
     * @param {string} pathname 
     * @param {function} handler 
     */
    addRoute(method, pathname, handler) {
        const key = this.routeKey(method, pathname);;
        if (this.routes.has(key)) {
            throw new Error(`Route already registered: ${key}`);
        }
            this.routes.set(key, handler);
    }

    /**
     * 
     * @param {string} method 
     * @param {string} pathname 
     * @returns function handler
     */
    getHandler(method,pathname){
        const key = this.routeKey(method, pathname);
        const handler = this.routes.get(key); 
        return handler;
    }


    /**
     * 
     * @param {http.IncomingMessage} req 
     * @param {http.ServerResponse} res 
     * @returns 
     */
    async handle(req, res, url) {
        const handler = this.getHandler(
            req.method ?? "GET",
            url.pathname,
        );

        //Handle path if there is no handler 
        if (!handler) {
            return false;
        }

        req.urlObject = url;
        req.query = url.searchParams;

        //execute handler
        await handler(req, res);
        return true;
    }

}

module.exports = { Router };