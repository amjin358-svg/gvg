# OS boot pipeline

```
Boot
  ↓
Load Plugins
  ↓
Generate Menu
  ↓
Generate Routes
  ↓
Generate Dashboard
  ↓
Inject Permission
  ↓
Ready
```

Implemented in `@gvg/kernel` via `PluginLoader.start()` / `RuntimeComposer` / `Application.boot()`.

| Stage | Purpose |
| --- | --- |
| `boot` | Host starts; lifecycle → bootstrapping |
| `load_plugins` | Discover, validate, install, and enable plugins (`PluginDiscovery` · `ManifestValidator` · `PluginLifecycleManager`) |
| `generate_menu` | Merge plugin navigation → shell menu |
| `generate_routes` | Merge plugin routes → shell router |
| `generate_dashboard` | Merge plugin widgets → dashboard |
| `inject_permission` | Merge plugin permissions into the auth surface |
| `ready` | Shell composition complete (`BootReport.composed`) |

Plugin ops: **Install · Enable · Disable · Update · Reload · Shutdown**

Module flags (e.g. `warehouse` / `crm` / `investment` = false) exclude plugins during Load Plugins.

Admin UI mirrors these steps on `/load-plugins`.
