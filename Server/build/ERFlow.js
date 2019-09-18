"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BedProps_1 = require("./share/BedProps");
const NetSetState_1 = require("./share/NetSetState");
class ERFlow {
    constructor() {
        this.socket = null;
        this.patients = [];
        for (let i = 0; i < 18; i++) {
            this.patients.push({
                bedNum: i + 1,
                s: {
                    occupation: BedProps_1.OccupationState.UNOCCUPIED,
                    consult: BedProps_1.TaskState.NONE,
                    bloodwork: BedProps_1.TaskState.NONE,
                    imaging: BedProps_1.TaskState.NONE,
                    message: false
                }
            });
        }
    }
    replaceSocket(socket) {
        if (this.socket != null) {
            this.socket.emit('ended');
            this.socket.disconnect(true);
        }
        this.socket = socket;
        this.socket.emit('started');
        this.socket.on('updatePatient', this.updateState.bind(this));
        this.sendState();
    }
    sendState() {
        if (this.socket != null) {
            console.log("Sending state.");
            this.socket.emit('state', this.patients);
        }
    }
    updateState(bedNum, state, arg) {
        let bed = null;
        for (let i = 0; i < this.patients.length; i++) {
            if (this.patients[i].bedNum === bedNum) {
                bed = this.patients[i];
                break;
            }
        }
        if (!bed)
            return;
        switch (state) {
            case NetSetState_1.SetState.ASSIGN_PATIENT: {
                bed.s.occupation = BedProps_1.OccupationState.OCCUPIED;
                break;
            }
            case NetSetState_1.SetState.SENT_BLOODWORK: {
                bed.s.bloodwork = BedProps_1.TaskState.SENT;
                break;
            }
            case NetSetState_1.SetState.SENT_IMAGING: {
                bed.s.imaging = BedProps_1.TaskState.SENT;
                break;
            }
            case NetSetState_1.SetState.SENT_CONSULT: {
                bed.s.consult = BedProps_1.TaskState.SENT;
                break;
            }
            case NetSetState_1.SetState.RECV_BLOODWORK: {
                bed.s.bloodwork = BedProps_1.TaskState.RETURNED;
                break;
            }
            case NetSetState_1.SetState.RECV_IMAGING: {
                bed.s.imaging = BedProps_1.TaskState.RETURNED;
                break;
            }
            case NetSetState_1.SetState.RECV_CONSULT: {
                bed.s.consult = BedProps_1.TaskState.RETURNED;
                break;
            }
            case NetSetState_1.SetState.PATIENT_PENDING_DISCHARGE: {
                bed.s.occupation = BedProps_1.OccupationState.PENDING_DISCHARGE;
                break;
            }
            case NetSetState_1.SetState.DISCHARGE_PATIENT: {
                bed.s.occupation = BedProps_1.OccupationState.UNOCCUPIED;
                bed.s.bloodwork = BedProps_1.TaskState.NONE;
                bed.s.imaging = BedProps_1.TaskState.NONE;
                bed.s.consult = BedProps_1.TaskState.NONE;
                break;
            }
            case NetSetState_1.SetState.MESSAGE: {
                bed.s.message = true;
            }
        }
        this.sendState();
    }
}
exports.ERFlow = ERFlow;
//# sourceMappingURL=ERFlow.js.map