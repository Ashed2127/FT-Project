// import Chapa from 'chapa'

// let myChapa = new Chapa('Your_Chapa_Api_Key');

//  const customerInfo =  {
//     amount: '250',
//     currency: 'ETB',
//     email: 'abebe@bikila.com',
//     first_name: 'Abebe',
//     last_name: 'Bikila',
//     return_url: 'http://localhost:8082/',
//     // tx_ref: 'tx-x12345', // if autoRef is set in the options we dont't need to provide reference, instead it will generate it for us
//     callback_url: 'https://chapa.co', // your callback URL
//     customization: {
//         title: 'I love e-commerce',
//         description: 'It is time to pay'
//     }
// }

// myChapa.initialize(customerInfo, { autoRef: true }).then(response => {
//     /*
//     response:
//       {
//         message: 'Hosted Link',
//         status: 'success' || 'failed',
//         data: {
//           checkout_url: 'https://checkout.chapa.co/checkout/payment/:token'
//         },
//         tx_ref: 'generated-token' // this will be the auto generated reference
//       }
//     */
//     console.log(response)
//     // saveReference(response.tx_ref)
// }).catch(e => console.log(e)) // catch errors

// // async/await
// let responsed = await myChapa.initialize(customerInfo, { autoRef: true })

// myChapa.verify('txn-reference').then(response => {
//     console.log(response) // if success
// }).catch(e => console.log(e)) // catch errors

// // async/await
// let response = await myChapa.verify('txn-reference')
