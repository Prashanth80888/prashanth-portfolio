import { Request, Response } from "express";
import ResumeDownload from "../models/ResumeDownload";

export const downloadResume = async (
  req: Request,
  res: Response
) => {
  try {
    const userAgent = req.headers["user-agent"] || "";

    // Browser Detection
    let browser = "Unknown";

    if (userAgent.includes("Chrome")) browser = "Chrome";
    else if (userAgent.includes("Firefox")) browser = "Firefox";
    else if (userAgent.includes("Safari")) browser = "Safari";
    else if (userAgent.includes("Edge")) browser = "Edge";

    // Operating System Detection
    let os = "Unknown";

    if (userAgent.includes("Windows")) os = "Windows";
    else if (userAgent.includes("Mac")) os = "macOS";
    else if (userAgent.includes("Linux")) os = "Linux";
    else if (userAgent.includes("Android")) os = "Android";
    else if (userAgent.includes("iPhone")) os = "iOS";

    // Device Detection
    const device =
      /Mobile|Android|iPhone|iPad/i.test(userAgent)
        ? "Mobile"
        : "Desktop";

    // Get Visitor IP
    const ipAddress =
      req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
      req.socket.remoteAddress ||
      "Unknown";

    // Save Analytics
    await ResumeDownload.create({
      browser,
      os,
      device,
      resumeVersion: "v1.0",
      userAgent,
      ipAddress,
    });

    return res.status(200).json({
      success: true,
      message: "Resume download recorded successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to record resume download.",
    });
  }
};

export const getResumeStats = async (
  req: Request,
  res: Response
) => {
  try {
    const totalDownloads = await ResumeDownload.countDocuments();

    const latestDownloads = await ResumeDownload.find()
      .sort({ createdAt: -1 })
      .limit(10);

    return res.status(200).json({
      success: true,
      totalDownloads,
      latestDownloads,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch resume statistics.",
    });
  }
};