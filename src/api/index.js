/*
 * @file: index.js
 * @description: It's combine all routers.
 * @author: romykundal
 */

import user from "./v1/user";
import common from "./v1/common";

/*********** Combine all Routes ********************/
export default [
    ...user,
    ...common
];
