ALTER TABLE `product_media` ADD `type` text DEFAULT 'PRODUCT' NOT NULL;--> statement-breakpoint
ALTER TABLE `product_media` ADD `local_path` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `product_media` ADD `source_type` text DEFAULT 'MANUFACTURER' NOT NULL;--> statement-breakpoint
ALTER TABLE `product_media` ADD `is_primary` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `product_media` ADD `verified_at` text DEFAULT '1970-01-01' NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `compare_at_price` real;--> statement-breakpoint
ALTER TABLE `products` ADD `shipping_type` text DEFAULT 'confirmacao-manual' NOT NULL;
