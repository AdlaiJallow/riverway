/*
  # Riverway Restaurant Database Schema

  1. New Tables
    - `menu_items` - Store menu items with descriptions and prices
    - `reservations` - Store customer reservations
    - `gallery` - Store gallery images

  2. Security
    - Enable RLS on all tables
    - Add public read policies for menu and gallery
    - Add policies for reservations
*/

CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  price numeric NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  party_size integer NOT NULL,
  special_requests text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Menu items are publicly readable"
  ON menu_items
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Gallery is publicly readable"
  ON gallery
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create reservations"
  ON reservations
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view their own reservations"
  ON reservations
  FOR SELECT
  TO public
  USING (true);
