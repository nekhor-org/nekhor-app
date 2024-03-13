import { Model } from "@nozbe/watermelondb";
import { field, text } from "@nozbe/watermelondb/decorators";

export class Country extends Model {
  static table = "countries"; // bind the model to specific table
  // @ts-ignore
  @text("my_id") myId; // binds a table column to a model property
  @text("content") content; // binds a table column to a model property
  // @ts-ignore
  @field("local_id") localId; // for non-text fields you the "field" decorator
  @field("language_id") languageId; // for non-text fields you the "field" decorator
}
