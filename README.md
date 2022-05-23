# HandCheck 🤝

All in one tool for collecting money from customers.  HandCheck will help users to create e-commerce stores , crowdfunding pages and other online businesses using  Rapyd’s Hosted Checkout Toolkit

## Inspiration

HandCheck is inspired from many other tools that are available for collecting money from customers. For example Shopify for E-commerce,  GoFundMe for crowdfunding, and others. But HandCheck is not a one-size-fits-all tool. It is a tool that can be used for any kind of business.

## What it does

Currently HandCheck is in pre-alpha version. Theses are the features that HandCheck is currently having:

- Create Ecommerce stores with Fast Checkout, Cart Checkout and Email Checkout 
- Create Crowdfunding page

_Note: All checkout features are using `Rapyd` Embedded checkout form_

## How we built it

We built HandCheck using following technologies:

- Next.js 
- Rapyd Embedded Checkout Form
- Tailwind CSS
- Ant Design
- Postgres
- Prisma

## Challenges we ran into

We ran into following challenges while building HandCheck:

- CSS issues with Rapyd Iframe not suitable for our mobile design

## Accomplishments that we're proud of

So far we're proud of:

1. Email Checkout
    - Storefront Admin can send email to customers to pay for their order
    - This feature is good for telephonic order
2. Fast Checkout
    - Customers can pay for their order in a few seconds without redirecting to payment page
3. Crowdfunding page
    - HandCheck user can create crowdfunding page to collect money from customers like GoFundMe or Buy Me a Coffee.


## What we learned

We learned a lot while building HandCheck. 

- We learned how to use `next.js` and `prisma` to build a serverless app.
- We learned how to use `rapyd` to build embedded checkout form with few lines of code.


## What's next for HandCheck

Next steps for HandCheck:

- Add more features and customizations for HandCheck Storefront page
- Fix CSS issues and mobile design
- Add more features for Crowdfunding page like real-time communication with author
- Notify customers when their order is paid and order status is updated
- Fix current security and privacy issues