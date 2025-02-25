const bcrypt = require("bcryptjs");
const { User } = require("../models"); // Adjust the path based on your project structure

async function createAdmin() {
    const hashedPassword = await bcrypt.hash("Admin_123", 10); // 10 is the salt rounds
    const adminUser = {
        email: "apalalamichhane13579@gmail.com",
        password: hashedPassword, // Store the hashed password
        role: "admin"
    };

    try {
        const existingAdmin = await User.findOne({ where: { email: adminUser.email } });
        if (existingAdmin) {
            console.log("Admin already exists.");
            return;
        }

        await User.create(adminUser);
        console.log("Admin created with hashed password:", hashedPassword);
    } catch (error) {
        console.error("Error creating admin:", error);
    }
}

createAdmin().catch(console.error);
