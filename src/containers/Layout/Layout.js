import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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
                <Toolbar click={this.showSideBarHandler}/>
                <SideDrawer show={this.state.showSideDrawer} click={this.sideDrawerHander}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;
