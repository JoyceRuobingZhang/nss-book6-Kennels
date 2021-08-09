import React, {useEffect, useContext} from 'react'
import { CustomerContext } from './CustomerProvider'
import "./Customer.css"

export const CustomerList = () => {

const {customers, getCustomers} = useContext(CustomerContext)

useEffect(() => getCustomers(), [])

return (
 <section className="customers">
    {customers.map(customer => {
        return (
            <div className="customer" id={`customer--${customer.id}`}>
                <div className="customer_name">
                    Customer Name: {customer.name}
                </div>
                <div className="customer_address">
                    Customer Name: {customer.address}
                </div>
            </div>
        )
    })}
 </section>
)
}