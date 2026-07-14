import mongoose, { Schema, Document } from "mongoose";

export interface IResumeDownload extends Document {
  browser: string;
  os: string;
  device: string;
  resumeVersion: string;
  userAgent: string;
  ipAddress: string;
  downloadedAt: Date;
}

const ResumeDownloadSchema = new Schema<IResumeDownload>(
  {
    browser: {
      type: String,
      default: "Unknown",
    },

    os: {
      type: String,
      default: "Unknown",
    },

    device: {
      type: String,
      default: "Desktop",
    },

    resumeVersion: {
      type: String,
      default: "v1.0",
    },

    userAgent: {
      type: String,
      default: "",
    },

    ipAddress: {
      type: String,
      default: "",
    },

    downloadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IResumeDownload>(
  "ResumeDownload",
  ResumeDownloadSchema
);