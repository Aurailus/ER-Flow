"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SetState;
(function (SetState) {
    SetState[SetState["ASSIGN_PATIENT"] = 0] = "ASSIGN_PATIENT";
    SetState[SetState["PATIENT_PENDING_DISCHARGE"] = 1] = "PATIENT_PENDING_DISCHARGE";
    SetState[SetState["DISCHARGE_PATIENT"] = 2] = "DISCHARGE_PATIENT";
    SetState[SetState["SENT_BLOODWORK"] = 3] = "SENT_BLOODWORK";
    SetState[SetState["SENT_IMAGING"] = 4] = "SENT_IMAGING";
    SetState[SetState["SENT_CONSULT"] = 5] = "SENT_CONSULT";
    SetState[SetState["RECV_BLOODWORK"] = 6] = "RECV_BLOODWORK";
    SetState[SetState["RECV_IMAGING"] = 7] = "RECV_IMAGING";
    SetState[SetState["RECV_CONSULT"] = 8] = "RECV_CONSULT";
    SetState[SetState["MESSAGE"] = 9] = "MESSAGE";
})(SetState = exports.SetState || (exports.SetState = {}));
//# sourceMappingURL=NetSetState.js.map