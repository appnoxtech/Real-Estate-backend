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
                queryInterface.createTable('messages', {
                    id: {
                        type: Sequelize.UUID,
                        defaultValue: Sequelize.UUIDV4,
                        primaryKey: true,
                        allowNull: false,
                    },
                    chatRoomId: {
                        type: Sequelize.STRING,
                        allowNull: true,
                    },
                    userId: {
                        type: Sequelize.STRING,
                        allowNull: true,
                    },
                    message: {
                        type: Sequelize.STRING
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
                console.log("error at 20230607093648-messages.js", error);
            }
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable('messages');
        });
    }
};
