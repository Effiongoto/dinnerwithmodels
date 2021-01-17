import React from 'react';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';

const SubscriptionScreen = () => {
  return (
    <FormContainer>
      <h3>Subscription for access to all models private pictures and videos</h3>
      <a
        href='https://paystack.com/pay/hyu87qs93x'
        className='btn-block my-2'
        role='button'
      >
        Pay Now
      </a>
      <Message className='my-2'>
        Please make sure you fill in the same Email Address used to sign up
      </Message>
    </FormContainer>
  );
};

export default SubscriptionScreen;
