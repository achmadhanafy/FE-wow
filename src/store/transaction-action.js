import { API } from "../config/api"
import { transactionActions } from "./transaction-slice"

export const getTransactions = (data) =>{
    return async(dispatch) =>{
        try {
            const config = {
                headers:{
                    "Content-type":"application/json",
                }
            }
            const body = JSON.stringify(data)
            const response = await API.post('/transactions',body,config)

            dispatch(
                transactionActions.setTransaction({
                    transaction: response.data.data.transaction
                })
            )
            
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const updateTransaction = (id,data) =>{
    return async(dispatch) =>{
        try {
            const config = {
              headers: {
                  "Content-type": "application/json",
                },
            }
  
            const body = JSON.stringify(data) 
  
            const response = await API.patch(`/transaction/${id}`,body,config)
            dispatch(
                transactionActions.setActive({
                    active:id
                })
            )
            console.log(response)
            return response
            
        } catch (error) {
            console.log(error)
        }
    }
}
