// Generic Vue component mount for use in transitional mount functions, Please
// use this instead of your own mount function so that all vue components get
// the same plugins and events.

import BootstrapVue from "bootstrap-vue";
import { iconPlugin, localizationPlugin, vueRxShortcutPlugin } from "components/plugins";
import { createPinia, PiniaVuePlugin } from "pinia";
import Vue from "vue";

// Load Pinia
Vue.use(PiniaVuePlugin);

// Bootstrap components
Vue.use(BootstrapVue);

// localization filters and directives
Vue.use(localizationPlugin);

// rxjs utilities
Vue.use(vueRxShortcutPlugin);

// font-awesome svg icon registration/loading
Vue.use(iconPlugin);

// Create Pinia
const pinia = createPinia();

export const mountVueComponent = (ComponentDefinition) => {
    const component = Vue.extend(ComponentDefinition);
    return (propsData, el) => new component({ propsData, el, pinia });
};

export const replaceChildrenWithComponent = (el, ComponentDefinition, propsData = {}) => {
    const container = document.createElement("div");
    el.replaceChildren(container);
    const component = Vue.extend(ComponentDefinition);
    const mountFn = (propsData, el) => new component({ propsData, el, pinia });
    return mountFn(propsData, container);
};
