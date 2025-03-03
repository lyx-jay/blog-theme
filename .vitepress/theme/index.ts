import TwoslashFloatingVue from "@shikijs/vitepress-twoslash/client";
import "@shikijs/vitepress-twoslash/style.css";
import type { EnhanceAppContext } from "vitepress";
import Theme from "vitepress/theme";
import Archives from "./components/Archives.vue";
import MyLayout from "./components/MyLayout.vue";
import Tags from "./components/Tags.vue";

import Projects from "./components/Projects.vue";
import "./custom.css";

export default {
  extends: Theme,
  Layout: MyLayout,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component("Archives", Archives);
    app.component("Tags", Tags);
    app.component("Projects", Projects);
    app.use(TwoslashFloatingVue);
  },
};
