import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const schema = appSchema({
  version: 13,
  tables: [
    tableSchema({
      name: "locals",
      columns: [
        { name: "my_id", type: "number", isIndexed: true }, // indexed means that we can search the column based on the title
        { name: "name", type: "string", isIndexed: true }, // indexed means that we can search the column based on the title
        { name: "local_id", type: "number" },
        { name: "language_id", type: "number" },
      ],
    }),
    tableSchema({
      name: "homes",
      columns: [
        { name: "my_id", type: "number", isIndexed: true }, // indexed means that we can search the column based on the title
        { name: "carousel", type: "string", isIndexed: true }, // indexed means that we can search the column based on the title
        { name: "content", type: "string", isIndexed: true }, // indexed means that we can search the column based on the title
        { name: "language_id", type: "number" },
      ],
    }),
    tableSchema({
      name: "itineraries",
      columns: [
        { name: "my_id", type: "number", isIndexed: true }, // indexed means that we can search the column based on the title
        { name: "content", type: "string", isIndexed: true }, // indexed means that we can search the column based on the title
        { name: "language_id", type: "number" },
      ],
    }),
    tableSchema({
      name: "languages",
      columns: [
        { name: "my_id", type: "number", isIndexed: true }, // indexed means that we can search the column based on the title
        { name: "content", type: "string", isIndexed: true }, // indexed means that we can search the column based on the title
      ],
    }),
    tableSchema({
      name: "posts",
      columns: [
        { name: "my_id", type: "number", isIndexed: true }, // indexed means that we can search the column based on the title
        { name: "content", type: "string", isIndexed: true }, // indexed means that we can search the column based on the title
        { name: "post_id", type: "number" },
        { name: "country_id", type: "number" },
        { name: "local_id", type: "number" },
        { name: "language_id", type: "number" },
      ],
    }),
    tableSchema({
      name: "countries",
      columns: [
        { name: "my_id", type: "number", isIndexed: true }, // indexed means that we can search the column based on the title
        { name: "content", type: "string", isIndexed: true }, // indexed means that we can search the column based on the title
        { name: "local_id", type: "number" },
        { name: "language_id", type: "number" },
      ],
    }),
  ],
});
