import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Redirect } from 'react-router-dom';

export interface ReadMailProps {
    message: string;
}

export interface ReadMailState {
    exists: string;
    label: string;
}

export default class ReadMail extends React.Component<ReadMailProps & RouteComponentProps<any>, ReadMailState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            exists: null,
            label: null,
        };

        this.getCandidate = this.getCandidate.bind(this);
        this.onSelected = this.onSelected.bind(this);
    }

    onSelected(e){
        let liTags = document.getElementsByTagName("li");

        let i = 0;
        for(i = 0;i < liTags.length; i++){
            liTags[i].classList.remove("is-selected");
        }
        
        e.target.parentElement.classList.add("is-selected");
        let id = e.target.parentElement.childNodes[3].value;
        console.log(id);
        /*this.setState({isGistSelected : true,
            selectedGistId: id});*/
        //this.props.history.push("/candidate-list");
        //this.props.location.pathname("/candidate-list");
        return <Redirect to="/candidate-list"/>
        
    }

    componentDidMount() {
        const {emailAddress} = Office.context.mailbox.item.from;
        
        this.getCandidate(emailAddress, (candidate, error) => {
            if(candidate.email){
                console.log("emailAddress=> " + candidate.email);
                this.setState({exists:"TRUE",
                                label: "A candidate"});
            } else if(candidate.message) {
                console.log("emailAddress: " + candidate.message);
                this.setState({exists:"FALSE",
                        label: "Not a candidate"});
            }

            if(error){
                console.log("error: " + error);
            }
        });
    }

    getCandidate(email,callback){
        fetch('http://localhost/api/candidate/read_one.php?email=' + email)
        .then(response => response.json())
        .then(data => {
            console.log("TEST: " + data);
            callback(data);
        }).catch(error => {
            callback(null, error);
        });
    }

    render() {
        const {
            displayName, emailAddress
        } = Office.context.mailbox.item.from;

        let show = {display:"none"};

        if(this.state.label === "Not a candidate"){
            show = {display:"inline"};
        }
       
        return (
            <div>
                <div id="candidate-container" >
                    <ul id="candidate-list" className="ms-List">
                        <li className="ms-ListItem" onClick={this.onSelected}>
                            <span className="ms-ListItem-primaryText">{displayName}</span>
                            <span className="ms-ListItem-secondaryText">{emailAddress}</span>
                            <span className="ms-ListItem-tertiaryText">{this.state.label}</span>
                            <input type="hidden" value={emailAddress} />
                        </li>
                    </ul>
                </div>
                <div style={show}>
                <div className="ms-font-s" style={{paddingLeft: "20px"}} >
                <p>This person was not found in RecruiterPal. <br/>
                    Would you like to add them as candidate?</p>

                    
                </div>
                <br/>
                    {/*<Link to="/candidate-list" style={{paddingLeft: "20px", fontWeight: "bold"}}>ADD NEW CANDIDATE</Link>*/}
                    <a href="/candidate-list" style={{paddingLeft: "20px", fontWeight: "bold"}}>ADD NEW CANDIDATE</a>
                </div>
            </div>
        );
    }

}