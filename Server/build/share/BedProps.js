"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TaskState;
(function (TaskState) {
    TaskState[TaskState["SENT"] = 0] = "SENT";
    TaskState[TaskState["RETURNED"] = 1] = "RETURNED";
    TaskState[TaskState["NONE"] = 2] = "NONE";
})(TaskState = exports.TaskState || (exports.TaskState = {}));
var OccupationState;
(function (OccupationState) {
    OccupationState[OccupationState["UNOCCUPIED"] = 0] = "UNOCCUPIED";
    OccupationState[OccupationState["OCCUPIED"] = 1] = "OCCUPIED";
    OccupationState[OccupationState["PENDING_DISCHARGE"] = 2] = "PENDING_DISCHARGE";
})(OccupationState = exports.OccupationState || (exports.OccupationState = {}));
//# sourceMappingURL=BedProps.js.map