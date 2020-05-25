import React from "react";
import "../css/AdminPage.css"
import TitleBar from "../components/TitleBar";
import UserTab from "../components/UserTab";
import TagTab from "../components/TagTab";
import { Tab } from 'semantic-ui-react'


class AdminPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        var panes = [
            { menuItem: 'Users', render: () => <UserTab />},
            { menuItem: 'Tags', render: () => <TagTab />}
        ];

        return(
            <div>
                <TitleBar title="Manage Forum" />
                <Tab panes={panes} />
                <div className="endText">                   
                    <p1>
                        © All Rights Reserved. KIWI by Symps.
                    </p1>
                </div>
            </div>);
    }

}

export default AdminPage;