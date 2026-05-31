import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/inquiries
router.post("/", async (req, res) => {
  try {
    const { type, companyName, contactPerson, email, phone, country, message } = req.body;

    if (!companyName || !contactPerson || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        type: type || "General",
        companyName,
        contactPerson,
        email,
        phone: phone || "",
        country: country || "",
        message,
        status: "PENDING"
      }
    });

    res.status(201).json({ message: "Inquiry submitted successfully", inquiry });
  } catch (error) {
    console.error("Inquiry Submission Error:", error);
    res.status(500).json({ error: "Failed to submit inquiry" });
  }
});

// GET /api/inquiries (Admin only ideally, but we can secure it later or rely on existing admin router for the frontend)
router.get("/", async (req, res) => {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json(inquiries);
  } catch (error) {
    console.error("Fetch Inquiries Error:", error);
    res.status(500).json({ error: "Failed to fetch inquiries" });
  }
});

export default router;
