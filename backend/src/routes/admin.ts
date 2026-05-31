import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// In a real app, you should add a middleware here to verify JWT and check if user.role === 'ADMIN'

// ========================
// PRODUCTS
// ========================
router.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.post("/products", async (req, res) => {
  try {
    const { sku, name, description, imageUrl, categoryId, specs, isLive } = req.body;
    const product = await prisma.product.create({
      data: { sku, name, description, imageUrl, categoryId, specs, isLive: isLive ?? true }
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

router.put("/products/:id/live", async (req, res) => {
  try {
    const { id } = req.params;
    const { isLive } = req.body;
    const product = await prisma.product.update({
      where: { id },
      data: { isLive }
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product status" });
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id } });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// ========================
// CATEGORIES
// ========================
router.get("/categories", async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { name: "asc" }
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

router.post("/categories", async (req, res) => {
  try {
    const { name } = req.body;
    const category = await prisma.category.create({
      data: { name }
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to create category" });
  }
});

// ========================
// INQUIRIES
// ========================
router.get("/inquiries", async (req, res) => {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch inquiries" });
  }
});

router.put("/inquiries/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // e.g. "REVIEWED"
    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: { status }
    });
    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ error: "Failed to update inquiry status" });
  }
});

// ========================
// USERS
// ========================
router.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, company: true, phone: true, role: true, isVerified: true, createdAt: true },
      orderBy: { createdAt: "desc" }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.put("/users/:id/role", async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await prisma.user.update({
      where: { id },
      data: { role }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user role" });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, company } = req.body;
    const user = await prisma.user.update({
      where: { id },
      data: { name, email, company }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user details" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id } });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// ========================
// SETTINGS
// ========================
router.get("/settings", async (req, res) => {
  try {
    let setting = await prisma.setting.findUnique({ where: { id: "global" } });
    if (!setting) {
      setting = await prisma.setting.create({ data: { id: "global", smtpHost: "", smtpPort: 587, smtpEmail: "", smtpPassword: "" } });
    }
    res.json({ 
      smtpHost: setting.smtpHost,
      smtpPort: setting.smtpPort,
      smtpEmail: setting.smtpEmail, 
      hasPassword: !!setting.smtpPassword 
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

router.post("/settings", async (req, res) => {
  try {
    const { smtpHost, smtpPort, smtpEmail, smtpPassword } = req.body;
    const updateData: any = { smtpHost, smtpPort, smtpEmail };
    if (smtpPassword) {
      updateData.smtpPassword = smtpPassword;
    }
    
    const setting = await prisma.setting.upsert({
      where: { id: "global" },
      update: updateData,
      create: { id: "global", smtpHost, smtpPort, smtpEmail, smtpPassword }
    });
    
    res.json({ message: "Settings saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save settings" });
  }
});

export default router;
