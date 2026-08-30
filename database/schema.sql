-- ============================================================
-- TopMetin2Pvp — MariaDB şeması (phpMyAdmin'den import edin)
-- Hedef: MariaDB 10.11 (canlı) / 10.4 (local XAMPP)
-- MySQL DEĞİL. JSON fonksiyonlarından kaçınıldı; booleanlar TINYINT(1).
-- Bağlantı: PDO pdo_mysql, ATTR_EMULATE_PREPARES=false, prepared statements.
-- ============================================================

SET NAMES utf8mb4;
SET foreign_key_checks = 0;

-- ---------- users ----------
CREATE TABLE IF NOT EXISTS `users` (
  `id`            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username`      VARCHAR(32)  NOT NULL,
  `email`         VARCHAR(190) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `rank`          VARCHAR(32)  NOT NULL DEFAULT 'Üye',
  `is_admin`      TINYINT(1)   NOT NULL DEFAULT 0,
  `created_at`    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_users_username` (`username`),
  UNIQUE KEY `uq_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------- categories ----------
CREATE TABLE IF NOT EXISTS `categories` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug`       VARCHAR(40)  NOT NULL,
  `label`      VARCHAR(40)  NOT NULL,
  `image`      VARCHAR(255) NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_categories_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------- servers ----------
CREATE TABLE IF NOT EXISTS `servers` (
  `id`             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`           VARCHAR(60)  NOT NULL,
  `title`          VARCHAR(255) NOT NULL,
  `category_slug`  VARCHAR(40)  NOT NULL,
  `start_level`    SMALLINT UNSIGNED NOT NULL DEFAULT 1,
  `end_level`      SMALLINT UNSIGNED NOT NULL DEFAULT 105,
  `banner`         VARCHAR(255) NULL,
  `web_url`        VARCHAR(255) NULL,
  `discord_url`    VARCHAR(255) NULL,
  `description`    TEXT NULL,
  `owner_id`       INT UNSIGNED NULL,
  `is_vip`         TINYINT(1)   NOT NULL DEFAULT 0,
  `vip_until`      DATE NULL,
  `likes`          INT UNSIGNED NOT NULL DEFAULT 0,
  `web_clicks`     INT UNSIGNED NOT NULL DEFAULT 0,
  `discord_clicks` INT UNSIGNED NOT NULL DEFAULT 0,
  `status`         ENUM('active','pending','banned') NOT NULL DEFAULT 'active',
  `created_at`     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_servers_category` (`category_slug`),
  KEY `idx_servers_vip` (`is_vip`),
  KEY `idx_servers_owner` (`owner_id`),
  CONSTRAINT `fk_servers_category` FOREIGN KEY (`category_slug`) REFERENCES `categories`(`slug`) ON UPDATE CASCADE,
  CONSTRAINT `fk_servers_owner` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------- server_features (Genel Özellikler) ----------
CREATE TABLE IF NOT EXISTS `server_features` (
  `server_id`   INT UNSIGNED NOT NULL,
  `lycan`       TINYINT(1) NOT NULL DEFAULT 0,
  `simya`       TINYINT(1) NOT NULL DEFAULT 1,
  `kusak`       TINYINT(1) NOT NULL DEFAULT 1,
  `kemer`       TINYINT(1) NOT NULL DEFAULT 1,
  `tilsim`      TINYINT(1) NOT NULL DEFAULT 1,
  `pet`         TINYINT(1) NOT NULL DEFAULT 1,
  `binek`       TINYINT(1) NOT NULL DEFAULT 1,
  `kostum`      TINYINT(1) NOT NULL DEFAULT 1,
  `beceri`      TINYINT(1) NOT NULL DEFAULT 1,
  `efsun_sabit` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`server_id`),
  CONSTRAINT `fk_features_server` FOREIGN KEY (`server_id`) REFERENCES `servers`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------- server_system (Sistem Özellikleri) ----------
CREATE TABLE IF NOT EXISTS `server_system` (
  `server_id`        INT UNSIGNED NOT NULL,
  `k_envanter`       TINYINT(1) NOT NULL DEFAULT 1,
  `boss_takip`       TINYINT(1) NOT NULL DEFAULT 1,
  `guvenli_pc`       TINYINT(1) NOT NULL DEFAULT 1,
  `lonca_ajan`       TINYINT(1) NOT NULL DEFAULT 1,
  `ticaret_cami`     TINYINT(1) NOT NULL DEFAULT 1,
  `yardimci_saman`   TINYINT(1) NOT NULL DEFAULT 1,
  `cevrimdisi_pazar` TINYINT(1) NOT NULL DEFAULT 1,
  `item_kilitleme`   TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`server_id`),
  CONSTRAINT `fk_system_server` FOREIGN KEY (`server_id`) REFERENCES `servers`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------- comments (üyelik ister) ----------
CREATE TABLE IF NOT EXISTS `comments` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `server_id`  INT UNSIGNED NOT NULL,
  `user_id`    INT UNSIGNED NOT NULL,
  `rating`     TINYINT UNSIGNED NOT NULL,   -- 1..5
  `body`       TEXT NOT NULL,
  `status`     ENUM('visible','hidden') NOT NULL DEFAULT 'visible',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_comments_server` (`server_id`),
  CONSTRAINT `fk_comments_server` FOREIGN KEY (`server_id`) REFERENCES `servers`(`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_comments_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------- votes (üyeliksiz oy; IP ile tekilleştirme) ----------
CREATE TABLE IF NOT EXISTS `votes` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `server_id`  INT UNSIGNED NOT NULL,
  `ip_hash`    CHAR(64) NOT NULL,   -- SHA-256(ip + salt)
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_vote_once` (`server_id`, `ip_hash`),
  CONSTRAINT `fk_votes_server` FOREIGN KEY (`server_id`) REFERENCES `servers`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------- clicks (web/discord tıklama logu) ----------
CREATE TABLE IF NOT EXISTS `clicks` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `server_id`  INT UNSIGNED NOT NULL,
  `type`       ENUM('web','discord') NOT NULL,
  `ip_hash`    CHAR(64) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_clicks_server` (`server_id`),
  CONSTRAINT `fk_clicks_server` FOREIGN KEY (`server_id`) REFERENCES `servers`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------- ad_prices (Reklam Fiyatları) ----------
CREATE TABLE IF NOT EXISTS `ad_prices` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(80)  NOT NULL,
  `size`       VARCHAR(40)  NULL,
  `duration`   VARCHAR(20)  NOT NULL,
  `price`      VARCHAR(20)  NOT NULL,
  `highlight`  TINYINT(1)   NOT NULL DEFAULT 0,
  `accent`     TINYINT(1)   NOT NULL DEFAULT 0,
  `sort_order` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET foreign_key_checks = 1;

-- ============================================================
-- SEED (başlangıç verisi)
-- ============================================================
INSERT INTO `categories` (`slug`,`label`,`sort_order`) VALUES
 ('vip-server','VIP',1),('farm-server','Farm',2),('emek-server','Emek',3),
 ('oldschool-server','Oldschool',4),('newschool-server','Newschool',5),('ws-server','Ws''lik',6);

-- Admin kullanıcı (şifre: 123456 — canlıda mutlaka değiştir / yeni hash üret)
INSERT INTO `users` (`username`,`email`,`password_hash`,`rank`,`is_admin`) VALUES
 ('mert','mert@topmetin2pvp.com', '$2y$10$replace_with_real_bcrypt_hash', 'Yönetici', 1);

INSERT INTO `ad_prices` (`name`,`size`,`duration`,`price`,`highlight`,`accent`,`sort_order`) VALUES
 ('VIP Server Bölümü','Liste en üstünde','1 Ay','500 TL',1,0,1),
 ('Pop-UP Reklam Alanı','800x450','1 Hafta','2500 TL',0,0,2),
 ('Sidebar Kare Reklam Alanı','203x250','1 Hafta','1000 TL',0,0,3),
 ('Sağ Kayan Sabit Dikey Reklam','220x911','1 Hafta','2500 TL',0,0,4),
 ('Sol Kayan Sabit Dikey Reklam','220x911','1 Hafta','2500 TL',0,0,5),
 ('Site Üst Yatay Reklam Alanı','1444x206','1 Hafta','2500 TL',0,0,6),
 ('Orta Reklam Kare - 1','329x274','1 Hafta','1000 TL',0,0,7),
 ('Orta Reklam Kare - 2','329x274','1 Hafta','1000 TL',0,0,8),
 ('Orta Reklam Kare - 3','329x274','1 Hafta','1000 TL',0,0,9),
 ('Konu İçi Alt Geniş Reklam','750x245','1 Hafta','750 TL',0,1,10),
 ('Konu İçi Kare - 1','329x274','1 Hafta','750 TL',0,1,11),
 ('Konu İçi Kare - 2','329x274','1 Hafta','750 TL',0,1,12);
