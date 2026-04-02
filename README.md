# Nominee Vault 🛡️

**Nominee Vault** (VaultLife) is a premium, high-security digital life vault designed to ensure that your digital assets, documents, and legacy reach your loved ones safely. It combines proactive presence verification with a secure nominee management system to automate the transfer of access when it matters most.

---
<img width="1892" height="889" alt="image" src="https://github.com/user-attachments/assets/7b42334f-7396-4799-a1f8-0ca29883b262" />


## 🌟 Key Features

- **Trusted Circle Management**: Add trusted family members or friends as Nominees. Assign specific roles like **Viewer** for read-only access or **Executor** for asset management.
- **Proactive Verification**: The system periodically checks in on you (monthly, quarterly, or bi-annually) to confirm your presence.
- **Smart Escalation**: If you're unreachable, the vault follows a strict escalation protocol:
  - **Stage 1**: Email and Push reminders.
  - **Stage 2**: Direct phone contact.
  - **Stage 3**: Primary nominee outreach for verification.
- **Secure Vaulting**: Industrial-grade security for your files and sensitive information.
- **Audit Logs**: Maintain a transparent, immutable history of all verification attempts and access requests.
- **Modern UI/UX**: A clean, "utility-first" light-themed interface focused on clarity, trust, and ease of use.

## 🚀 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS (Custom Utility System)

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm / yarn / pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/nominee-vault.git
   cd nominee-vault
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/nominee_vault"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Initialize Database**:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📁 Project Structure

- `src/app/`: Next.js App Router pages and layouts.
- `src/components/`: Reusable UI components.
- `src/api/`: API routes for nominees, verification, and assets.
- `prisma/`: Database schema and migrations.
- `public/`: Static assets and images.

---

## 🛡️ Security & Privacy

Nominee Vault is built with a "Privacy First" approach. Your data is encrypted at rest, and nominee access is only granted after a rigorous multi-stage verification process and a predefined "waiting period" to prevent unauthorized access.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ for a secure future.
</p>
