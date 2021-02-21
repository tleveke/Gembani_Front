// src/server.js
import { createServer, Model, JSONAPISerializer } from "miragejs"


const ApplicationSerializer = JSONAPISerializer.extend({
  keyForAttribute(attr, resource) {
    return attr
  }


})


export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,
    serializers: {
      application: ApplicationSerializer,
    },
    models: {
      user: Model,
      company: Model,
      token: Model
    },

    seeds(server) {
      server.create("user", { first_name: "Nick", last_name: "Stock", email: "nick@gembani.com" })
      server.create("user",{ first_name: "Tom", last_name: "Stock", email: "tom@gembani.com" })
      server.create("company", { name: "Gembani" })

    },

    routes() {
      this.namespace = "api"

      this.get("/users", (schema) => {
        return schema.users.all()
      })
      this.get("/companies", (schema) => {
        return schema.companies.all()
      })

      this.post('/users');
      this.patch('/users/:id');
      this.post('/tokens',  (schema) => {
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        return schema.tokens.create({authState: {token: "HelloWorld", expiresIn: 3600 }})

      })
      this.post('/companies');
    },
  })

  return server
}
