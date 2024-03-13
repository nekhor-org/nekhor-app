import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import { Local } from "./Local";
import { Home } from "./Home";
import { schema } from "./schema";
import { Post } from "./Post";
import { Country } from "./Country";

const adapter = new SQLiteAdapter({
  schema,
  jsi: true /* enable if Platform.OS === 'ios' */,
});

export const database = new Database({
  adapter,
  modelClasses: [Local, Home, Post, Country],
});
