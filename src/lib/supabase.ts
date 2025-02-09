import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = 'https://ihrtcxdkautkcjdmcppc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlocnRjeGRrYXV0a2NqZG1jcHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwNzcyNzgsImV4cCI6MjA1NDY1MzI3OH0.J5fnmkr7NLlGn-gsI4XKJUJpMmUdi07L5vRq022OmPE';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);