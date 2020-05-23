import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner'

import { connect } from "react-redux";
import * as actionypes from '../../store/actions/index'

class Orders extends Component {

    componentDidMount(){
        this.props.onFetchOrder(this.props.token, this.props.userId)
    }
     
    render() {
        let order = this.props.orders.map(o => {
            return (
                <Order 
                    key={o.id}
                    ingredients={o.ingredients}
                    price={o.price}
                    />
            )
        })
        if(this.props.loading)
            order= <Spinner />
        return (
            <div>
                {order} 
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder: (token, userId) => dispatch(actionypes.fetchOrders(token, userId))
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
