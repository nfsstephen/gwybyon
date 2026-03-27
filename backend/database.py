from supabase import create_client
import os
import sys

supabase_url = os.environ.get('SUPABASE_URL')
supabase_key = os.environ.get('SUPABASE_SERVICE_KEY')

if not supabase_url or not supabase_key:
    print("ERROR: SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in environment variables", file=sys.stderr)
    sys.exit(1)

supabase = create_client(supabase_url, supabase_key)
