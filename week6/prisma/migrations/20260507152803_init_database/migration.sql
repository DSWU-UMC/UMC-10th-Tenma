-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `gender` VARCHAR(15) NOT NULL,
    `birth` DATE NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(15) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `foods` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_foods` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `food_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_foods` ADD CONSTRAINT `user_foods_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_foods` ADD CONSTRAINT `user_foods_food_id_fkey` FOREIGN KEY (`food_id`) REFERENCES `foods`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
