
-- 1. Insert a new record into the account table 
INSERT INTO account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');


-- 2. Modify the Tony Stark record to change account_type to "Admin"
UPDATE account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';


-- 3. Delete the Tony Stark record from the database
DELETE FROM account
WHERE account_email = 'tony@starkent.com';


-- 4. Modify the "GM Hummer" description to "a huge interior"
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';


-- 5. Inner join to select make, model, and classification name
SELECT 
    inv.inv_make, 
    inv.inv_model, 
    cls.classification_name
FROM inventory inv
INNER JOIN classification cls 
    ON inv.classification_id = cls.classification_id
WHERE cls.classification_name = 'Sport';

-- 6. Update all inventory records to add "/vehicles" to the middle of the file path in inv_image and inv_thumbnail
UPDATE inventory
SET 
    inv_image     = REPLACE(inv_image,     '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');