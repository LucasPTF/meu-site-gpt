CREATE TABLE `product_media` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`src` text NOT NULL,
	`alt` text NOT NULL,
	`source_url` text NOT NULL,
	`source_label` text NOT NULL,
	`position` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_product_media_product_position` ON `product_media` (`product_id`,`position`);--> statement-breakpoint
CREATE TABLE `product_tags` (
	`product_id` text NOT NULL,
	`tag_id` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_product_tags_unique` ON `product_tags` (`product_id`,`tag_id`);--> statement-breakpoint
CREATE INDEX `idx_product_tags_tag` ON `product_tags` (`tag_id`);--> statement-breakpoint
CREATE TABLE `tags` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`label` text NOT NULL,
	`group_name` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_tags_slug` ON `tags` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_tags_group` ON `tags` (`group_name`);--> statement-breakpoint
ALTER TABLE `products` ADD `model` text NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `product_type` text NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `description` text;--> statement-breakpoint
ALTER TABLE `products` ADD `benefit` text;--> statement-breakpoint
ALTER TABLE `products` ADD `price` real NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `pix_price` real NOT NULL;