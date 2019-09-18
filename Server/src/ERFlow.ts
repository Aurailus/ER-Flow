import {Socket} from "socket.io";

import {BedProps, OccupationState as OS, TaskState as TS} from "./share/BedProps"
import {SetState} from "./share/NetSetState";

export class ERFlow {
	socket: Socket | null = null;
	patients: BedProps[];

	constructor() {
		this.patients = [];
		for (let i = 0; i < 18; i++) {
			this.patients.push({
				bedNum: i + 1,
				s: {
					occupation: OS.UNOCCUPIED,
					consult: TS.NONE,
					bloodwork: TS.NONE,
					imaging: TS.NONE,
					message: false
				}
			});
		}
	}

	replaceSocket(socket: Socket) {
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

	updateState(bedNum: number, state: SetState, arg?: any) {
		let bed: BedProps | null = null;

		for (let i = 0; i < this.patients.length; i++) {
			if (this.patients[i].bedNum === bedNum) {
				bed = this.patients[i];
				break;
			}
		}

		if (!bed) return;
		
		switch (state) {
			case SetState.ASSIGN_PATIENT: {
				bed.s.occupation = OS.OCCUPIED;
				break;
			}
			case SetState.SENT_BLOODWORK: {
				bed.s.bloodwork = TS.SENT;
				break;
			}
			case SetState.SENT_IMAGING: {
				bed.s.imaging = TS.SENT;
				break;
			}
			case SetState.SENT_CONSULT: {
				bed.s.consult = TS.SENT;
				break;
			}
			case SetState.RECV_BLOODWORK: {
				bed.s.bloodwork = TS.RETURNED;
				break;
			}
			case SetState.RECV_IMAGING: {
				bed.s.imaging = TS.RETURNED;
				break;
			}
			case SetState.RECV_CONSULT: {
				bed.s.consult = TS.RETURNED;
				break;
			}
			case SetState.PATIENT_PENDING_DISCHARGE: {
				bed.s.occupation = OS.PENDING_DISCHARGE;
				break;
			}
			case SetState.DISCHARGE_PATIENT: {
				bed.s.occupation = OS.UNOCCUPIED;
				bed.s.bloodwork = TS.NONE;
				bed.s.imaging = TS.NONE;
				bed.s.consult = TS.NONE;
				break;
			}
			case SetState.MESSAGE: {
				bed.s.message = true;
			}
		}

		this.sendState();
	}
}
