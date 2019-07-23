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

    if(baseRefName === "master") {
        await graphql(`
        mutation {
            addComment(input: {
                subjectId: "${id}",
                body: "👋\n Merci de changer la branche cible de \`master\` vers \`dev\`"
              }) {
                clientMutationId
              }
}
`)
    }
}

main()