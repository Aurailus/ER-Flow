import React from "react";
import './PatientMenu.scss';

import {PatientState, OccupationState as OS, TaskState as TS} from "../share/BedProps"
import {SetState} from "../share/NetSetState";

export interface PatientMenuState {
	ind: number,
	s: PatientState,
	offsetX: number,
	offsetY: number,
	open: boolean
}

interface Props {
	state: PatientMenuState;
	onStateChange: (state: SetState) => void;
	onClose: () => void;
}

export class PatientMenu extends React.Component<Props, {}> {
	render() {
		let options;

		if (this.props.state.s.occupation === OS.UNOCCUPIED) {
			options = (<>
				<div className="PatientMenu-menuOption" 
					onClick={() => this.props.onStateChange(SetState.ASSIGN_PATIENT)}>
					<p className='assign'>Assign Patient</p>
				</div>
				<hr />
				<div className="PatientMenu-menuOption"
					onClick={() => this.props.onStateChange(SetState.MESSAGE)}>
					<p className='message'>Message</p>
				</div>
			</>);
		}
		else {
			options = (<>
				<div className="PatientMenu-menuOption" 
					onClick={() => this.props.onStateChange(SetState.SENT_BLOODWORK)}>
					<div className={"checkbox " + (this.props.state.s.bloodwork === TS.SENT ? "checked" : "")}/>
					<p>Sent for Bloodwork</p>
				</div>
				<div className="PatientMenu-menuOption"
					onClick={() => this.props.onStateChange(SetState.SENT_IMAGING)}>
					<div className={"checkbox " + (this.props.state.s.imaging === TS.SENT ? "checked" : "")}/>
					<p>Sent for Imaging</p>
				</div>
				<div className="PatientMenu-menuOption"
					onClick={() => this.props.onStateChange(SetState.SENT_CONSULT)}>
					<div className={"checkbox " + (this.props.state.s.consult === TS.SENT ? "checked" : "")}/>
					<p>Sent for Consult</p>
				</div>

				{(this.props.state.s.bloodwork === TS.SENT 
				||this.props.state.s.imaging === TS.SENT 
				||this.props.state.s.consult === TS.SENT) &&
					<>
						<hr />

						{this.props.state.s.bloodwork === TS.SENT && <div className="PatientMenu-menuOption"
							onClick={() => this.props.onStateChange(SetState.RECV_BLOODWORK)}>
							<div className="checkbox"/>
							<p>Returned from Bloodwork</p>
						</div>}

						{this.props.state.s.imaging === TS.SENT && <div className="PatientMenu-menuOption"
							onClick={() => this.props.onStateChange(SetState.RECV_IMAGING)}>
							<div className="checkbox"/>
							<p>Returned from Imaging</p>
						</div>}

						{this.props.state.s.consult === TS.SENT && <div className="PatientMenu-menuOption"
							onClick={() => this.props.onStateChange(SetState.RECV_CONSULT)}>
							<div className="checkbox"/>
							<p>Returned from Consult</p>
						</div>}

					</>
				}

				<hr />

				<div className="PatientMenu-menuOption"
					onClick={() => this.props.onStateChange(SetState.MESSAGE)}>
					<p className='message'>Message</p>
				</div>
				<div className="PatientMenu-menuOption" 
					onClick={() => this.props.onStateChange((this.props.state.s.occupation === OS.PENDING_DISCHARGE) ? SetState.ASSIGN_PATIENT : SetState.PATIENT_PENDING_DISCHARGE)}>
					<div className={"checkbox " + (this.props.state.s.occupation === OS.PENDING_DISCHARGE ? "checked" : "")}/>
					<p>Pending Discharge</p>
				</div>
				<div className="PatientMenu-menuOption" 
					onClick={() => this.props.onStateChange(SetState.DISCHARGE_PATIENT)}>
					<p className='discharge'>Discharge</p>
				</div>
			</>);
		}


		return (
			<div className={"PatientMenu " + (this.props.state.open ? "open" : "")}>
				<div className="PatientMenu-mouseCatcher" onClick={this.props.onClose}/>
				<div className="PatientMenu-menuWrap" style={{left: this.props.state.offsetX, top: this.props.state.offsetY}}>
					{options}
				</div>
			</div>
		);
	}
}
