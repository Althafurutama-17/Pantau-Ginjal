/**
 * =========================================
 *  SUPABASE CLIENT — Inisialisasi Koneksi
 *  File: js/supabase.js
 *  Deskripsi: Konfigurasi & inisialisasi
 *  Supabase client untuk aplikasi skrining
 * =========================================
 */

const SUPABASE_URL = 'https://flevocawmftrmxquklrv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsZXZvY2F3bWZ0cm14cXVrbHJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0ODQyNzgsImV4cCI6MjA5OTA2MDI3OH0.10PyYh36am-TBIorbtWD3ZRghcpwKlTEAESlgZ6ghwo';

// Inisialisasi Supabase client (menggunakan supabase-js v2 CDN)
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Helper: generate email dari username untuk Supabase Auth.
 * Supabase Auth membutuhkan email, jadi kita buat email dummy
 * menggunakan domain supabase.co yang dijamin valid.
 * @param {string} username
 * @returns {string} email dummy
 */
function usernameToEmail(username) {
    return username.toLowerCase().trim() + '@app-skrginjal.supabase.co';
}
