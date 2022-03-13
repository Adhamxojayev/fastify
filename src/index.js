const fastify = require('fastify')

const app = fastify() // {logger: true}

app.register( require('fastify-swagger'),{
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
        info: {title: 'users-Book'}
    }
} )

// load Modules
app.register(require('./modules/user') )
app.register(require('./modules/book') )


;( async () => {
    try {
        await app.listen(4000)
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
})()