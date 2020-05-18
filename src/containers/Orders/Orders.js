import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner'

import { connect } from "react-redux";
import * as actionypes from '../../store/actions/index'

class Orders extends Component {
    state ={
        order: [],
        loading: true
    }
    componentDidMount(){
        this.props.onFetchOrder()
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
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder: () => dispatch(actionypes.fetchOrders())
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
