import Index from "./src/index.vue";

Index.install = (app) => {
  app.component(Index.name, Index);
};

export default Index;
