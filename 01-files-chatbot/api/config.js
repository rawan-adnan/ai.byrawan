// بيرجّع الإعدادات الي بيحتاجها شكل الصفحة (الاسم، الترحيب، اللون). بدون أي شي سري.
const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  const c = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "config.json"), "utf8"));
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify({
    businessName: c.businessName,
    botName: c.botName,
    welcome: c.welcome,
    suggestions: c.suggestions || [],
    accentColor: c.accentColor,
    language: c.language || "ar",
  }));
};
