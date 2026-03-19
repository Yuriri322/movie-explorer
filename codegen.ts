import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "schema.graphql",
  generates: {
    "bff/src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
    "ui/src/generated/graphql.ts": {
      documents: "ui/src/graphql/**/*.graphql",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
