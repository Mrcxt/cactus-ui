import Index from "./src/index.vue";

import { reactive, nextTick, provide } from "vue";

// eslint-disable-next-line no-unused-vars
function assign(target, source) {
  for (var index = 1, key, src; index < arguments.length; ++index) {
    src = arguments[index];

    for (key in src) {
      if (Object.prototype.hasOwnProperty.call(src, key)) {
        target[key] = src[key];
      }
    }
  }

  return target;
}

Index.install = (app, options = {}, name = "$progress") => {
  const defaultOptions = {
    color: "#3eaf7c",
    failColor: "red",
    height: "2px",
  };

  const privateOptions = {
    status: "on", // success , fail
    width: 0,
  };

  const RADON_LOADING_BAR = reactive(
    Object.assign({}, defaultOptions, options, privateOptions)
  );

  app.provide("RADON_LOADING_BAR", RADON_LOADING_BAR);

  let Progress = {
    state: {
      timer: null,
      cut: 0,
    },
    start(time = 3000) {
      clearInterval(this.state.timer);
      RADON_LOADING_BAR.width = 0;
      RADON_LOADING_BAR.status = "on";
      this.state.cut = 10000 / Math.floor(time);
      this.autoIncrease();
    },
    autoIncrease() {
      this.state.timer = setInterval(() => {
        this.increase(this.state.cut * Math.random());
      }, 100);
    },
    pause() {
      clearInterval(this.state.timer);
    },
    unpause() {
      clearInterval(this.state.timer);
      this.autoIncrease();
    },
    increase(num = 1) {
      RADON_LOADING_BAR.width = Math.min(
        99,
        RADON_LOADING_BAR.width + Math.floor(num)
      );
    },
    decrease(num = 1) {
      RADON_LOADING_BAR.width = RADON_LOADING_BAR.width - Math.floor(num);
    },
    hide() {
      RADON_LOADING_BAR.width = 100;
      clearInterval(this.state.timer);
      this.state.timer = null;

      setTimeout(() => {
        setTimeout(() => {
          RADON_LOADING_BAR.width = 0;
        }, 100);
      }, 600);
    },
    finish() {
      RADON_LOADING_BAR.status = "success";
      this.hide();
    },
    fail() {
      RADON_LOADING_BAR.status = "fail";
      this.hide();
    },
  };

  app.provide(name, Progress);
  app.component(Index.name, Index);
};

export default Index;
