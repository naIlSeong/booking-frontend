module.exports = {
  client: {
    tagName: "gql",
    includes: ["./src/**/*.tsx"],
    service: {
      name: "booking-api",
      url: "http://127.0.0.1:3333/graphql",
    },
  },
};
