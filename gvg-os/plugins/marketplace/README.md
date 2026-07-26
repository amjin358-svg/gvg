# @gvg/plugin-marketplace

## Commerce pipeline

```
Marketplace
    ↓
Products
    ↓
Supplier
    ↓
RFQ
    ↓
Procurement
```

Defined in `pipeline.ts` (`MARKETPLACE_PIPELINE`).

## Layout

```
plugins/marketplace/
├── pipeline.ts
├── modules.ts
├── manifest.ts
├── index.ts
├── routes.ts
├── permissions.ts
├── navigation.ts
├── product/          # Products
├── supplier/         # Supplier
├── rfq/              # RFQ
└── procurement/      # Procurement
```

```ts
import marketplace, {
  MARKETPLACE_PIPELINE,
  product,
  supplier,
  rfq,
  procurement,
} from "@gvg/plugin-marketplace";
```
