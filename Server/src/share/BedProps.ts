export interface BedProps {
	bedNum: number;
	s: PatientState;
}

export enum TaskState {
	SENT,
	RETURNED,
	NONE
}

export enum OccupationState {
	UNOCCUPIED,
	OCCUPIED,
	PENDING_DISCHARGE,
	DISABLED,
	TO_CLEAN,
}

export interface PatientState {
	occupation: OccupationState;

	consult: TaskState;
	bloodwork: TaskState;
	imaging: TaskState;
	message: boolean;
}
