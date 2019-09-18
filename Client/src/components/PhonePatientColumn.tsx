import React from 'react';
import './PhonePatientColumn.scss';

import {PatientCard} from "./PatientCard"
import {BedProps} from "../share/BedProps"
import {OccupationState as OS} from "../share/BedProps"

interface Props {
	patients: BedProps[];
	onClick: (ind: number, e: React.MouseEvent) => void;
}

export class PhonePatientColumn extends React.Component<Props, {}> {
	render() {
		return (
			<div className="PhonePatientColumn">
				{this.props.patients.map((patient, index) => {
					if (patient.s.occupation !== OS.DISABLED) return (<PatientCard 
						bedNum={patient.bedNum} 
						key={patient.bedNum}
						s={patient.s} 
						onClick={(e: React.MouseEvent) => this.props.onClick(patient.bedNum, e)}
					/>);
					return null;
				})}
			</div>
		);
	}
}
