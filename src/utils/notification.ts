
import { Op } from "sequelize";
import admin from "../config/firebase-config"
import Exception from "../exceptions/exception";
import PushNotification from "../modules/users/model/push_notification_model";



/**
 * This service add notificatioin token in to database
 * @body {string} userId of user.
 * Returns {string} Promise resolved
 */
export const addPushNotification = async (userId: string,notificationToken: string
) => {
  try {
    let getPushNotification = await PushNotification.findOne({where:{ userId:userId,notificationToken:notificationToken}});

    if (getPushNotification && getPushNotification != null){
        return Promise.resolve();
    }
      
    let notificationTokenObject: any = {
      userId: userId,
      notificationToken: notificationToken,
    };

    const pushNotification = await PushNotification.create(notificationTokenObject)
    return Promise.resolve();
  } catch (error: any) {
    return Promise.reject(error)
  }
};


/**
 * This service send notificaton to particular device
 * @body {array} userId of user.
 * @body {string} notificationTitle.
 * @body {string} messageBody.
 * Returns {string} Promise resolved
 */
export const sendPushNotification = async (userIds: any,notificationTitle = "Real-Estate-Notifications",messageBody = "Hello From Real-Estate-Notifications"
) => {
  try {
    if (!userIds.length) {
      return Promise.resolve();
    }
    const registrationToken = await getNotificationToken(userIds);

    if (!registrationToken.length) {
      return Promise.resolve();
    }

    const message_notification = {
      notification: {
        title: notificationTitle,
        body: messageBody,
      },
    };
    const options = {
      priority: "high",
      timeToLive: 60 * 60 * 24,
    };
    let notificationTokenArray = registrationToken.map(
      (token:any) => token.notificationToken
    );
    let response = await admin.messaging().sendToDevice(notificationTokenArray, message_notification, options);
    return Promise.resolve(response);
  } catch (err: any) {
    return Promise.reject(err)
  }
};

/**
 * This service fetch the notification token from data base
 * @body {array} userId of user.
 * Returns {string} Promise resolved
 */
export const getNotificationToken = async (userIds: []) => {
  try {
    const getPushNotification = await PushNotification.findAll({
      where: {
        userId: {
          [Op.in]: userIds,
        },
      },
      attributes: ["notificationToken"],
    });
    return Promise.resolve(getPushNotification);
  } catch (err: any) {
    return Promise.reject(err)
  }
};
