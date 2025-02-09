/*
  # Seed Data for Lost Pets Platform

  1. Sample Data
    - Creates 100 sample posts across different US cities
    - Adds realistic pet details and locations
*/

DO $$
DECLARE
  cities text[] := ARRAY[
    'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX',
    'Phoenix, AZ', 'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA',
    'Dallas, TX', 'San Jose, CA'
  ];
  breeds text[] := ARRAY[
    'Labrador Retriever', 'German Shepherd', 'Golden Retriever', 'French Bulldog',
    'Bulldog', 'Poodle', 'Beagle', 'Rottweiler', 'Dachshund', 'Yorkshire Terrier'
  ];
  sample_images text[] := ARRAY[
    'https://images.unsplash.com/photo-1544568100-847a948585b9',
    'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8',
    'https://images.unsplash.com/photo-1510771463146-e89e6e86560e',
    'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48',
    'https://images.unsplash.com/photo-1534361960057-19889db9621e'
  ];
  i integer;
  random_city text;
  random_breed text;
  random_image text;
BEGIN
  -- Create a demo user
  INSERT INTO auth.users (id, email)
  VALUES ('00000000-0000-0000-0000-000000000000', 'demo@example.com')
  ON CONFLICT DO NOTHING;

  -- Create demo user profile
  INSERT INTO profiles (id, username, full_name, points)
  VALUES ('00000000-0000-0000-0000-000000000000', 'demo_user', 'Demo User', 0)
  ON CONFLICT DO NOTHING;

  -- Create 100 sample posts
  FOR i IN 1..100 LOOP
    random_city := cities[1 + floor(random() * array_length(cities, 1))];
    random_breed := breeds[1 + floor(random() * array_length(breeds, 1))];
    random_image := sample_images[1 + floor(random() * array_length(sample_images, 1))];
    
    INSERT INTO posts (
      user_id,
      pet_name,
      breed,
      location,
      description,
      image_url,
      created_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      'Pet ' || i,
      random_breed,
      random_city,
      'Lost ' || random_breed || ' in ' || random_city || '. Please help us find our beloved pet.',
      random_image,
      now() - (random() * interval '30 days')
    );
  END LOOP;
END $$;