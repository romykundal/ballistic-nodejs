/*
 * File Name: utilities/scheduler.js
 * Created By: Prabhjot Kaur
 * Description: cron job to transfer/payout amount to vendor after 5 hours of order completion.
 */
import mongoose from "mongoose";
import USERMODEL from "../collections/user";
// import BOOKINGMODEL from "../collections/booking";
//import SUBSCRIBENEWSMODEL from "../collections/subscribeNew"
//import SUBSCRIBEMODEL from "../collections/subscribe"
import moment from "moment";
import * as Mail from "../utilities/mail";
import config from "config";
const { frontendUrl } = config.get("app");

/*************************************
    *    *    *    *    *    *
    ┬    ┬    ┬    ┬    ┬    ┬
    │    │    │    │    │    |
    │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
    │    │    │    │    └───── month (1 - 12)
    │    │    │    └────────── day of month (1 - 31)
    │    │    └─────────────── hour (0 - 23)               9 
    │    └──────────────────── minute (0 - 59)             0
    └───────────────────────── second (0 - 59, OPTIONAL)   0

********************************************************/
// '0 0 * * *' (*/1 * * * * (per minute))run command at 12 o'clock midnight everyday----//
// 'this will run everyday at 9 Am');
let schedule = require("node-schedule");


/*
* cron job after 48 hours
*/
schedule.scheduleJob("1 * * *", async () => {
  try {
    let currentDateTime = new Date();
    let prevDateTime = new Date();
    let currentTime = currentDateTime.setHours(currentDateTime.getHours() - 48);
    let prevTime = prevDateTime.setHours(prevDateTime.getHours() - 49);

    // let condition = {
    //   status: 1,
    //   bookingDateTime: { $gte: new Date(prevTime), $lte: new Date(currentTime) }
    // }
    // let data = await BOOKINGMODEL.aggregate([{
    //   $match: condition
    // }, {
    //   $lookup: {
    //     from: "users",
    //     let: { 'id': '$userId' },
    //     pipeline: [{
    //       '$match': {
    //         '$expr': {
    //           $and: [
    //             { '$eq': ['$_id', '$$id'] },
    //             { '$eq': ['$status', true] },
    //             { '$eq': ['$is_deleted', false] }
    //           ]
    //         }
    //       }
    //     },
    //     {
    //       $project: {
    //         _id: 1,
    //         image: 1,
    //         fname_en: 1,
    //         lname_en: 1,
    //         slug: 1,
    //         short_description_en: 1,
    //         short_description_ar: 1,
    //         email: 1,
    //         intro_video: 1,
    //         dedicated_price: 1,
    //         i_got_talent_price: 1,
    //         webinar_price: 1,
    //         connect_on_zoom_price: 1,
    //         dm_text_price: 1,
    //         dm_video_price: 1
    //       }
    //     }],
    //     as: "senderData"
    //   }
    // }, {
    //   $unwind: { path: "$senderData", preserveNullAndEmptyArrays: true }
    // }, {
    //   $lookup: {
    //     from: "users",
    //     let: { 'id': '$celebrityId' },
    //     pipeline: [{
    //       '$match': {
    //         '$expr': {
    //           $and: [
    //             { '$eq': ['$_id', '$$id'] },
    //             { '$eq': ['$status', true] },
    //             { '$eq': ['$is_deleted', false] }
    //           ]
    //         }
    //       }
    //     },
    //     {
    //       $project: {
    //         _id: 1,
    //         image: 1,
    //         fname_en: 1,
    //         lname_en: 1,
    //         slug: 1,
    //         short_description_en: 1,
    //         short_description_ar: 1,
    //         email: 1,
    //         intro_video: 1,
    //         dedicated_price: 1,
    //         i_got_talent_price: 1,
    //         webinar_price: 1,
    //         connect_on_zoom_price: 1,
    //         dm_text_price: 1,
    //         dm_video_price: 1
    //       }
    //     }],
    //     as: "receiverData"
    //   }
    // },
    // {
    //   $unwind: { path: "$receiverData", preserveNullAndEmptyArrays: true }
    // }]);

    // for (let i = 0; i < data.length; i++) {
    //   const result = await Mail.htmlFromatWithObject({
    //     emailTemplate: "booking-reminder",
    //     data: data[i]
    //   });

    //   const emailData = {
    //     to: data[i].receiverData.email,
    //     subject: Mail.subjects.bookingReminder,
    //     html: result.html,
    //     templateId: "booking-reminder",
    //   };

    //   Mail.SENDEMAIL(emailData, function (err, res) {
    //     if (err)
    //       console.log(
    //         "-----@@----- Error at sending verify mail to user -----@@-----",
    //         err
    //       );
    //     else
    //       console.log(
    //         "-----@@----- Response at sending verify mail to user -----@@-----",
    //         res
    //       );
    //   });
    // }

  } catch (err) {
  }
});
