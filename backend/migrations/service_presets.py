"""
Preset service catalogs keyed by industry.
Used by the seed script AND by the "Seed Defaults" button in the
Services settings page when a new tenant signs up.

Each preset is a list of dicts matching cm_services columns (minus
client_id). Contractors can freely edit/delete any of these after seeding.
"""

PRESETS = {
    # ---------------------------------------------------------------------
    "well_drilling": [
        {"name": "Residential Well Drilling", "description": "Standard residential water well drilling.",
         "default_duration_hours": 16, "color": "#0d9488", "sort_order": 10},
        {"name": "Irrigation Well Drilling", "description": "High-capacity well for irrigation or agriculture.",
         "default_duration_hours": 20, "color": "#059669", "sort_order": 20},
        {"name": "Pump & Pressure Tank Install", "description": "Submersible pump + pressure tank + controls.",
         "default_duration_hours": 6, "color": "#2563eb", "sort_order": 30},
        {"name": "Pump Replacement", "description": "Pull and replace failed submersible or jet pump.",
         "default_duration_hours": 5, "color": "#3b82f6", "sort_order": 40},
        {"name": "Well Casing / Grouting", "description": "Casing installation, grouting, or repair.",
         "default_duration_hours": 8, "color": "#7c3aed", "sort_order": 50},
        {"name": "Water Quality Testing", "description": "On-site sampling and lab submission.",
         "default_duration_hours": 1, "color": "#f59e0b", "sort_order": 60},
        {"name": "Service Call / Diagnostic", "description": "Troubleshooting, no-water call-outs.",
         "default_duration_hours": 2, "color": "#dc2626", "sort_order": 70},
    ],
    # ---------------------------------------------------------------------
    "septic": [
        {"name": "Septic Pump-Out", "description": "Routine tank pump-out & disposal.",
         "default_duration_hours": 2, "color": "#0d9488", "sort_order": 10},
        {"name": "Septic Inspection", "description": "Real-estate or annual inspection with report.",
         "default_duration_hours": 1.5, "color": "#2563eb", "sort_order": 20},
        {"name": "New System Install", "description": "Full septic system installation.",
         "default_duration_hours": 24, "color": "#059669", "sort_order": 30},
        {"name": "Drain Field Repair", "description": "Drain field diagnosis & rehabilitation.",
         "default_duration_hours": 8, "color": "#7c3aed", "sort_order": 40},
        {"name": "Riser / Lid Install", "description": "Install access risers & secure lids.",
         "default_duration_hours": 3, "color": "#f59e0b", "sort_order": 50},
        {"name": "Emergency Service", "description": "Backups, overflows, urgent calls.",
         "default_duration_hours": 3, "color": "#dc2626", "sort_order": 60},
    ],
    # ---------------------------------------------------------------------
    "plumbing": [
        {"name": "Leak Repair", "default_duration_hours": 2, "color": "#0d9488", "sort_order": 10},
        {"name": "Water Heater Install", "default_duration_hours": 4, "color": "#2563eb", "sort_order": 20},
        {"name": "Drain Cleaning", "default_duration_hours": 1.5, "color": "#f59e0b", "sort_order": 30},
        {"name": "Fixture Install", "default_duration_hours": 2, "color": "#7c3aed", "sort_order": 40},
        {"name": "Re-pipe / New Construction", "default_duration_hours": 16, "color": "#059669", "sort_order": 50},
        {"name": "Emergency Call", "default_duration_hours": 2, "color": "#dc2626", "sort_order": 60},
    ],
    # ---------------------------------------------------------------------
    "hvac": [
        {"name": "AC Install", "default_duration_hours": 8, "color": "#0d9488", "sort_order": 10},
        {"name": "Furnace Install", "default_duration_hours": 8, "color": "#2563eb", "sort_order": 20},
        {"name": "Maintenance / Tune-up", "default_duration_hours": 1.5, "color": "#059669", "sort_order": 30},
        {"name": "Duct Work", "default_duration_hours": 6, "color": "#7c3aed", "sort_order": 40},
        {"name": "Service Call", "default_duration_hours": 2, "color": "#f59e0b", "sort_order": 50},
        {"name": "Emergency Repair", "default_duration_hours": 3, "color": "#dc2626", "sort_order": 60},
    ],
    # ---------------------------------------------------------------------
    # Fallback — used if industry is unknown/blank. Generic categories.
    "generic": [
        {"name": "Service Call", "default_duration_hours": 2, "color": "#0d9488", "sort_order": 10},
        {"name": "Installation", "default_duration_hours": 4, "color": "#2563eb", "sort_order": 20},
        {"name": "Maintenance", "default_duration_hours": 2, "color": "#059669", "sort_order": 30},
        {"name": "Repair", "default_duration_hours": 3, "color": "#f59e0b", "sort_order": 40},
        {"name": "Emergency", "default_duration_hours": 2, "color": "#dc2626", "sort_order": 50},
    ],
}


def get_preset(industry: str | None) -> list[dict]:
    """Return the preset list for an industry, falling back to 'generic'."""
    if not industry:
        return PRESETS["generic"]
    return PRESETS.get(industry.lower().replace(" ", "_"), PRESETS["generic"])


INDUSTRY_CHOICES = [
    {"value": "well_drilling", "label": "Well Drilling"},
    {"value": "septic", "label": "Septic"},
    {"value": "plumbing", "label": "Plumbing"},
    {"value": "hvac", "label": "HVAC"},
    {"value": "generic", "label": "Other / Custom"},
]
