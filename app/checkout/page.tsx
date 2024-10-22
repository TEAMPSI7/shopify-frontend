"use client"
import Button from '@/components/common/Button'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import React from 'react'
import axios from 'axios'
import store from '@/store/store'

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const Page = () => {
    const paypalCreateOrder = async () => {
        try {
          let response = await axios.post(`${baseUrl}/paypal/createorder`, {
            user_id: 1,
            order_price: 100
          })
          console.log("RESPONSE ", response.data)
          return response.data.data.order.order_id
        } catch (err) {
          // Your custom code to show an error like showing a toast:
          // toast.error('Some Error Occured')
          return null
        }
    }

    const paypalCaptureOrder = async (orderID: string) => {
        try {
          let response = await axios.post('/api/paypal/captureorder', {
            orderID
          })
          if (response.data.success) {
            // Order is successful
            // Your custom code
    
            // Like showing a success toast:
            // toast.success('Amount Added to Wallet')
    
            // And/Or Adding Balance to Redux Wallet
            // dispatch(setWalletBalance({ balance: response.data.data.wallet.balance }))
            return true
          }
        } catch (err) {
          // Order is not successful
          // Your custom code
    
          // Like showing an error toast
          // toast.error('Some Error Occured')
          return false
        }
    }
    return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <h1>Checkout</h1>
        <PayPalScriptProvider
            options={{
              clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
              currency: 'USD',
              intent: 'capture'
            }}
          >
            <PayPalButtons
              style={{
                color: 'gold',
                shape: 'rect',
                label: 'pay',
                height: 50
              }}
              
              createOrder={async (data, actions) => {
                let order_id = await paypalCreateOrder()
                return order_id + ''
              }}
              onApprove={async (data, actions) => {
                let response = await paypalCaptureOrder(data.orderID)
                if (response) {
                  // Handle success, e.g., show a success message
                  console.log('Order captured successfully')
                }
                // No return statement needed
              }}
              onCancel={() => {
                console.log('Payment cancelled')
              }}
              onError={(err) => {
                console.log('Error occurred:', err)
              }}
            />
          </PayPalScriptProvider>
        <Button text="Checkout" linkString="/" />
    </div>
    )
}

export default Page
