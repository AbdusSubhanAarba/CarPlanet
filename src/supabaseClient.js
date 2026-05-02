import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jxxgezmwmjnddlzqavje.supabase.co'
const supabaseAnonKey = 'sb_publishable_DJHp81c9-HaMDcuyHNgMfQ_nIypB4eM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)