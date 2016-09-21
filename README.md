# Yagi API Wrapper
Easy to use NodeJS API wrapper with minimum configuration required. This package brings validations, error handling, default parameters injection and entity classes. It also enables the developer to use Yagi's development environment.

### What is Yagi?
Yagi Payments by Flap is a simple, secure and certified e-commerce solution backed by well-named companies. It provides a RESTFul API and multiple payment options. To know more about Yagi, visit [Yagi homepage](https://yagi.com.mx/).

## Initialization and configuration


## Token based Payments

### Client
#### Create a new Client
#### Get previously created Client
#### Store a new Card for a created Client

### Card
#### Store a new credit/debit Card
#### Get previously created Card
#### Process Transaction with a previously stored Card

### Transaction (payment)
#### Process Transaction
#### Get previously processed Transaction
#### Check if an Object is ready to be processed


## Direct Payments

## 3D Secure Payments

## Examples

### What to expect of this package?
This package is currently Work In Progress. I'll be updating it as fast as possible. Today's plan for this package:
* Full Yagi API implementation
    * ~~Token based Payments~~ Done
    * Direct Payments
    * 3D Secure Payments
* Beautiful documentation
* Dependency-free
    * Remove request.js
    * Remove validate.js
* Promisify-tion prepared
* Language configuration
* Spanish documentation