import Almanac from "./src/index.vue";

Almanac.install = (app = App) => {
  app.component(Almanac.name, Almanac);
};

export default Almanac;
