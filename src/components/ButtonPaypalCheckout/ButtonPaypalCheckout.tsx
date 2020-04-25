/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import styled from "styled-components";

const loadPaypalSDK = (currency: string) => {
  return new Promise((resolve, reject) => {
    const scriptTag = document.createElement("script");
    scriptTag.addEventListener("load", resolve);
    scriptTag.addEventListener("error", reject);
    scriptTag.src = `https://www.paypal.com/sdk/js?client-id=AasTy7GEmrE2-PCRHJtEVUSR83u2AJ0oo7N_DzR8y4tlsaP5fMw6BG4hWCFTp-1FHE7B2DbvCRDYc9GN&currency=${currency}`;
    document.body.append(scriptTag);
  });
};

export interface ICustomerData {
  firstName: string;
  lastName: string;
  items: { name: string; price: number }[];
  address: {
    street: string;
    city: string;
    postCode: string;
    countryCode: string;
  };
}

const StyledPaypalButton = styled.div`
  display: flex;
  justify-content: center;
  z-index: 2;
  width: 100%;
`;

interface IButtonPaypalCheckoutProps {
  currency?: "USD" | "EUR";
  onApprove?: (details: any) => void;
  data: ICustomerData;
}

class ButtonPaypalCheckout extends React.Component<IButtonPaypalCheckoutProps> {
  async componentDidMount() {
    const { currency, data: customerData, onApprove } = this.props;
    const price = customerData.items.reduce((acc, cur) => acc + cur.price, 0);

    await loadPaypalSDK(currency ?? "EUR");

    (window as any).paypal
      .Buttons({
        createOrder: function(data: any, actions: any) {
          return actions.order.create({
            purchase_units: [
              {
                payer: {
                  name: {
                    given_name: customerData.firstName,
                    surname: customerData.lastName
                  }
                },
                amount: {
                  value: price.toFixed(2),
                  breakdown: {
                    item_total: { value: price.toFixed(2), currency_code: currency ?? "EUR" }
                  }
                },
                items: customerData.items.map(({ name, price }) => ({
                  name,
                  unit_amount: { value: price.toFixed(2), currency_code: currency ?? "EUR" },
                  quantity: "1"
                })),
                shipping: {
                  address: {
                    address_line_1: customerData.address.street,
                    admin_area_2: customerData.address.city,
                    postal_code: customerData.address.postCode,
                    country_code: customerData.address.countryCode
                  }
                }
              }
            ]
          });
        },

        onApprove: function(data: any, actions: any) {
          return actions.order.capture().then(function(details: any) {
            if (onApprove) {
              onApprove(details);
            }
          });
        }
      })
      .render("#paypal-button-container");
  }
  render() {
    return <StyledPaypalButton id="paypal-button-container" />;
  }
}

export default ButtonPaypalCheckout;
