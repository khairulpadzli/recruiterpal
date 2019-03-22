import * as React from 'react';
import { TextField, ComboBox, IComboBoxOption, PrimaryButton } from 'office-ui-fabric-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface CandidateListState {
    jobOptions: IComboBoxOption[];
}

export default class CandidateList extends React.Component<any, CandidateListState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            jobOptions : []
        }
        this.getJobList = this.getJobList.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onSave(){
        
        console.log((document.getElementById("email") as HTMLInputElement).value);
    }

    componentDidMount() {
        this.getJobList((jobs, error) => {
            if(jobs){
                //let list: {key: string, text: string}[] = [];
                let list = [];
                list.push({key: "0", text:"Select Job"});
                jobs.records.map(job => {
                    list.push({key:job.id, text:job.job_title});
                });
                this.setState({jobOptions:list});
            }

            if(error){
                console.log(error.message);
            }
        });
    }

    getJobList(callback){
        fetch('http://localhost/api/job/read.php')
        .then(response => response.json())
        .then(data => {
            callback(data);
        }).catch(error => {
            callback(null, error);
        });
    }
    render(){

        const {
            displayName, emailAddress
        } = Office.context.mailbox.item.from;

        const STATUS_OPTIONS: IComboBoxOption[] = [
                { key: "0", text: 'Deactive' },
                { key: "1", text: 'Active' }];

        const DOC_OPTIONS: IComboBoxOption[] = [
                { key: "0", text: "Don't Upload" },
                { key: "1", text: 'Resume' },
                { key: "2", text: 'Other Document' }];
        return(<div>
            <div style={{marginLeft:"20px", marginBottom: "20px"}}>
            <table>
                <tbody>
                    <tr><td className="ms-font-l" style={{fontWeight:"bold"}}>{displayName}</td></tr>
                    <tr><td className="ms-font-s" >Not a candidate</td></tr>
                </tbody>
            </table>
            </div>
            <div style={{marginLeft:"5%", marginBottom: "10px"}}>
                <p className="ms-font-l" style={{marginBottom:"15px"}}>ADD NEW CANDIDATE</p>
                <form className="ms-font-s">
                    <TextField id="email" label="E-Mail:" value={emailAddress} />
                    <TextField id="lastName" label="Last Name:" value=""/>
                    <TextField id="firstName" label="First Name:" value={displayName}/>
                    <ComboBox id="job" label="Job" options={this.state.jobOptions} selectedKey="0"/>
                    <ComboBox id="status" label="Status" options={STATUS_OPTIONS} selectedKey="1"/>
                </form>
                <div style={{marginBottom:"15px"}}>
                    <p className="ms-font-l" style={{marginBottom: "10px", marginTop:"25px"}}>DOCUMENTS</p>
                    <p className="ms-font-s" style={{fontWeight:"bold"}}>
                    <FontAwesomeIcon icon="file-pdf"/>&nbsp;{Office.context.mailbox.item.attachments[0].name}</p>
                    <ComboBox label="Choose Type" options={DOC_OPTIONS} selectedKey="0"/>
                </div>
                <PrimaryButton text="CANCEL" />
                <PrimaryButton name="save" text="SAVE" style={{marginLeft:"20px"}} onClick={this.onSave}/>
            </div>
        </div>);
    }
}