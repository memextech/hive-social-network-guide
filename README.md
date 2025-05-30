# Hive Social Network Example App

An app with comprehensive Memex rules for building social network applications on top of the Hive blockchain. This repository contains both practical documentation and a fully functional Next.js application demonstrating Hive integration.

## 🌐 Live Demo

**[View Live App →](https://hive-social-app.vercel.app/)**

![Hive Social App Preview](https://github.com/user-attachments/assets/hive-social-preview.png)

## 📁 Project Structure

```
ecency_hive_vision_docs/
├── .memex/
│   └── rules.md              # Focused development guide
├── docs/
│   └── ecency_hive_documentation.md  # Comprehensive ecosystem documentation
├── hive-social-app/          # Working Next.js application (MAIN APP)
└── tasks/                    # Project task tracking
```

## 🚀 Working Application

The main deliverable is **`hive-social-app/`** - a production-ready Next.js application that demonstrates:

### ✨ Features
- **Real-time Hive Integration**: Fetches trending posts directly from Hive blockchain
- **Responsive Design**: Built with Tailwind CSS 4
- **Post Cards**: Displays author, votes, comments, tags, and content previews
- **Error Handling**: Graceful API failure management
- **No Authentication Required**: Read-only operations showcase Hive's openness

### 🛠️ Tech Stack
- **Next.js 15.3.3** with App Router
- **React 19** 
- **TypeScript**
- **Tailwind CSS 4**
- **@hiveio/dhive 1.3.2** for Hive blockchain integration

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18.17+ (tested with 23.10.0)
- npm 9+ (tested with 10.9.2)

### Run the Working App

```bash
# Clone the repository
git clone https://github.com/memextech/hive-social-network-guide.git
cd hive-social-network-guide/hive-social-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📚 Documentation

### 🎯 [Development Guide](/.memex/rules.md)
Focused, practical documentation for building Hive applications:
- Installation and setup instructions
- Hive integration patterns
- Code examples from production apps (Ecency Vision-Next)
- Authentication and transaction patterns
- Common issues and solutions

### 📖 [Comprehensive Documentation](/docs/ecency_hive_documentation.md)
In-depth overview of the Hive/Ecency ecosystem:
- Understanding Hive blockchain architecture
- Ecency platform components
- Repository analysis and relationships
- Developer resources and SDKs

## 🔗 Hive Integration Overview

This project demonstrates connecting to Hive using multiple public API nodes:

```typescript
import { Client } from '@hiveio/dhive'

export const hiveClient = new Client([
  'https://api.hive.blog',        // Primary public node
  'https://api.hivekings.com',    // Backup node  
  'https://anyx.io',              // Additional backup
])
```

### Current Capabilities (Read-Only)
- ✅ Browse posts by tag/community
- ✅ View post content and metadata  
- ✅ See vote counts and comment counts
- ✅ Get user profile information
- ✅ Filter and sort content
- ✅ No API keys or authentication needed

### For Write Operations (Voting, Posting, etc.)
The documentation includes patterns from Ecency's production codebase showing how to implement:
- User authentication (Hivesigner, Keychain, Private Keys)
- Voting and upvoting
- Commenting system
- Following/unfollowing users
- Wallet and key management

## 🌍 Deployment

The working app is deployed on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/memextech/hive-social-network-guide&project-directory=hive-social-app)

## 📖 Learning Path

1. **Start with the [Development Guide](/.memex/rules.md)** for practical implementation
2. **Run the working app** to see Hive integration in action
3. **Study the code** in `hive-social-app/` for real examples
4. **Reference the [Comprehensive Docs](/docs/ecency_hive_documentation.md)** for deeper understanding
5. **Follow GitHub links** to production code examples from Ecency

## 🎯 Use Cases

This repository is perfect for:

- **Developers** building social apps on Hive
- **Learning** how to integrate with blockchain-based social networks
- **Understanding** the Ecency ecosystem and architecture
- **Reference** for production-ready Hive development patterns
- **Starting point** for your own Hive-based applications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Related Links

- **Live App**: https://hive-social-app.vercel.app/
- **Hive Blockchain**: https://hive.io/
- **Hive Developer Portal**: https://developers.hive.io/
- **Ecency**: https://ecency.com/
- **Ecency Vision-Next (Reference)**: https://github.com/ecency/vision-next
- **@hiveio/dhive Documentation**: https://gitlab.syncad.com/hive/dhive

---

Built with ❤️ using [Hive](https://hive.io/), [Next.js](https://nextjs.org/), and insights from [Ecency](https://ecency.com/)
