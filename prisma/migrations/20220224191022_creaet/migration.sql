-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `create` BOOLEAN NOT NULL,
    `read` BOOLEAN NOT NULL,
    `delete` BOOLEAN NOT NULL,
    `update` BOOLEAN NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_roles` (
    `user_name` VARCHAR(191) NOT NULL,
    `role_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`user_name`, `role_name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_user_name_fkey` FOREIGN KEY (`user_name`) REFERENCES `user`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_role_name_fkey` FOREIGN KEY (`role_name`) REFERENCES `role`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
