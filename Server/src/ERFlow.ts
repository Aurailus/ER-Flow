import {Socket, Server} from "socket.io";

import {BedProps, OccupationState as OS, TaskState as TS} from "./share/BedProps"
import {SetState} from "./share/NetSetState";

export class ERFlow {
	patients: BedProps[];
	io: Server;
	constructor(io: Server) {
		this.io = io;
		this.patients = [];
		for (let i = 0; i < 9; i++) {
			this.patients.push({
				bedNum: i + 1,
				s: {
					occupation: i % 6 == 0 ? OS.TO_CLEAN : OS.UNOCCUPIED,
					consult: TS.NONE,
					bloodwork: TS.NONE,
					imaging: TS.NONE,
					message: false
				}
			});
		}
	}

	addSocket(socket: Socket) {
		socket.emit('started');
		socket.on('updatePatient', this.updateState.bind(this));
		this.sendState();
	}

	sendState() {
		console.log("Sending state.");
		this.io.emit('state', this.patients);
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
				bed.s.bloodwork = (arg as boolean) ? TS.SENT : TS.NONE;
				break;
			}
			case SetState.SENT_IMAGING: {
				bed.s.imaging = (arg as boolean) ? TS.SENT : TS.NONE;
				break;
			}
			case SetState.SENT_CONSULT: {
				bed.s.consult = (arg as boolean) ? TS.SENT : TS.NONE;
				break;
			}
			case SetState.RECV_BLOODWORK: {
				bed.s.bloodwork = (arg as boolean) ? TS.RETURNED : TS.NONE;
				break;
			}
			case SetState.RECV_IMAGING: {
				bed.s.imaging = (arg as boolean) ? TS.RETURNED : TS.NONE;
				break;
			}
			case SetState.RECV_CONSULT: {
				bed.s.consult = (arg as boolean) ? TS.RETURNED : TS.NONE;
				break;
			}
			case SetState.PATIENT_PENDING_DISCHARGE: {
				bed.s.occupation = OS.PENDING_DISCHARGE;
				break;
			}
			case SetState.DISCHARGE_PATIENT: {
				bed.s.occupation = (arg as boolean) ? OS.TO_CLEAN : OS.UNOCCUPIED;
				bed.s.bloodwork = TS.NONE;
				bed.s.imaging = TS.NONE;
				bed.s.consult = TS.NONE;
				break;
			}
			case SetState.MESSAGE: {
				bed.s.message = true;
				break;
			}
			case SetState.DISABLE: {
				bed.s.occupation = (arg as boolean) ? OS.DISABLED : OS.UNOCCUPIED;
				bed.s.bloodwork = TS.NONE;
				bed.s.imaging = TS.NONE;
				bed.s.consult = TS.NONE;
				bed.s.message = false;
				break;
			}
		}

		this.sendState();
	}
}
