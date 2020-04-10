This is my basic project using `NodeJS`, `MongoDB` and `Material-css`

To run you can use your local mongodb with defaults, and it will start or you
can setup online instance many pass available for free.

Please copy env-sample to .env and modify your configuration.

Run follwoing commands to setup
`> yarn install`

## To populate data

Essential database required table has be put in populatedb script, which adds
all city, states and currency information. Please replace mongodb_url with your
db urls.

```
> node populateDB mongodb_url
```

## To start

`yarn start`

You can browser localhost:3000 to see.

The concept is create a simple account system, for people to add their
accounting information in system. We are not focused to any company but it is
simple General Accounting. I have decided to create following and indication is
before them that what is done and what is left to do.

- Login - done
- Authentication - done
- Profile Edit - done
- Forget password - done
- Accounts - DOING
- Sales (invoicing)
- Purchase
- Voucher
- Receipts
- Trial Balance
- Balance Sheet

## Account

Each account is of 7 digits where I consider two major types Balance Sheet
Accounts and Income Statement. Following are different account in both
categories. Idea is you can as many sub accounts as you want they will be from
main accounts codes.

### Current Assets

- 10100 Bankking
- 10200 Cash Payroll checking
- 10500 Petty Cash Fund
- 12100 Accounts Receivable
- 12500 Allowance for Doubtful Accounts
- 13100 inventory
- 14100 Suppliers
- 15300 Perpaid Insurance

### Property, Plant and equipment

- 17000 Land
- 17100 Buildings
- 17300 Equipment
- 17800 Vehicles
- 18100 Accumulated Depreciation - Buildings
- 18300 Accumulated Depression - Equipment
- 18800 Accumulated Deprecision - Vehicles

### Current Libability

- 20140 Notes Pyable
- 21000 Accounts Payable
- 22100 Wages Payable
- 23100 Interest Payable
- 24500 Unearned Revenue

### Long-term Libabilities

- 25100 Mortgage
- 25600 Bonds Payable
- 25650 Discount on Bonds Payable.

### Stockholders' Equity (account numbers 27000 - 29999)

- 2710 Common Stock, No Par
- 27500 Retained Earnings
- 29500 Treasury Stock

### Operating Revenues (account numbers 30000 - 39999)

- 31000 Sales - Division #1, Product Line 010
- 31022 Sales - Division #1, Product Line 022

### Cost of Goods Sold (account numbers 40000 - 49999)

- 41010 COGS - Division #1, Product Line 010
- 41022 COGS - Division #1, Product Line 022
- 42019 COGS - Division #2, Product Line 015
- 43110 COGS - Division #3, Product Line 110

### Marketing Expenses (account numbers 50000 - 50999)

- 50100 Marketing Dept. Salaries
- 50150 Marketing Dept. Payroll Taxes
- 50200 Marketing Dept. Supplies
- 50600 Marketing Dept. Telephone

### Payroll Dept. Expenses (account numbers 59000 - 59999)

- 59100 Payroll Dept. Salaries
- 59150 Payroll Dept. Payroll Taxes
- 59200 Payroll Dept. Supplies
- 59600 Payroll Dept. Telephone

### Other (account numbers 90000 - 99999)

- 91800 Gain on Sale of Assets
- 96100 Loss on Sale of Assets

### Operating Expenses

- 71000 Non Operating Revenues and Gains
- 750000 Non-operatin expenses and losses.
  Number is autmatically generated on basis of selection of account type.
