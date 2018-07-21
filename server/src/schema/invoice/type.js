const type = `
  type Invoice {
    id: ID
    client: Client!
    number: String
    date: String
    paid: Boolean
    customer: String
    email: String
    site: String
    cost: String
    labour: String
    airmover: String
    rows: [Row]!
  }

  input CreateInvoiceInput {
    client: ID!
    number: String
    date: String
    paid: Boolean
    customer: String
    email: String
    site: String
    cost: String
    labour: String
    airmover: String
  }

  input UpdateInvoiceInput {
    id: ID!
    number: String
    date: String
    paid: Boolean
    customer: String
    email: String
    site: String
    cost: String
    labour: String
    airmover: String
  }

  input DestroyInvoiceInput {
    id: ID!
  }
`

const typeQuery = `
  invoice(id: ID): Invoice
  invoices(first: Int, skip: Int): [Invoice]!
`

const typeMutation = `
  createInvoice(input: CreateInvoiceInput!): Invoice!
  updateInvoice(input: UpdateInvoiceInput!): Invoice!
  destroyInvoice(input: DestroyInvoiceInput!): Invoice!
`

module.exports = {
  type,
  typeQuery,
  typeMutation
}
