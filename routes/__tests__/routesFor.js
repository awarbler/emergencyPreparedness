// { '/': [ 'get', 'post' ], '/:name': [ 'get', 'put', 'delete' ] }
const routesFor = (router) => {
    const results = {};

    const routes = router.stack.map((layer) => layer.route);

    // console.log(routes);
    routes.forEach((route) => {
        if (!route) return;

        results[route.path] ||= [];
        results[route.path] = results[route.path].concat(Object.keys(route.methods));
    })

    return results;
}

module.exports = routesFor;