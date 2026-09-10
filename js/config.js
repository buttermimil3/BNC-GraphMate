// BNC GraphMate - Supabase Configuration
// Replace these values with your actual Supabase project credentials
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Initialize Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// App config
const APP_CONFIG = {
  shopName: 'BNC GraphMate',
  version: '1.0.0',
  lineOAUrl: 'https://line.me/R/ti/p/@YOUR_LINE_OA',
  storageUrl: SUPABASE_URL + '/storage/v1/object/public/'
};
