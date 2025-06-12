import Chapa from "chapa";
import express from "express";
import axios from "axios";

const router = express.Router();
let checkoutUrl;
let transactionreference;
// Endpoint to handle webhook notifications from Chapa

export const bookResponseData = async (req, res) => {
  try {
    const user = req.body;
    const api_key = "Your_Chapa_Api_Key";

    const userData = {
      amount: user.amount,
      currency: user.currency,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      callback_url: "https://checkout.chapa.co/checkout/payment/:token",
      return_url: "http://localhost:8080/login",
      customization: {
        title: "I love e-commerce",
        description: "It is time to pay",
      },
    };

    const chapaResponse = new Chapa(api_key);
    const response = await chapaResponse.initialize(userData, {
      autoRef: true,
    });

    if (response.status === "success") {
      checkoutUrl = response.data;
      transactionreference = response.tx_ref;
      console.log(checkoutUrl);
      // console.log('initiate payment ', response);
      // Call getTransactionReference after responseData completes
      await getTransactionReference();

      // Return the checkout URL
      return res.status(200).json({ checkoutUrl });
    } else {
      return res.status(500).json({ error: "Payment initiation failed." });
    }
  } catch (error) {
    console.error("Error during payment initiation:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
async function getTransactionReference() {
  try {
    const url = `https://api.chapa.co/v1/transaction/verify/${transactionreference}`;
    const headers = {
      Authorization: "Bearer Your_Chapa_Api_Key",
    };

    const response = await axios.get(url, { headers });
    console.log("verify payment ", response.data);
    // console.log('trx reponse ', response);
    // Access data using .data
  } catch (error) {
    console.error(error);
  }
}

export const getBookCheckoutUrl = async (req, res) => {
  try {
    // Here, you would fetch the checkout URL from your database or some other source
    if (checkoutUrl) {
      return checkoutUrl; // Return the stored checkoutUrl
    } else {
      return res.status(404).json({ error: "Checkout URL not found." });
    }
  } catch (error) {
    console.error("Error fetching checkout URL:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};


export default router;
