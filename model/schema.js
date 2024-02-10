import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const schema = appSchema({
  version: 3,
  tables: [
    tableSchema({
      name: "locals",
      columns: [
        { name: "my_id", type: "string", isIndexed: true }, // indexed means that we can search the column based on the title
        { name: "name", type: "string", isIndexed: true }, // indexed means that we can search the column based on the title
        { name: "local_id", type: "number" },
        { name: "language_id", type: "number" },
      ],
    }),
  ],
});
