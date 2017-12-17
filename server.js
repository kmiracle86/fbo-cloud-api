import App from './app';

const port = process.env.PORT || 4000;

App.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
