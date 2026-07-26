# @gvg/core

```
packages/core/
├── runtime/         # Application / Tenant / Workspace / Request context
├── module/          # Module metadata · registry · loader
├── container/       # DI container · provider · inject
├── config/          # ConfigService · Environment · FeatureFlag · License
├── event/           # Pipeline · Dispatcher · Subscriber
├── services/        # Audit · Storage · Cache · Mail · Notification · Search
├── health/          # HealthService · HealthIndicator · StatusProvider
├── application/     # Application → … → Ready pipeline
├── audit/           # 稽核紀錄
├── telemetry/       # 使用與效能追蹤
├── cache/           # 快取抽象層
├── storage/         # 檔案儲存抽象層
├── notification/    # 通知中心
├── workflow/        # 工作流程引擎
├── scheduler/       # 排程服務
├── auth/
├── tenant/
├── workspace/
├── navigation/
├── permission/
└── featureFlag/
```

```ts
import {
  defineModule,
  createContainer,
  createToken,
  createIsolatedModuleLoader,
} from "@gvg/core";
```
