import React from "react";
import './DeskMenu.scss';

import {PatientState, OccupationState as OS, TaskState as TS} from "../share/BedProps"
import {SetState} from "../share/NetSetState";

export interface DeskMenuState {
	ind: number,
	elem: number,
	offsetX: number,
	offsetY: number,
	open: boolean
}

interface Props {
	state: DeskMenuState;
	s: PatientState;
	onStateChange: (state: SetState, arg?: any) => void;
	onClose: () => void;
}

export class DeskMenu extends React.Component<Props, {}> {
	render() {
		let options;

		if (this.props.s.occupation === OS.TO_CLEAN) {
			options = (<>
				<div className="DeskMenu-menuOption" 
					onClick={() => this.props.onStateChange(SetState.DISCHARGE_PATIENT, false)}>
					<p className='brush'>Mark Cleaned</p>
				</div>
				<hr />
				<div className="DeskMenu-menuOption"
					onClick={() => this.props.onStateChange(SetState.MESSAGE)}>
					<p className='message'>Message</p>
				</div>
				<div className="DeskMenu-menuOption"
					onClick={() => this.props.onStateChange(SetState.DISABLE, true)}>
					<p className='disable'>Disable</p>
				</div>
			</>);
		}
		else if (this.props.s.occupation === OS.UNOCCUPIED) {
			options = (<>
				<div className="DeskMenu-menuOption" 
					onClick={() => this.props.onStateChange(SetState.ASSIGN_PATIENT)}>
					<p className='assign'>Assign Patient</p>
				</div>
				<hr />
				<div className="DeskMenu-menuOption"
					onClick={() => this.props.onStateChange(SetState.MESSAGE)}>
					<p className='message'>Message</p>
				</div>
				<div className="DeskMenu-menuOption"
					onClick={() => this.props.onStateChange(SetState.DISABLE, true)}>
					<p className='disable'>Disable</p>
				</div>
			</>);
		}
		else if (this.props.s.occupation === OS.DISABLED) {
			options = (<>
				<div className="DeskMenu-menuOption"
					onClick={() => this.props.onStateChange(SetState.DISABLE, false)}>
					<p className='assign'>Enable</p>
				</div>
			</>);
		}
		else {
			options = (<>
				{/*Send Bloodwork*/}
				<div className="DeskMenu-menuOption" 
					onClick={() => this.props.onStateChange(SetState.SENT_BLOODWORK, this.props.s.bloodwork !== TS.SENT)}>
					{this.props.s.bloodwork === TS.SENT && 
						<div className="checkbox checked"/>}
					<p className={this.props.s.bloodwork !== TS.SENT ? "bloodwork" : ""}>
						{(this.props.s.bloodwork === TS.SENT ? "Sent" : "Send") + " for Bloodwork"}</p>
				</div>

				{/*Return Bloodwork*/}
				{this.props.s.bloodwork !== TS.NONE && <div className="DeskMenu-menuOption sub"
					onClick={() => this.props.onStateChange(SetState.RECV_BLOODWORK, this.props.s.bloodwork !== TS.RETURNED)}>
					{this.props.s.bloodwork === TS.RETURNED && 
						<div className="checkbox checked"/>}
					<p className={this.props.s.bloodwork !== TS.RETURNED ? "bloodwork" : ""}>Returned from Bloodwork</p>
				</div>}

				{/*Send Imaging*/}
				<div className="DeskMenu-menuOption"
					onClick={() => this.props.onStateChange(SetState.SENT_IMAGING, this.props.s.imaging !== TS.SENT)}>
					{this.props.s.imaging === TS.SENT && 
						<div className="checkbox checked"/>}
					<p className={this.props.s.imaging !== TS.SENT ? "imaging" : ""}>
						{(this.props.s.imaging === TS.SENT ? "Sent" : "Send") + " for Imaging"}</p>
				</div>

				{/*Return Imaging*/}
				{this.props.s.imaging !== TS.NONE && <div className="DeskMenu-menuOption sub"
					onClick={() => this.props.onStateChange(SetState.RECV_IMAGING, this.props.s.imaging !== TS.RETURNED)}>
					{this.props.s.imaging === TS.RETURNED && 
						<div className="checkbox checked"/>}
					<p className={this.props.s.imaging !== TS.RETURNED ? "imaging" : ""}>Returned from Imaging</p>
				</div>}

				{/*Send Consult*/}
				<div className="DeskMenu-menuOption"
					onClick={() => this.props.onStateChange(SetState.SENT_CONSULT, this.props.s.consult !== TS.SENT)}>
					{this.props.s.consult === TS.SENT && 
						<div className="checkbox checked"/>}
					<p className={this.props.s.consult !== TS.SENT ? "consult" : ""}>
						{(this.props.s.consult === TS.SENT ? "Sent" : "Send") + " for Consult"}</p>
				</div>

				{/*Return Consult*/}
				{this.props.s.consult !== TS.NONE && <div className="DeskMenu-menuOption sub"
					onClick={() => this.props.onStateChange(SetState.RECV_CONSULT, this.props.s.consult !== TS.RETURNED)}>
					{this.props.s.consult === TS.RETURNED && 
						<div className="checkbox checked"/>}
					<p className={this.props.s.consult !== TS.RETURNED ? "consult" : ""}>Returned from Consult</p>
				</div>}

				{/*Pending Discharge*/}
				{(this.props.s.consult === TS.RETURNED || this.props.s.bloodwork === TS.RETURNED || 
					this.props.s.imaging === TS.RETURNED || this.props.s.occupation === OS.PENDING_DISCHARGE) && <>
					<hr />

					<div className="DeskMenu-menuOption" 
						onClick={() => this.props.onStateChange((this.props.s.occupation === OS.PENDING_DISCHARGE) ? 
							SetState.ASSIGN_PATIENT : SetState.PATIENT_PENDING_DISCHARGE)}>
						<div className={"checkbox " + (this.props.s.occupation === OS.PENDING_DISCHARGE ? "checked" : "")}/>
						<p>Pending Discharge</p>
					</div>
				</>}

				<hr />

				<div className="DeskMenu-menuOption"
					onClick={() => this.props.onStateChange(SetState.MESSAGE)}>
					<p className='message'>Message</p>
				</div>
				<div className="DeskMenu-menuOption" 
					onClick={() => this.props.onStateChange(SetState.DISCHARGE_PATIENT, false)}>
					<p className='discharge'>Discharge</p>
				</div>
			</>);
		}


		return (
			<div className={"DeskMenu " + (this.props.state.open ? "open" : "")}>
				<div className="DeskMenu-mouseCatcher" onClick={this.props.onClose}/>
				<div className="DeskMenu-menuWrap" style={{left: this.props.state.offsetX, top: this.props.state.offsetY}}>
					{options}
				</div>
			</div>
		);
	}
}
