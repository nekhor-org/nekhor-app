import { Model } from "@nozbe/watermelondb";
import { field, text } from "@nozbe/watermelondb/decorators";

export class Itinerary extends Model {
  static table = "itineraries"; // bind the model to specific table
  // @ts-ignore
  @text("my_id") myId; // binds a table column to a model property
  @text("content") content; // binds a table column to a model property
  // @ts-ignore
  @field("language_id") languageId; // for non-text fields you the "field" decorator
}
