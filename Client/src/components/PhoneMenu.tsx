import React from "react";
import './PhoneMenu.scss';

import {PatientState, OccupationState as OS, TaskState as TS} from "../share/BedProps"
import {SetState} from "../share/NetSetState";

export interface PhoneMenuState {
	ind: number,
	elem: number;
	open: boolean
}

interface Props {
	state: PhoneMenuState;
	s: PatientState;
	onStateChange: (state: SetState, arg?: any) => void;
	onClose: () => void;
}

export class PhoneMenu extends React.Component<Props, {}> {
	render() {
		let options;

		if (this.props.s.occupation === OS.UNOCCUPIED || this.props.s.occupation === OS.TO_CLEAN) {
			options = (<>
				<div className="PhoneMenu-menuOption"
					onClick={() => this.props.onStateChange(SetState.MESSAGE)}>
					<p className='message'>Message</p>
				</div>
			</>);
		}
		else if (this.props.s.occupation === OS.DISABLED) {
			options = (<>
				<div className="PhoneMenu-menuOption"
					onClick={() => this.props.onStateChange(SetState.DISABLE, false)}>
					<p className='assign'>Enable</p>
				</div>
			</>);
		}
		else {
			options = (<>
				{( this.props.s.bloodwork === TS.RETURNED 
				|| this.props.s.imaging === TS.RETURNED 
				|| this.props.s.consult === TS.RETURNED) && <>
					{/*Clear Bloodwork*/}
					{this.props.s.bloodwork === TS.RETURNED && <div className="PhoneMenu-menuOption"
						onClick={() => this.props.onStateChange(SetState.RECV_BLOODWORK, false)}>
						<p className="bloodwork">Clear Bloodwork</p>
					</div>}

					{/*Clear Imaging*/}
					{this.props.s.imaging === TS.RETURNED && <div className="PhoneMenu-menuOption"
						onClick={() => this.props.onStateChange(SetState.RECV_IMAGING, false)}>
						<p className="imaging">Clear Imaging</p>
					</div>}

					{/*Clear Consult*/}
					{this.props.s.consult === TS.RETURNED && <div className="PhoneMenu-menuOption"
						onClick={() => this.props.onStateChange(SetState.RECV_CONSULT, false)}>
						<p className="consult">Clear Consult</p>
					</div>}
					<hr/>
				</>}


				{/*Send Bloodwork*/}
				{this.props.s.bloodwork !== TS.RETURNED &&
					<div className="PhoneMenu-menuOption" 
						onClick={() => this.props.onStateChange(SetState.SENT_BLOODWORK, this.props.s.bloodwork !== TS.SENT)}>
						{this.props.s.bloodwork === TS.SENT && <div className="checkbox checked"/>}
						<p className={this.props.s.bloodwork !== TS.SENT ? "bloodwork" : ""}>
							{(this.props.s.bloodwork === TS.SENT ? "Sent" : "Send") + " for Bloodwork"}</p>
					</div>
				}

				{/*Send Imaging*/}
				{this.props.s.imaging !== TS.RETURNED &&
					<div className="PhoneMenu-menuOption" 
						onClick={() => this.props.onStateChange(SetState.SENT_IMAGING, this.props.s.imaging !== TS.SENT)}>
						{this.props.s.imaging === TS.SENT && <div className="checkbox checked"/>}
						<p className={this.props.s.imaging !== TS.SENT ? "imaging" : ""}>
							{(this.props.s.imaging === TS.SENT ? "Sent" : "Send") + " for Imaging"}</p>
					</div>
				}

				{/*Send Consult*/}
				{this.props.s.consult !== TS.RETURNED &&
					<div className="PhoneMenu-menuOption" 
						onClick={() => this.props.onStateChange(SetState.SENT_CONSULT, this.props.s.consult !== TS.SENT)}>
						{this.props.s.consult === TS.SENT && <div className="checkbox checked"/>}
						<p className={this.props.s.consult !== TS.SENT ? "consult" : ""}>
							{(this.props.s.consult === TS.SENT ? "Sent" : "Send") + " for Consult"}</p>
					</div>
				}

				{( this.props.s.bloodwork !== TS.RETURNED 
				|| this.props.s.imaging !== TS.RETURNED 
				|| this.props.s.consult !== TS.RETURNED) && <hr/>}

				{/*Pending Discharge*/}
				{(this.props.s.consult === TS.RETURNED || this.props.s.bloodwork === TS.RETURNED || 
					this.props.s.imaging === TS.RETURNED || this.props.s.occupation === OS.PENDING_DISCHARGE) && <>

					<div className="PhoneMenu-menuOption" 
						onClick={() => this.props.onStateChange((this.props.s.occupation === OS.PENDING_DISCHARGE) ? 
							SetState.ASSIGN_PATIENT : SetState.PATIENT_PENDING_DISCHARGE)}>
						<div className={"checkbox " + (this.props.s.occupation === OS.PENDING_DISCHARGE ? "checked" : "")}/>
						<p>Pending Discharge</p>
					</div>
				</>}

				<div className="PhoneMenu-menuOption"
					onClick={() => this.props.onStateChange(SetState.MESSAGE)}>
					<p className='message'>Message</p>
				</div>
				<div className="PhoneMenu-menuOption" 
					onClick={() => this.props.onStateChange(SetState.DISCHARGE_PATIENT, true)}>
					<p className='discharge'>Discharge</p>
				</div>
			</>);
		}

		return (
			<div className={"PhoneMenu " + (this.props.state.open ? "open" : "")}>
				<div className="PhoneMenu-mouseCatcher" onClick={this.props.onClose}/>
				<div className="PhoneMenu-menuWrap">
					{options}
				</div>
			</div>
		);
	}
}
