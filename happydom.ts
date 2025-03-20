import { GlobalRegistrator } from "@happy-dom/global-registrator";

GlobalRegistrator.register({
  url: "http://localhost:8080",
  settings: { fetch: { disableSameOriginPolicy: true } },
});
