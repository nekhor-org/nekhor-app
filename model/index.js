import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import { Local } from "./Local";
import { schema } from "./schema";

const adapter = new SQLiteAdapter({
  schema,
  jsi: true /* enable if Platform.OS === 'ios' */,
});

export const database = new Database({
  adapter,
  modelClasses: [Local],
});
