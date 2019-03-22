import * as React from 'react';
//import { Button, ButtonType } from 'office-ui-fabric-react';
import ComposeMail from './ComposeMail';
import ReadMail from './ReadMail';
import CandidateList from './CandidateList';
import Progress from './Progress';
import { Switch, Route } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

library.add(faFilePdf);

export interface AppProps {
    title: string;
    isOfficeInitialized: boolean;
}

export interface AppState {
    //listItems: HeroListItem[];
}

export default class App extends React.Component<AppProps, AppState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            listItems: []
        };
    }

    componentDidMount() {
        this.setState({
            listItems: [
                {
                    icon: 'Ribbon',
                    primaryText: 'Achieve more with Office integration'
                },
                {
                    icon: 'Unlock',
                    primaryText: 'Unlock features and functionality'
                },
                {
                    icon: 'Design',
                    primaryText: 'Create and visualize like a pro'
                }
            ]
        });
    }

    click = async () => {
        /**
         * Insert your Outlook code here
         */
    }

    render() {
        const {
            title,
            isOfficeInitialized,
        } = this.props;

        if (!isOfficeInitialized) {
            return (
                <Progress
                    title={title}
                    logo='assets/logo-filled.png'
                    message='Please sideload your addin to see app body.'
                />
            );
        }

       /* const {
            itemId, subject, internetMessageId
        } = Office.context.mailbox.item;

        const {
            displayName, emailAddress
        } = Office.context.mailbox.item.from;*/

        return (
            <div className='ms-Fabric content-main'>
                <Switch>
                    <Route path="/msg-compose" render={props => (<ComposeMail message="test" title="compose"  {...props} />)} />
                    <Route path="/msg-read" render={props => (<ReadMail message="Reading Mail" {...props} />)} />
                    <Route path="/candidate-list" render={props => (<CandidateList {...props} />)} />
                </Switch>
                
            </div>
        );
    }
}
