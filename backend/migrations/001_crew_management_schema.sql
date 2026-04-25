-- =====================================================================
-- Crew Management Tool — Multi-Tenant Schema (v1)
-- Created: Feb 2026
-- All tables prefixed with cm_ to isolate from existing app tables.
-- Every table has client_id for tenant isolation.
-- =====================================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---------------------------------------------------------------------
-- 1) cm_clients — the contractor (tenant)
-- One row per business that subscribed to the Crew Management add-on.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS cm_clients (
    id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id     uuid REFERENCES contracts(id) ON DELETE SET NULL,
    business_name   text NOT NULL,
    public_slug     text UNIQUE NOT NULL,
    timezone        text NOT NULL DEFAULT 'America/New_York',
    is_active       boolean NOT NULL DEFAULT true,
    created_at      timestamptz NOT NULL DEFAULT now(),
    updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cm_clients_contract ON cm_clients(contract_id);
CREATE INDEX IF NOT EXISTS idx_cm_clients_slug ON cm_clients(public_slug);

-- ---------------------------------------------------------------------
-- 2) cm_users — owners, dispatchers, crew members (people who log in)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS cm_users (
    id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id       uuid NOT NULL REFERENCES cm_clients(id) ON DELETE CASCADE,
    email           text NOT NULL,
    password_hash   text NOT NULL,
    full_name       text NOT NULL,
    phone           text,
    role            text NOT NULL CHECK (role IN ('owner', 'dispatcher', 'crew_member')),
    is_active       boolean NOT NULL DEFAULT true,
    last_login_at   timestamptz,
    created_at      timestamptz NOT NULL DEFAULT now(),
    updated_at      timestamptz NOT NULL DEFAULT now(),
    UNIQUE (client_id, email)
);

CREATE INDEX IF NOT EXISTS idx_cm_users_client ON cm_users(client_id);
CREATE INDEX IF NOT EXISTS idx_cm_users_email ON cm_users(email);

-- ---------------------------------------------------------------------
-- 3) cm_crews — the actual teams/rigs/trucks
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS cm_crews (
    id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id       uuid NOT NULL REFERENCES cm_clients(id) ON DELETE CASCADE,
    name            text NOT NULL,
    color           text NOT NULL DEFAULT '#0d9488',
    is_active       boolean NOT NULL DEFAULT true,
    created_at      timestamptz NOT NULL DEFAULT now(),
    updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cm_crews_client ON cm_crews(client_id);

-- ---------------------------------------------------------------------
-- 4) cm_crew_members — which users belong to which crews (many-to-many)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS cm_crew_members (
    id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    crew_id         uuid NOT NULL REFERENCES cm_crews(id) ON DELETE CASCADE,
    user_id         uuid NOT NULL REFERENCES cm_users(id) ON DELETE CASCADE,
    created_at      timestamptz NOT NULL DEFAULT now(),
    UNIQUE (crew_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_cm_crew_members_crew ON cm_crew_members(crew_id);
CREATE INDEX IF NOT EXISTS idx_cm_crew_members_user ON cm_crew_members(user_id);

-- ---------------------------------------------------------------------
-- 5) cm_customers — the homeowner/business getting service
-- (NOT a login user — they access via tokenized URL only)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS cm_customers (
    id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id       uuid NOT NULL REFERENCES cm_clients(id) ON DELETE CASCADE,
    full_name       text NOT NULL,
    email           text,
    phone           text,
    address         text,
    notes           text,
    created_at      timestamptz NOT NULL DEFAULT now(),
    updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cm_customers_client ON cm_customers(client_id);

-- ---------------------------------------------------------------------
-- 6) cm_jobs — a piece of work for a customer
-- Single-visit jobs have 1 visit; multi-day projects have many.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS cm_jobs (
    id                          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id                   uuid NOT NULL REFERENCES cm_clients(id) ON DELETE CASCADE,
    customer_id                 uuid NOT NULL REFERENCES cm_customers(id) ON DELETE RESTRICT,
    title                       text NOT NULL,
    description                 text,
    status                      text NOT NULL DEFAULT 'draft'
                                CHECK (status IN ('draft', 'scheduled', 'in_progress', 'completed', 'cancelled')),
    public_token                uuid NOT NULL DEFAULT uuid_generate_v4() UNIQUE,
    public_token_expires_at     timestamptz,
    created_at                  timestamptz NOT NULL DEFAULT now(),
    updated_at                  timestamptz NOT NULL DEFAULT now(),
    completed_at                timestamptz
);

CREATE INDEX IF NOT EXISTS idx_cm_jobs_client ON cm_jobs(client_id);
CREATE INDEX IF NOT EXISTS idx_cm_jobs_customer ON cm_jobs(customer_id);
CREATE INDEX IF NOT EXISTS idx_cm_jobs_token ON cm_jobs(public_token);
CREATE INDEX IF NOT EXISTS idx_cm_jobs_status ON cm_jobs(client_id, status);

-- ---------------------------------------------------------------------
-- 7) cm_visits — the actual scheduled calendar events
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS cm_visits (
    id                  uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id           uuid NOT NULL REFERENCES cm_clients(id) ON DELETE CASCADE,
    job_id              uuid NOT NULL REFERENCES cm_jobs(id) ON DELETE CASCADE,
    crew_id             uuid REFERENCES cm_crews(id) ON DELETE SET NULL,
    title               text NOT NULL,
    start_at            timestamptz NOT NULL,
    end_at              timestamptz NOT NULL,
    status              text NOT NULL DEFAULT 'scheduled'
                        CHECK (status IN ('scheduled', 'on_site', 'completed', 'cancelled')),
    notes_internal      text,
    notes_customer      text,
    created_at          timestamptz NOT NULL DEFAULT now(),
    updated_at          timestamptz NOT NULL DEFAULT now(),
    CHECK (end_at > start_at)
);

