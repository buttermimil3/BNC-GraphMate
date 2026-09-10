-- ============================================================
-- BNC GraphMate - Initial Database Schema
-- Migration: 001_initial_schema.sql
-- Created: 2026-09-10
-- ============================================================

-- ============================================================
-- SEQUENCES
-- ============================================================

CREATE SEQUENCE IF NOT EXISTS order_seq START 1;

-- ============================================================
-- HELPER FUNCTION: Auto-generate order number
-- ============================================================

CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT
LANGUAGE sql
AS $$
  SELECT 'ORD-' || LPAD(nextval('order_seq')::TEXT, 6, '0');
$$;

-- ============================================================
-- TABLE: customers
-- Maps to auth.users via id = auth.uid()
-- ============================================================

CREATE TABLE IF NOT EXISTS customers (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT,
  member_code    TEXT        UNIQUE,
  line_id        TEXT,
  email          TEXT,
  phone          TEXT,
  total_points   INT         NOT NULL DEFAULT 0,
  member_level   TEXT        NOT NULL DEFAULT 'BRONZE',
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- TABLE: products
-- ============================================================

CREATE TABLE IF NOT EXISTS products (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name             TEXT        NOT NULL,
  category         TEXT,
  description      TEXT,
  price            NUMERIC     NOT NULL,
  image_url        TEXT,
  delivery_type    TEXT        NOT NULL CHECK (delivery_type IN ('GOOGLE_DRIVE', 'MANUAL')),
  drive_folder_id  TEXT,
  drive_file_id    TEXT,
  status           TEXT        NOT NULL DEFAULT 'ACTIVE',
  what_you_get     TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- TABLE: fonts
-- ============================================================

CREATE TABLE IF NOT EXISTS fonts (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name              TEXT        NOT NULL,
  description       TEXT,
  price             NUMERIC     NOT NULL,
  preview_text      TEXT,
  preview_image_url TEXT,
  category          TEXT,
  delivery_type     TEXT        NOT NULL CHECK (delivery_type IN ('GOOGLE_DRIVE', 'MANUAL')),
  drive_folder_id   TEXT,
  drive_file_id     TEXT,
  status            TEXT        NOT NULL DEFAULT 'ACTIVE',
  what_you_get      TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- TABLE: groups
-- ============================================================

CREATE TABLE IF NOT EXISTS groups (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name              TEXT        NOT NULL,
  description       TEXT,
  cover_image_url   TEXT,
  price             NUMERIC     NOT NULL,
  preview_drive_url TEXT,
  benefits          TEXT,
  status            TEXT        NOT NULL DEFAULT 'ACTIVE',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- TABLE: orders
-- ============================================================

CREATE TABLE IF NOT EXISTS orders (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT        UNIQUE NOT NULL DEFAULT generate_order_number(),
  customer_id  UUID        NOT NULL REFERENCES customers (id) ON DELETE RESTRICT,
  product_id   UUID        REFERENCES products (id) ON DELETE SET NULL,
  font_id      UUID        REFERENCES fonts (id) ON DELETE SET NULL,
  group_id     UUID        REFERENCES groups (id) ON DELETE SET NULL,
  order_type   TEXT        NOT NULL CHECK (order_type IN ('PRODUCT', 'FONT', 'GROUP')),
  amount       NUMERIC     NOT NULL,
  status       TEXT        NOT NULL DEFAULT 'PENDING_PAYMENT',
  gmail        TEXT,
  line_id      TEXT,
  notes        TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- TABLE: payments
-- ============================================================

CREATE TABLE IF NOT EXISTS payments (
  id                   UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id             UUID        NOT NULL REFERENCES orders (id) ON DELETE RESTRICT,
  amount               NUMERIC     NOT NULL,
  slip_image_url       TEXT,
  verification_status  TEXT        NOT NULL DEFAULT 'PENDING'
                                   CHECK (verification_status IN ('PENDING', 'VERIFYING', 'PAID', 'REJECTED', 'EXPIRED')),
  verified_by          UUID,       -- references auth.users, nullable
  verified_at          TIMESTAMPTZ,
  verification_notes   TEXT,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- TABLE: group_access
-- ============================================================

CREATE TABLE IF NOT EXISTS group_access (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id     UUID        NOT NULL REFERENCES orders (id) ON DELETE RESTRICT,
  customer_id  UUID        NOT NULL REFERENCES customers (id) ON DELETE RESTRICT,
  group_id     UUID        NOT NULL REFERENCES groups (id) ON DELETE RESTRICT,
  line_id      TEXT,
  status       TEXT        NOT NULL DEFAULT 'PENDING'
                           CHECK (status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED')),
  completed_at TIMESTAMPTZ,
  notes        TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- TABLE: drive_access
-- ============================================================

CREATE TABLE IF NOT EXISTS drive_access (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id      UUID        NOT NULL REFERENCES orders (id) ON DELETE RESTRICT,
  customer_id   UUID        NOT NULL REFERENCES customers (id) ON DELETE RESTRICT,
  product_id    UUID        REFERENCES products (id) ON DELETE SET NULL,
  font_id       UUID        REFERENCES fonts (id) ON DELETE SET NULL,
  gmail         TEXT,
  drive_id      TEXT,
  permission_id TEXT,
  status        TEXT        NOT NULL DEFAULT 'WAITING_EMAIL'
                            CHECK (status IN ('WAITING_EMAIL', 'PROCESSING', 'GRANTED', 'COMPLETED', 'FAILED')),
  completed_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- TABLE: point_transactions
-- ============================================================

CREATE TABLE IF NOT EXISTS point_transactions (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID        NOT NULL REFERENCES customers (id) ON DELETE RESTRICT,
  amount      INT         NOT NULL,
  type        TEXT        NOT NULL CHECK (type IN ('EARN', 'REDEEM', 'ADJUST', 'BONUS')),
  description TEXT,
  order_id    UUID        REFERENCES orders (id) ON DELETE SET NULL,
  created_by  UUID,       -- references auth.users, nullable (admin who performed adjustment)
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- TABLE: reviews
-- ============================================================

CREATE TABLE IF NOT EXISTS reviews (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id  UUID        NOT NULL REFERENCES customers (id) ON DELETE RESTRICT,
  order_id     UUID        NOT NULL REFERENCES orders (id) ON DELETE RESTRICT,
  product_name TEXT,
  rating       INT         NOT NULL CHECK (rating >= 1 AND rating <= 5),
  message      TEXT,
  image_url    TEXT,
  status       TEXT        NOT NULL DEFAULT 'PENDING'
                           CHECK (status IN ('PENDING', 'APPROVED', 'HIDDEN')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- TABLE: portfolio
-- ============================================================

CREATE TABLE IF NOT EXISTS portfolio (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT        NOT NULL,
  description TEXT,
  image_url   TEXT,
  category    TEXT,
  sort_order  INT         NOT NULL DEFAULT 0,
  is_featured BOOLEAN     NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- TABLE: settings
-- Singleton row enforced by PK = 1
-- ============================================================

CREATE TABLE IF NOT EXISTS settings (
  id                  INT         PRIMARY KEY DEFAULT 1,
  shop_name           TEXT        NOT NULL DEFAULT 'BNC GraphMate',
  logo_url            TEXT,
  line_oa_url         TEXT,
  line_channel_token  TEXT,
  qr_payment_url      TEXT,
  bank_account        TEXT,
  bank_name           TEXT,
  contact_phone       TEXT,
  contact_line        TEXT,
  theme_color         TEXT        NOT NULL DEFAULT '#FF5C9A',
  announcement        TEXT,
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- Enforce singleton: only row with id=1 is allowed
  CONSTRAINT settings_singleton CHECK (id = 1)
);

-- ============================================================
-- TABLE: admin_users
-- Linked to Supabase auth.users
-- ============================================================

CREATE TABLE IF NOT EXISTS admin_users (
  id         UUID        PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  email      TEXT        NOT NULL,
  name       TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_orders_customer_id
  ON orders (customer_id);

CREATE INDEX IF NOT EXISTS idx_orders_status
  ON orders (status);

CREATE INDEX IF NOT EXISTS idx_payments_order_id
  ON payments (order_id);

CREATE INDEX IF NOT EXISTS idx_point_transactions_customer_id
  ON point_transactions (customer_id);

CREATE INDEX IF NOT EXISTS idx_reviews_status
  ON reviews (status);

-- Additional useful indexes
CREATE INDEX IF NOT EXISTS idx_orders_created_at
  ON orders (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_customers_member_code
  ON customers (member_code);

CREATE INDEX IF NOT EXISTS idx_customers_line_id
  ON customers (line_id);

CREATE INDEX IF NOT EXISTS idx_group_access_customer_id
  ON group_access (customer_id);

CREATE INDEX IF NOT EXISTS idx_drive_access_customer_id
  ON drive_access (customer_id);

CREATE INDEX IF NOT EXISTS idx_portfolio_sort_order
  ON portfolio (sort_order);

CREATE INDEX IF NOT EXISTS idx_portfolio_is_featured
  ON portfolio (is_featured) WHERE is_featured = true;

-- ============================================================
-- ROW LEVEL SECURITY - Enable on all tables
-- ============================================================

ALTER TABLE customers          ENABLE ROW LEVEL SECURITY;
ALTER TABLE products           ENABLE ROW LEVEL SECURITY;
ALTER TABLE fonts              ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups             ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders             ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments           ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_access       ENABLE ROW LEVEL SECURITY;
ALTER TABLE drive_access       ENABLE ROW LEVEL SECURITY;
ALTER TABLE point_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews            ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio          ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings           ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users        ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- RLS POLICIES: customers
-- Users can only see/edit their own row (customers.id = auth.uid())
-- Admins can see/edit all rows
-- ============================================================

CREATE POLICY "customers_select_own"
  ON customers FOR SELECT
  USING (
    id = auth.uid()
    OR EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "customers_insert_own"
  ON customers FOR INSERT
  WITH CHECK (id = auth.uid());

CREATE POLICY "customers_update_own"
  ON customers FOR UPDATE
  USING (
    id = auth.uid()
    OR EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  )
  WITH CHECK (
    id = auth.uid()
    OR EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "customers_delete_admin_only"
  ON customers FOR DELETE
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- ============================================================
-- RLS POLICIES: products
-- SELECT for everyone (including anon), write for admin only
-- ============================================================

CREATE POLICY "products_select_all"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "products_insert_admin_only"
  ON products FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "products_update_admin_only"
  ON products FOR UPDATE
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "products_delete_admin_only"
  ON products FOR DELETE
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- ============================================================
-- RLS POLICIES: fonts
-- SELECT for everyone (including anon), write for admin only
-- ============================================================

CREATE POLICY "fonts_select_all"
  ON fonts FOR SELECT
  USING (true);

CREATE POLICY "fonts_insert_admin_only"
  ON fonts FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "fonts_update_admin_only"
  ON fonts FOR UPDATE
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "fonts_delete_admin_only"
  ON fonts FOR DELETE
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- ============================================================
-- RLS POLICIES: groups
-- SELECT for everyone (including anon), write for admin only
-- ============================================================

CREATE POLICY "groups_select_all"
  ON groups FOR SELECT
  USING (true);

CREATE POLICY "groups_insert_admin_only"
  ON groups FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "groups_update_admin_only"
  ON groups FOR UPDATE
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "groups_delete_admin_only"
  ON groups FOR DELETE
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- ============================================================
-- RLS POLICIES: orders
-- Users see only their own orders (customer_id references their customer row)
-- ============================================================

CREATE POLICY "orders_select_own"
  ON orders FOR SELECT
  USING (
    customer_id IN (SELECT id FROM customers WHERE id = auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "orders_insert_own"
  ON orders FOR INSERT
  WITH CHECK (
    customer_id IN (SELECT id FROM customers WHERE id = auth.uid())
  );

CREATE POLICY "orders_update_own_or_admin"
  ON orders FOR UPDATE
  USING (
    customer_id IN (SELECT id FROM customers WHERE id = auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  )
  WITH CHECK (
    customer_id IN (SELECT id FROM customers WHERE id = auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "orders_delete_admin_only"
  ON orders FOR DELETE
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- ============================================================
-- RLS POLICIES: payments
-- Users see only payments linked to their own orders
-- ============================================================

CREATE POLICY "payments_select_own"
  ON payments FOR SELECT
  USING (
    order_id IN (
      SELECT id FROM orders
      WHERE customer_id IN (SELECT id FROM customers WHERE id = auth.uid())
    )
    OR EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "payments_insert_own"
  ON payments FOR INSERT
  WITH CHECK (
    order_id IN (
      SELECT id FROM orders
      WHERE customer_id IN (SELECT id FROM customers WHERE id = auth.uid())
    )
  );

CREATE POLICY "payments_update_admin_only"
  ON payments FOR UPDATE
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "payments_delete_admin_only"
  ON payments FOR DELETE
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- ============================================================
-- RLS POLICIES: group_access
-- Users see only their own group_access rows
-- ============================================================

CREATE POLICY "group_access_select_own"
  ON group_access FOR SELECT
  USING (
    customer_id IN (SELECT id FROM customers WHERE id = auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "group_access_insert_own"
  ON group_access FOR INSERT
  WITH CHECK (
    customer_id IN (SELECT id FROM customers WHERE id = auth.uid())
  );

CREATE POLICY "group_access_update_admin_only"
  ON group_access FOR UPDATE
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "group_access_delete_admin_only"
  ON group_access FOR DELETE
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- ============================================================
-- RLS POLICIES: drive_access
-- Users see only their own drive_access rows
-- ============================================================

CREATE POLICY "drive_access_select_own"
  ON drive_access FOR SELECT
  USING (
    customer_id IN (SELECT id FROM customers WHERE id = auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "drive_access_insert_own"
  ON drive_access FOR INSERT
  WITH CHECK (
    customer_id IN (SELECT id FROM customers WHERE id = auth.uid())
  );

CREATE POLICY "drive_access_update_admin_only"
  ON drive_access FOR UPDATE
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "drive_access_delete_admin_only"
  ON drive_access FOR DELETE
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- ============================================================
-- RLS POLICIES: point_transactions
-- Users see only their own transactions; only admins can write
-- ============================================================

CREATE POLICY "point_transactions_select_own"
  ON point_transactions FOR SELECT
  USING (
    customer_id IN (SELECT id FROM customers WHERE id = auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "point_transactions_insert_admin_only"
  ON point_transactions FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "point_transactions_update_admin_only"
  ON point_transactions FOR UPDATE
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "point_transactions_delete_admin_only"
  ON point_transactions FOR DELETE
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- ============================================================
-- RLS POLICIES: reviews
-- INSERT: user can submit review for their own order
-- SELECT: approved reviews visible to all; users see their own (any status)
-- UPDATE/DELETE: admin only
-- ============================================================

CREATE POLICY "reviews_select_approved_or_own"
  ON reviews FOR SELECT
  USING (
    status = 'APPROVED'
    OR customer_id IN (SELECT id FROM customers WHERE id = auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "reviews_insert_own"
  ON reviews FOR INSERT
  WITH CHECK (
    customer_id IN (SELECT id FROM customers WHERE id = auth.uid())
    AND order_id IN (
      SELECT id FROM orders
      WHERE customer_id IN (SELECT id FROM customers WHERE id = auth.uid())
    )
  );

CREATE POLICY "reviews_update_admin_only"
  ON reviews FOR UPDATE
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "reviews_delete_admin_only"
  ON reviews FOR DELETE
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- ============================================================
-- RLS POLICIES: portfolio
-- SELECT for everyone (including anon), write for admin only
-- ============================================================

CREATE POLICY "portfolio_select_all"
  ON portfolio FOR SELECT
  USING (true);

CREATE POLICY "portfolio_insert_admin_only"
  ON portfolio FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "portfolio_update_admin_only"
  ON portfolio FOR UPDATE
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "portfolio_delete_admin_only"
  ON portfolio FOR DELETE
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- ============================================================
-- RLS POLICIES: settings
-- SELECT for everyone (including anon), write for admin only
-- ============================================================

CREATE POLICY "settings_select_all"
  ON settings FOR SELECT
  USING (true);

CREATE POLICY "settings_insert_admin_only"
  ON settings FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "settings_update_admin_only"
  ON settings FOR UPDATE
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "settings_delete_admin_only"
  ON settings FOR DELETE
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- ============================================================
-- RLS POLICIES: admin_users
-- Only existing admins can access this table (self-referential guard)
-- ============================================================

CREATE POLICY "admin_users_select_admin_only"
  ON admin_users FOR SELECT
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "admin_users_insert_admin_only"
  ON admin_users FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "admin_users_update_admin_only"
  ON admin_users FOR UPDATE
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "admin_users_delete_admin_only"
  ON admin_users FOR DELETE
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- ============================================================
-- DEFAULT DATA: Settings singleton row
-- ============================================================

INSERT INTO settings (id, shop_name)
VALUES (1, 'BNC GraphMate')
ON CONFLICT DO NOTHING;

-- ============================================================
-- END OF MIGRATION
-- ============================================================
