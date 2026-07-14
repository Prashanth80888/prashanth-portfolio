import { Request, Response } from "express";
import Contact from "../models/Contact";
import {
  sendContactNotification,
  sendThankYouEmail,
} from "../services/emailService";

export const createContact = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      email,
      subject,
      message,
    } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, Email and Message are required.",
      });
    }

    // Save to MongoDB
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // Send notification email to you
    await sendContactNotification({
      name,
      email,
      subject: subject || "No Subject",
      message,
    });

    // Send thank-you email to visitor
    await sendThankYouEmail({
      name,
      email,
    });

    res.status(201).json({
      success: true,
      message: "Message submitted successfully.",
      data: contact,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export const getContacts = async (
  req: Request,
  res: Response
) => {
  try {
    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      messages: contacts,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: "Unable to fetch contacts.",
    });
  }
};