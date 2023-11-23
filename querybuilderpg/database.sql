-- This script only contains the table creation statements and does not fully represent the table in the database.
-- It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."tbl_product" (
    "id" text NOT NULL,                 -- Unique identifier for the product (Primary Key)
    "name" text,                        -- Product name
    "price" int4,                       -- Product price (integer)
    "description" text,                 -- Product description
    "search" text,                      -- Search-friendly version of the product name
    "ispublished" bool NOT NULL DEFAULT true,  -- Flag indicating if the product is published (true/false)
    "isremoved" bool NOT NULL DEFAULT false, -- Flag indicating if the product is removed (true/false)
    "dtcreated" timestamp NOT NULL DEFAULT now(),  -- Timestamp indicating when the product was created
    "dtupdated" timestamp               -- Timestamp indicating when the product was last updated
);

-- Initial Data Insertion
INSERT INTO "public"."tbl_product" ("id", "name", "price", "description", "search", "ispublished", "isremoved", "dtcreated", "dtupdated")
VALUES ('1624r001sc51d', 'Macbook M2', 10000, 'Very nice and powerful laptop', 'macbook m2', 'f', 'f', '2023-10-25 16:14:49.413', NULL);
