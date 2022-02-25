-- DropForeignKey
ALTER TABLE `user_roles` DROP FOREIGN KEY `user_roles_role_name_fkey`;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_role_name_fkey` FOREIGN KEY (`role_name`) REFERENCES `role`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;
