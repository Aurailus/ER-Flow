import React from 'react';
import './PatientColumn.scss';

import {PatientCard} from "./PatientCard"
import {BedProps} from "../share/BedProps"

interface Props {
	patients: BedProps[];
	onClick: (ind: number, e: React.MouseEvent) => void;
}

export class PatientColumn extends React.Component<Props, {}> {
	render() {
		return (
			<div className="PatientColumn">
				{this.props.patients.map((patient, index) => 
					<PatientCard 
						bedNum={patient.bedNum} 
						key={patient.bedNum}
						s={patient.s} 
						onClick={(e: React.MouseEvent) => this.props.onClick(patient.bedNum, e)}
					/>
				)}
			</div>
		);
	}
}
