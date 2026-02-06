import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://zmxrwdurffcqdmqbzhbb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpteHJ3ZHVyZmZjcWRtcWJ6aGJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNzc0OTAsImV4cCI6MjA4NTk1MzQ5MH0.WwmfIWLOMw5aoW3Borv5VwZjlRZFUWNpUVcMo3RthrI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
