var Router = function () {

    var getHandlers = {};
    var postHandlers = {};
    var putHandlers = {};
    var deleteHandlers = {};
    var defaultHandler = null;
    this.get = function (regex, handler) {
        var parsed = regex.toString().replace(/^\/|(\/|\/\g)$/g, '');
        getHandlers[parsed] = handler;
    };

    this.post = function (regex, handler) {
        var parsed = regex.toString().replace(/^\/|(\/|\/\g)$/g, '');
        postHandlers[parsed] = handler;
    };

    this.put = function (regex, handler) {
        var parsed = regex.toString().replace(/^\/|(\/|\/\g)$/g, '');
        putHandlers[parsed] = handler;
    };

    this.delete = function (regex, handler) {
        var parsed = regex.toString().replace(/^\/|(\/|\/\g)$/g, '');
        deleteHandlers[parsed] = handler;
    };

    this.default = function (handler) {
        defaultHandler = handler;
    };

    this.handle = function (req) {

        var handlerGroup = {};

        var method = req.method();

        if (method === "GET") {
            handlerGroup = getHandlers;
        } else if (method === "POST") {
            handlerGroup = postHandlers;
        } else if (method === "PUT") {
            handlerGroup = putHandlers;
        } else if (method === "DELETE") {
            handlerGroup = deleteHandlers;
        }

        var handled = false;
        var handler = null;

        for (var r in handlerGroup) {
            var reg = new RegExp(r);
            if (reg.test(req.path())) {
                handler = handlerGroup[r];
                handled = true;
                break;
            }
        }
        if(handler != null){
            handler(req, req.response());
        } else if(defaultHandler != null) {
            defaultHandler(req, req.response());
            handled = true;
        }
        return handled;
    };
};

module.exports = Router;