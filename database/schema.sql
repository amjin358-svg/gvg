-- GVG Global Trade OS — core schema outline (Phase 2)
-- Apply via supabase/migrations when Supabase is connected.

-- roles: guest | customer | business_customer | supplier | sales |
--        purchasing | warehouse | finance | admin | super_admin | ai_agent

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer',
  company_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  country TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  category_id UUID NOT NULL REFERENCES categories(id),
  brand_id UUID NOT NULL REFERENCES brands(id),
  moq INTEGER NOT NULL CHECK (moq > 0),
  unit_price NUMERIC(12, 4) NOT NULL CHECK (unit_price >= 0),
  currency TEXT NOT NULL DEFAULT 'USD',
  origin_country TEXT NOT NULL,
  lead_time_days INTEGER NOT NULL DEFAULT 30,
  in_stock BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS rfqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category_id UUID REFERENCES categories(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  target_price NUMERIC(12, 4),
  currency TEXT NOT NULL DEFAULT 'USD',
  destination TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  buyer_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rfq_id UUID NOT NULL REFERENCES rfqs(id),
  supplier_id UUID REFERENCES profiles(id),
  unit_price NUMERIC(12, 4) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  lead_time_days INTEGER NOT NULL,
  valid_until DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE,
  buyer_id UUID REFERENCES profiles(id),
  supplier_id UUID REFERENCES profiles(id),
  status TEXT NOT NULL DEFAULT 'draft',
  total_amount NUMERIC(14, 2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  eta DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
