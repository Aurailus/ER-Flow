import React from 'react';
import openSocket from 'socket.io-client';
import './PhoneApp.scss';

import {PhonePatientColumn} from "./PhonePatientColumn";
import {PhoneMenu, PhoneMenuState} from "./PhoneMenu";
import {BedProps} from "../share/BedProps";
import {SetState} from "../share/NetSetState";

interface State {
  patients: BedProps[];
  menu: PhoneMenuState | null;
  socket: SocketIOClient.Socket | null;
  socketState: string;
}

export class PhoneApp extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      socket: null,
      socketState: "unconnected",
      patients: [],
      menu: null
    }

    const socket = openSocket('http://192.168.1.9:8000');

    socket.on('connect', () => {
      this.setState({socket: socket});

      this.initSocket();

      this.state.socket!.on('disconnect', () => {
        this.setState({socket: null, socketState: "retrying"});
      });
    });
  }

  initSocket() {
    this.state.socket!.emit('init');
    this.state.socket!.on('state', (patients: BedProps[]) => {
      this.setState({patients: patients});
    });
  }

  patientCardClicked(ind: number, e: React.MouseEvent) {
    let elem = -1;
    for (let i = 0; i < this.state.patients.length; i++) {
      if (this.state.patients[i].bedNum === ind) {
        elem = i;
        break;
      }
    }
    if (elem === -1) return;

    this.setState({menu: {
      ind: ind,
      elem: elem,
      open: false
    }});

    setTimeout(() => {
      let menu = Object.assign({}, this.state.menu);
      menu.open = true;
      this.setState({menu: menu});
    }, 16);
  }

  patientMenuStateChange(ind: number, state: SetState, arg?: any) {
    this.state.socket!.emit('updatePatient', ind, state, arg);
    this.patientMenuClose();
  }

  patientMenuClose() {
    let menu = Object.assign({}, this.state.menu);
    menu.open = false;
    this.setState({menu: menu});

    setTimeout(() => this.setState({menu: null}), 100);
  }

  render() {
    return (
      <div className="PhoneApp">
        <div className="PhoneApp-header">
          <h1>PR Hospital ER</h1>
        </div>
        {this.state.socket != null && <>
          <PhonePatientColumn patients={this.state.patients} onClick={this.patientCardClicked.bind(this)}/>
          {this.state.menu && 
            <PhoneMenu
              state={this.state.menu}
              s={this.state.patients[this.state.menu.elem].s}
              onStateChange={this.patientMenuStateChange.bind(this, this.state.menu.ind)}
              onClose={this.patientMenuClose.bind(this)}
            />
          }
        </>}
        {this.state.socket == null &&
          <h1 className="PhoneApp-connectMessage">
            {this.state.socketState === "unconnected" ? 
              "Connecting..." :
             this.state.socketState === "retrying" ?
              "Disconnected. Attempting to reconnect." :
              "Error state. Please try again later"
            }
          </h1>
        }
      </div>
    );
  }
}
