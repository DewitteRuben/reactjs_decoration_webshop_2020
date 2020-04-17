/* eslint-disable @typescript-eslint/camelcase */
import React from "react";

const loadPaypalSDK = () => {
  return new Promise((resolve, reject) => {
    const scriptTag = document.createElement("script");
    scriptTag.addEventListener("load", resolve);
    scriptTag.addEventListener("error", reject);
    scriptTag.src =
      "https://www.paypal.com/sdk/js?client-id=AasTy7GEmrE2-PCRHJtEVUSR83u2AJ0oo7N_DzR8y4tlsaP5fMw6BG4hWCFTp-1FHE7B2DbvCRDYc9GN";
    document.body.append(scriptTag);
  });
};

interface IButtonPaypalCheckoutProps {
  currency?: "USD" | "EUR";
  price: number;
}

class ButtonPaypalCheckout extends React.Component<IButtonPaypalCheckoutProps> {
  async componentDidMount() {
    const { currency, price } = this.props;

    await loadPaypalSDK();

    (window as any).paypal
      .Buttons({
        createOrder: function(data: any, actions: any) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: price.toFixed(2),
                  currency: currency || "EUR"
                }
              }
            ]
          });
        },

        onApprove: function(data: any, actions: any) {
          return actions.order.capture().then(function(details: any) {
            alert("Transaction completed by " + details.payer.name.given_name + "!");
          });
        }
      })
      .render("#paypal-button-container");
  }
  render() {
    return <div id="paypal-button-container"></div>;
  }
}

export default ButtonPaypalCheckout;
