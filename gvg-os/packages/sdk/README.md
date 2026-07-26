# @gvg/sdk

Declarative plugin authoring:

```ts
import {
  definePlugin,
  defineRoute,
  definePermission,
  defineNavigation,
  defineDashboardWidget,
} from "@gvg/sdk";

export const plugin = definePlugin({
  manifest: { id: "demo", name: "Demo", version: "1.0.0" },
  routes: [defineRoute({ path: "/demo", component: "DemoPage" })],
  navigation: [defineNavigation({ label: "Demo", href: "/demo" })],
  permissions: [definePermission("demo.read")],
  widgets: [
    defineDashboardWidget({
      id: "demo.widget",
      title: "Demo Widget",
      component: "widgets/Demo",
    }),
  ],
});
```
