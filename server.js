// Create koa app
import koa from 'koa';
import routes from './routes/index'

let app = koa();

routes(app);

app.on('error', function(error){
  console.log('ERROR', error)
})

let port = process.env.PORT || 5000;

app.listen(port);

console.log(`App started listening on ${port}`);

export default app;