CREATE INDEX IF NOT EXISTS idx_cm_visits_client_start ON cm_visits(client_id, start_at);
CREATE INDEX IF NOT EXISTS idx_cm_visits_crew_start ON cm_visits(crew_id, start_at);
CREATE INDEX IF NOT EXISTS idx_cm_visits_job ON cm_visits(job_id);

-- ---------------------------------------------------------------------
-- updated_at trigger function (reusable)
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION cm_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_cm_clients_updated   ON cm_clients;
DROP TRIGGER IF EXISTS trg_cm_users_updated     ON cm_users;
DROP TRIGGER IF EXISTS trg_cm_crews_updated     ON cm_crews;
DROP TRIGGER IF EXISTS trg_cm_customers_updated ON cm_customers;
DROP TRIGGER IF EXISTS trg_cm_jobs_updated      ON cm_jobs;
DROP TRIGGER IF EXISTS trg_cm_visits_updated    ON cm_visits;

CREATE TRIGGER trg_cm_clients_updated   BEFORE UPDATE ON cm_clients   FOR EACH ROW EXECUTE FUNCTION cm_set_updated_at();
CREATE TRIGGER trg_cm_users_updated     BEFORE UPDATE ON cm_users     FOR EACH ROW EXECUTE FUNCTION cm_set_updated_at();
CREATE TRIGGER trg_cm_crews_updated     BEFORE UPDATE ON cm_crews     FOR EACH ROW EXECUTE FUNCTION cm_set_updated_at();
CREATE TRIGGER trg_cm_customers_updated BEFORE UPDATE ON cm_customers FOR EACH ROW EXECUTE FUNCTION cm_set_updated_at();
CREATE TRIGGER trg_cm_jobs_updated      BEFORE UPDATE ON cm_jobs      FOR EACH ROW EXECUTE FUNCTION cm_set_updated_at();
CREATE TRIGGER trg_cm_visits_updated    BEFORE UPDATE ON cm_visits    FOR EACH ROW EXECUTE FUNCTION cm_set_updated_at();
