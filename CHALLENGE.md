# Ophelos Software Engineer: Take Home (v2)

An Income & Expenditure (I&E) statement is a document to help understand
someone’s financial situation. It summarises the following:

- Income
- Expenditure
- Debt

## Your challenge

Build a web application that steps a customer through an I&E statement and
calculates their disposable income and I&E rating.

Disposable income is calculated with the formula `D = income - expenditure`

The I&E rating is determined by calculating the ratio
`Ratio = expenditure / income` and then determining the rating based on the
following table:

| Ratio     | Grade |
| --------- | ----- |
| Below 10% | A     |
| 10% - 30% | B     |
| 30% - 50% | C     |
| Otherwise | D     |

### Requirements:

The web app should:

- Display a form for the customer to create an I&E statement.
  - Add at least minimal styling
- Store the I&E statement in a database (doesn’t need to be fancy, a local
  database is fine).
  - Implementing authentication is optional, as long as there is a way to know
    which customer each I&E statement belongs to
- Calculate and display the disposable income and I&E rating
- [Mid-Senior] Allow a customer to submit multiple I&E statements so they can
  report it monthly
- [Senior] Show previously submitted statements for a customer

The code should be tested. Feel free to include any extra features.

We expect this task to take 2 hours, however if you have not built a server from
scratch before you may need to spend more time to learn how to do that. You may
use any frameworks and third-party libraries you like. Send your solution to us
as a zip file or by providing a link to a repository we can access. Include a
README file with instructions on how to run the web app locally, and a brief
description of your thought process and any improvements you would make.

## Reference

Example I&E statement:

| Income | Amount | Expenditure       | Amount |
| ------ | ------ | ----------------- | ------ |
| Salary | 2800   | Mortgage          | 500    |
| Other  | 300    | Rent              | –      |
|        |        | Utilities         | 100    |
|        |        | Travel            | 150    |
|        |        | Food              | 500    |
|        |        | **Debt payments** |        |
|        |        | Loans             | 1000   |
|        |        | Credit cards      | 400    |
|        |        | Other             | –      |
