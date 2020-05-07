import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner'
class Orders extends Component {
    state ={
        order: [],
        loading: true
    }
    componentDidMount(){
        axios.get('/orders.json').then((result) => {
            const fetchdata= []
            for (let key in result.data){
                fetchdata.push({
                    ...result.data[key],
                    id: key
                })
            }
            console.log(fetchdata)
            this.setState({loading: false, order: fetchdata})
        }).catch((err) => {
            this.setState({loading: false})
            
        });
    }
     
    render() {
        let order = this.state.order.map(o => {
            return (
                <Order 
                    key={o.id}
                    ingredients={o.ingredients}
                    price={o.price}
                    />
            )
        })
        if(this.state.loading)
            order= <Spinner />
        return (
            <div>
                {order} 
            </div>
        );
    }
}

export default  withErrorHandler(Orders, axios);
