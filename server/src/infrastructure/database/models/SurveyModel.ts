import mongoose, { Schema } from "mongoose";

interface SurveySchemaType {
  surveyId: string;
  name: string;
  gender: string;
  nationality: string;
  email: string;
  phoneNumber: string;
  address: string;
  message: string;
  attachmentUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const surveySchema = new Schema<SurveySchemaType>(
  {
    surveyId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      required: true,
      trim: true,
    },

    nationality: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    attachmentUrl: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);


export const SurveyModel = mongoose.model<SurveySchemaType>(
  "Survey",
  surveySchema
);