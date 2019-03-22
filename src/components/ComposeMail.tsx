import * as React from 'react';

export interface ComposeMailProps {
    message: string;
    title: string;
}

export default class ComposeMail extends React.Component<ComposeMailProps> {
    render() {
        
        const {message, title} = this.props;
        console.log("Hello: " + message + title);
        return (
            <div>{message} <h3>Composing mail</h3></div>
        );
    }

}