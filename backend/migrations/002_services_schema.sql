-- =====================================================================
-- Crew Management — Service Catalog (v2)
-- Adds a tenant-scoped list of "services" each contractor offers.
-- Jobs and Visits can optionally reference a service.
-- =====================================================================

-- 1) cm_services — the contractor's menu of services
CREATE TABLE IF NOT EXISTS cm_services (
    id                      uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id               uuid NOT NULL REFERENCES cm_clients(id) ON DELETE CASCADE,
    name                    text NOT NULL,
    description             text,
    default_duration_hours  numeric(5, 2),
    default_price_cents     integer,
    color                   text NOT NULL DEFAULT '#0d9488',
    icon                    text,
    is_active               boolean NOT NULL DEFAULT true,
    sort_order              integer NOT NULL DEFAULT 0,
    created_at              timestamptz NOT NULL DEFAULT now(),
    updated_at              timestamptz NOT NULL DEFAULT now(),
    UNIQUE (client_id, name)
);

CREATE INDEX IF NOT EXISTS idx_cm_services_client
    ON cm_services(client_id, is_active, sort_order);

DROP TRIGGER IF EXISTS trg_cm_services_updated ON cm_services;
CREATE TRIGGER trg_cm_services_updated
    BEFORE UPDATE ON cm_services
    FOR EACH ROW EXECUTE FUNCTION cm_set_updated_at();

-- 2) cm_clients — remember which industry they picked at signup so new
--    tenants can be auto-seeded with the appropriate preset.
ALTER TABLE cm_clients ADD COLUMN IF NOT EXISTS industry text;

-- 3) cm_jobs.service_id — primary service for the whole job (optional)
ALTER TABLE cm_jobs ADD COLUMN IF NOT EXISTS service_id uuid
    REFERENCES cm_services(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_cm_jobs_service ON cm_jobs(service_id);

-- 4) cm_visits.service_id — per-visit override (e.g. multi-day jobs with
--    different services each day: Drill → Case → Install Pump)
ALTER TABLE cm_visits ADD COLUMN IF NOT EXISTS service_id uuid
    REFERENCES cm_services(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_cm_visits_service ON cm_visits(service_id);
