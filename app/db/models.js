import { mongoose } from "mongoose";

const { Schema } = mongoose;

const snippetSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: [3, "That's too short"],
  },
  language: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
  },
});

export const models = [
  {
    name: "Snippet",
    schema: snippetSchema,
    collection: "Snippets",
  },
];
