'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                queryInterface.createTable('otps', {
                    id: {
                        type: Sequelize.UUID,
                        primaryKey: true,
                        defaultValue: Sequelize.UUIDV4,
                        allowNull: false,
                    },
                    userId: {
                        type: Sequelize.STRING,
                        allowNull: false
                    },
                    otp: {
                        type: Sequelize.INTEGER,
                        allowNull: true,
                    },
                    // createdAt, lastUpdatedAt and deletedAt managed by Sequelize
                    createdAt: {
                        allowNull: false,
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.NOW,
                    },
                    updatedAt: {
                        allowNull: false,
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.NOW,
                    },
                    deletedAt: {
                        type: Sequelize.DATE,
                        allowNull: true,
                        defaultValue: Sequelize.NOW,
                    },
                });
            }
            catch (error) {
                console.log("error at 20230605112122-otp.js", error);
            }
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable('otps');
        });
    }
};
