const graphql = require('@octokit/graphql').defaults({
    headers: {
        authorization: `token ${process.env.GITHUB_PERSONAL_TOKEN}`
      }
})

async function main() {
    const { repository: {pullRequest:{id, baseRefName}} } = await graphql(`
        {
  repository(owner: "jean-smaug", name: "condorcet") {
    pullRequest(number: 111) {
      id
      baseRefName
    }
  }
}
`)

    if(baseRefName !== "dev") {
        await graphql(`
        mutation {
            addComment(input: {
                subjectId: "${id}",
                body: "salut les gens \n fezfz"
              }) {
                clientMutationId
              }
}
`)
    }
}

main()