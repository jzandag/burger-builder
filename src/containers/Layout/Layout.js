import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    
    sideDrawerHander =() => {
        this.setState({
            showSideDrawer: false
        })
    }

    showSideBarHandler = () => {
        this.setState({
            showSideDrawer: true
        })
    }

    render(){
        return (
            <Aux>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    click={this.showSideBarHandler}/>
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
                    show={this.state.showSideDrawer} 
                    click={this.sideDrawerHander}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);
