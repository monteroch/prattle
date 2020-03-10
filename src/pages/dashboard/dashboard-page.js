import React, { Component } from 'react';
import { connect } from "react-redux";
import { logout, loadProfile } from "../../redux/actions/user.actions";
import './dashboard-page.css';
import ChatComponent from "../../components/chat/chat.component";
import SettingsComponent from "../../components/settings/settings.component";
import UsersComponent from "../../components/users/users.component";
import NotificationsComponent from "../../components/notifications/notifications.component";
import SidebarComponent from "../../components/sidebar/sidebar.component";
import ModalComponent from "../../components/modal/modal.component"


import { FormattedMessage } from 'react-intl';

const section = {
    height: "100px"
};

class DashboardPage extends Component{
    constructor(props){
        super(props);
        // console.log("Dashboard Component");
        this.state = {
            section: "chats",
            modal: false
        }
    }

    componentDidMount(){
        const { loadProfile } = this.props;
        loadProfile(this.props.loggedIn.userId);
        // console.log(this.props.loggedIn);
        // console.log("The fullname before loading socket is: ", this.props.loggedIn.fullname);
        // loadSocket(this.props.loggedIn.fullname);
        // this.socket = io('http://localhost:4001');
    }

    submitHandler = () => {
        const { logout } = this.props;
        logout();
    }

    modalHandler = () => {
        this.setState({modal: !this.state.modal});
    }

    render(){
        return(
           <div className="main-container">
                <div className="navbar">
                    <h1><FormattedMessage id="dashboard.title" defaultMessage="Dashboard" /><span role="img" aria-label="doggie">&#128021;</span></h1>
                    <h3 className="welcome"><FormattedMessage id="dashboard.welcome" defaultMessage="Welcome" /> { this.props.loggedIn.fullname }</h3>
                </div>
                <div className="dashboard-body">
                    <div className="side-menu">
                        <SidebarComponent/>
                    </div>
                    <div className="interactive-container">
                        {   (this.props.dashboardTab === "chats") ? (
                                <ChatComponent/>
                            ):(
                                (this.props.dashboardTab === "users") ? (
                                    <UsersComponent/>
                                ) : (
                                    (this.props.dashboardTab === "settings") ? (
                                        <SettingsComponent/>
                                    ) : (
                                        <NotificationsComponent/>
                                    )
                                    
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    loadProfile:(userId) => dispatch(loadProfile(userId))
})

const mapStateToProps =(state) => {
    const { loggedIn, dashboardTab } = state;
    return { 
        loggedIn: loggedIn,
        dashboardTab: dashboardTab
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

