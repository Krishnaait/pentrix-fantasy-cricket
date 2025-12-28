-- Drop old Manus OAuth columns
ALTER TABLE users DROP COLUMN IF EXISTS openId;
ALTER TABLE users DROP COLUMN IF EXISTS loginMethod;

-- The new columns will be added by drizzle-kit
