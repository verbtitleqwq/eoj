import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ruzfvbwibpbekxpkduqr.supabase.co';
const supabaseKey = 'sb_publishable_Oo0souDmkf4KOCxdJBuHCw_pdmIXk4q';

export const supabase = createClient(supabaseUrl, supabaseKey);