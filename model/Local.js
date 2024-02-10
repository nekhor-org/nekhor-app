import { Model } from "@nozbe/watermelondb";
import { field, text } from "@nozbe/watermelondb/decorators";

export class Local extends Model {
  static table = "locals"; // bind the model to specific table
  // @ts-ignore
  @text("my_id") myId; // binds a table column to a model property
  @text("name") name; // binds a table column to a model property
  // @ts-ignore
  @field("local_id") localId; // for non-text fields you the "field" decorator
  @field("language_id") languageId; // for non-text fields you the "field" decorator
}
