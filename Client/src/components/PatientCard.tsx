import React from 'react';
import './PatientCard.scss';

import {PatientState, OccupationState as OS, TaskState as TS} from "../share/BedProps"

interface Props {
	s: PatientState;
	bedNum: number;
	onClick: (e: React.MouseEvent) => void;
}

export class PatientCard extends React.Component<Props, {}> {
	render() {
		let state = this.props.s.occupation === OS.UNOCCUPIED ? "unoccupied"
							: this.props.s.message === true ? "message"
							: this.props.s.occupation === OS.OCCUPIED ? 
								  this.props.s.bloodwork !== TS.RETURNED && 
								  this.props.s.consult !== TS.RETURNED && 
								  this.props.s.imaging !== TS.RETURNED ? "satisfied" :
								  "needs_attention"
							: this.props.s.occupation === OS.PENDING_DISCHARGE ? "pending_discharge"
							: "message";

		let properCase = state === "unoccupied" ? "Unoccupied"
									 : state === "satisfied" ? "Satisfied"
									 : state === "pending_discharge" ? "Pending Discharge"
									 : state === "needs_attention" ? "Needs Attention"
									 : state === "message" ? "New Message"
									 : "Error"

		return (
			<div className={"PatientCard " + state} onClick={this.props.onClick}>
				<div className="PatientCard-topSegment">
					<div className="PatientCard-statusIconsWrap">
						{this.props.s.consult   === TS.SENT && 
							<div className="PatientCard-statusIcon consult sent"/>}
						{this.props.s.bloodwork === TS.SENT && 
							<div className="PatientCard-statusIcon bloodwork sent"/>}
						{this.props.s.imaging   === TS.SENT && 
							<div className="PatientCard-statusIcon imaging sent"/>}

						{this.props.s.consult   === TS.RETURNED && 
							<div className="PatientCard-statusIcon consult"/>}
						{this.props.s.bloodwork === TS.RETURNED && 
							<div className="PatientCard-statusIcon bloodwork"/>}
						{this.props.s.imaging   === TS.RETURNED && 
							<div className="PatientCard-statusIcon imaging"/>}
						{this.props.s.message && 
							<div className="PatientCard-statusIcon message"/>}
					</div>
				</div>
				<div className="PatientCard-content">
					<p className="PatientCard-bedNumber">{this.props.bedNum}</p>
					<p className="PatientCard-statusText">{properCase}</p>
				</div>
			</div>
		);
	}
}
