"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BedProps_1 = require("./share/BedProps");
const NetSetState_1 = require("./share/NetSetState");
class ERFlow {
    constructor(io) {
        this.io = io;
        this.patients = [];
        for (let i = 0; i < 9; i++) {
            this.patients.push({
                bedNum: i + 1,
                s: {
                    occupation: i % 6 == 0 ? BedProps_1.OccupationState.TO_CLEAN : BedProps_1.OccupationState.UNOCCUPIED,
                    consult: BedProps_1.TaskState.NONE,
                    bloodwork: BedProps_1.TaskState.NONE,
                    imaging: BedProps_1.TaskState.NONE,
                    message: false
                }
            });
        }
    }
    addSocket(socket) {
        socket.emit('started');
        socket.on('updatePatient', this.updateState.bind(this));
        this.sendState();
    }
    sendState() {
        console.log("Sending state.");
        this.io.emit('state', this.patients);
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
                bed.s.bloodwork = arg ? BedProps_1.TaskState.SENT : BedProps_1.TaskState.NONE;
                break;
            }
            case NetSetState_1.SetState.SENT_IMAGING: {
                bed.s.imaging = arg ? BedProps_1.TaskState.SENT : BedProps_1.TaskState.NONE;
                break;
            }
            case NetSetState_1.SetState.SENT_CONSULT: {
                bed.s.consult = arg ? BedProps_1.TaskState.SENT : BedProps_1.TaskState.NONE;
                break;
            }
            case NetSetState_1.SetState.RECV_BLOODWORK: {
                bed.s.bloodwork = arg ? BedProps_1.TaskState.RETURNED : BedProps_1.TaskState.NONE;
                break;
            }
            case NetSetState_1.SetState.RECV_IMAGING: {
                bed.s.imaging = arg ? BedProps_1.TaskState.RETURNED : BedProps_1.TaskState.NONE;
                break;
            }
            case NetSetState_1.SetState.RECV_CONSULT: {
                bed.s.consult = arg ? BedProps_1.TaskState.RETURNED : BedProps_1.TaskState.NONE;
                break;
            }
            case NetSetState_1.SetState.PATIENT_PENDING_DISCHARGE: {
                bed.s.occupation = BedProps_1.OccupationState.PENDING_DISCHARGE;
                break;
            }
            case NetSetState_1.SetState.DISCHARGE_PATIENT: {
                bed.s.occupation = arg ? BedProps_1.OccupationState.TO_CLEAN : BedProps_1.OccupationState.UNOCCUPIED;
                bed.s.bloodwork = BedProps_1.TaskState.NONE;
                bed.s.imaging = BedProps_1.TaskState.NONE;
                bed.s.consult = BedProps_1.TaskState.NONE;
                break;
            }
            case NetSetState_1.SetState.MESSAGE: {
                bed.s.message = true;
                break;
            }
            case NetSetState_1.SetState.DISABLE: {
                bed.s.occupation = arg ? BedProps_1.OccupationState.DISABLED : BedProps_1.OccupationState.UNOCCUPIED;
                bed.s.bloodwork = BedProps_1.TaskState.NONE;
                bed.s.imaging = BedProps_1.TaskState.NONE;
                bed.s.consult = BedProps_1.TaskState.NONE;
                bed.s.message = false;
                break;
            }
        }
        this.sendState();
    }
}
exports.ERFlow = ERFlow;
//# sourceMappingURL=ERFlow.js.map