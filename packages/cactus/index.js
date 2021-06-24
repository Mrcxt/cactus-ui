import Almanac from "@cactus-ui/almanac";

const components = [Almanac];

const install = (app) => {
  components.forEach((item) => {
    app.component(item.name, item);
  });
};

export default { install };
