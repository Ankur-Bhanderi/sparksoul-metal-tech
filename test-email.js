fetch("http://localhost:5000/api/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ 
    name: "Test User 3", 
    email: `test.otp.sparksoul${Date.now()}@mailinator.com`, 
    password: "Password123!", 
    phone: "1234567890", 
    company: "Test Company" 
  })
})
.then(res => res.json())
.then(data => console.log("Response:", data))
.catch(err => console.error("Fetch Error:", err));
