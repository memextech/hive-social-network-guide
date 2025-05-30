# Comprehensive Guide to Hive, Ecency, and Vision-Next

This document provides a comprehensive overview of the Hive blockchain, the Ecency social media platform, and its related development components, including Vision-Next. It is intended for developers and agents looking to understand and work within this ecosystem.

## Table of Contents

1.  [Introduction to the Hive/Ecency Ecosystem](#1-introduction-to-the-hiveecency-ecosystem)
    *   [1.1 What is Hive?](#11-what-is-hive)
    *   [1.2 What is Ecency?](#12-what-is-ecency)
    *   [1.3 How Hive and Ecency Work Together](#13-how-hive-and-ecency-work-together)
2.  [Core Technologies and Services](#2-core-technologies-and-services)
    *   [2.1 Hive Blockchain Infrastructure](#21-hive-blockchain-infrastructure)
    *   [2.2 Hivesigner](#22-hivesigner)
    *   [2.3 Search Functionality (`hive2elastic`)](#23-search-functionality-hive2elastic)
    *   [2.4 Content Rendering (`render-helper`)](#24-content-rendering-render-helper)
3.  [Ecency Applications](#3-ecency-applications)
    *   [3.1 Ecency Web (`vision-next`)](#31-ecency-web-vision-next)
    *   [3.2 Ecency Mobile (`ecency-mobile`)](#32-ecency-mobile-ecency-mobile)
    *   [3.3 Ecency API (`vision-api`)](#33-ecency-api-vision-api)
4.  [Developer Resources & SDKs](#4-developer-resources--sdks)
    *   [4.1 Ecency SDK (`@ecency/sdk`)](#41-ecency-sdk-ecencysdk)
    *   [4.2 Ecency Wallets (`@ecency/wallets`)](#42-ecency-wallets-ecencywallets)
    *   [4.3 General Development Guidelines](#43-general-development-guidelines)
5.  [Getting Started with Development](#5-getting-started-with-development)
    *   [5.1 Setting up a Development Environment](#51-setting-up-a-development-environment)
    *   [5.2 Understanding the Authentication Flow](#52-understanding-the-authentication-flow)
    *   [5.3 Interacting with the Hive Blockchain](#53-interacting-with-the-hive-blockchain)
6.  [Key Repositories Overview](#6-key-repositories-overview)

---

## 1. Introduction to the Hive/Ecency Ecosystem

### 1.1 What is Hive?

Hive is a decentralized, Delegated Proof-of-Stake (DPoS) blockchain originally forked from the Steem blockchain. It is designed to be a fast, scalable, and fee-less platform, particularly well-suited for social media applications and other Web3 use cases.

**Core Concepts:**

*   **Decentralization:** Governed by a community of stakeholders and block producers (witnesses).
*   **DPoS Consensus:** Token holders vote for witnesses who are responsible for creating blocks and maintaining the network.
*   **Social Focus:** Optimized for content creation, curation, and community building.
*   **Reward System:** Users can earn cryptocurrency (HIVE, Hive Backed Dollars - HBD) for creating and curating content.
*   **Usernames as Wallets:** Hive account names also serve as their wallet addresses, simplifying user experience.
*   **Resource Credits:** Transactions are "fee-less" in the traditional sense but consume "Resource Credits," which regenerate over time, preventing spam.

Hive aims to provide a robust and censorship-resistant platform for a wide array of decentralized applications (dApps).

### 1.2 What is Ecency?

Ecency (formerly Esteem) is a popular social media application built on top of the Hive blockchain. It provides a user-friendly interface for interacting with Hive, allowing users to publish content, engage with others, curate posts, and earn rewards.

**Philosophy:**

*   **Free Speech:** Leverages Hive's censorship-resistant nature.
*   **Decentralization:** Content and social graphs are stored on the Hive blockchain.
*   **User Rewards:** Facilitates earning HIVE and HBD through platform activity, and also offers Ecency Points which can be used for promoting content.

**Key Components:**

*   **Web Application:** The primary interface, currently `vision-next`.
*   **Mobile Applications:** For iOS and Android (`ecency-mobile`).
*   **Backend API:** Powers the applications (`vision-api`).

Ecency offers various features like communities, content discovery, notifications, wallet management, and more, aiming to be a comprehensive portal to the Hive ecosystem.

### 1.3 How Hive and Ecency Work Together

Ecency acts as a user-friendly frontend or "gateway" to the Hive blockchain.
*   When a user posts content, comments, or votes through Ecency, these actions are recorded as transactions on the Hive blockchain.
*   Ecency reads data directly from the Hive blockchain to display posts, comments, user profiles, and balances.
*   User authentication and transaction signing are typically handled via Hivesigner, a secure authentication tool for Hive.
*   Ecency enhances the Hive experience by providing additional features like its own points system, curated feeds, and a polished user interface.

Essentially, Hive provides the underlying decentralized infrastructure (database, consensus, and economic layer), while Ecency builds on top of it to deliver a feature-rich social media experience.

---

## 2. Core Technologies and Services

### 2.1 Hive Blockchain Infrastructure

*   **`hivemind`**: While not a repository cloned for this project, `hivemind` is a crucial Hive layer. It's a social media consensus layer that processes raw blockchain data from `steemd` (the core Hive node software) and stores it in a PostgreSQL database, making it easier to query for social media applications like Ecency. The `hive2elastic` tool (see below) likely interacts with a `hivemind` database.

### 2.2 Hivesigner

Hivesigner is a secure authentication service that allows users to interact with Hive-based applications without exposing their private keys directly to the application. It facilitates OAuth2-based authentication and transaction signing.

*   **Purpose:**
    *   Securely sign transactions on behalf of users.
    *   Allow users to grant specific permissions (e.g., posting, voting) to applications.
*   **Repositories:**
    *   `ecency/hivesigner-sdk`: A JavaScript SDK (TypeScript) for web developers to integrate Hivesigner into their applications. It supports Node.js and browser environments and provides methods for login, profile retrieval, voting, commenting, and other Hive operations.
        *   Key files: `src/` (source), `lib/` (compiled output), `README.md` (usage).
    *   `ecency/hivesigner-ui`: A Nuxt.js (Vue.js framework) project providing UI components for Hivesigner. This is likely used for the Hivesigner website itself or for embeddable UI elements.
        *   Key files: `src/` (Nuxt app structure), `nuxt.config.ts`, `README.md`.

### 2.3 Search Functionality (`hive2elastic`)

Ecency utilizes Elasticsearch to provide robust search capabilities. The `hive2elastic` tool is responsible for populating and maintaining the search index.

*   **`ecency/hive2elastic`**: A Python tool that synchronizes posts and comments from a Hive `hivemind` database to an Elasticsearch index.
    *   **Functionality:** Reads data from Hive's PostgreSQL database (populated by `hivemind`) and indexes it in Elasticsearch.
    *   **Setup:** Requires specific database functions and triggers to be created on the Hive database.
    *   **Configuration:** Via environment variables or command-line arguments (DB URL, ES URL, index name, etc.).
    *   Key files: `post/` (main scripts), `setup.py`, `README.md`.

### 2.4 Content Rendering (`render-helper`)

Ecency applications need to process and display user-generated content, which is often in Markdown format. The `render-helper` library handles this.

*   **`ecency/render-helper`**: A TypeScript library for rendering content within Ecency applications.
    *   **Features:**
        *   Custom Markdown to HTML and AMP (Accelerated Mobile Pages) conversion.
        *   Content summary extraction.
        *   Proxying image links (e.g., for security, caching, or resizing).
        *   Filtering embedded media.
        *   Internalizing links.
        *   XSS (Cross-Site Scripting) protection.
        *   Response caching.
    *   Key files: `src/` (source), `lib/` (compiled output), `README.md`.

---

## 3. Ecency Applications

### 3.1 Ecency Web (`vision-next`)

`vision-next` is the codebase for the current Ecency web application.

*   **Repository:** `ecency/vision-next`
*   **Technology Stack:** Next.js (React framework), TypeScript.
*   **Key Features:**
    *   Full-fledged social media interface for Hive.
    *   Integrates with Hivesigner for authentication and operations.
    *   Configurable via environment variables and a `vision-config.template.yml` (likely transformed to JSON).
*   **Development Setup:**
    *   Requires Node.js (`^18.17.x`) and `yarn`.
    *   Clone repository, install dependencies (`yarn`), copy `.env.template` to `.env` and configure.
*   **Deployment:**
    *   Can be deployed using Docker (`Dockerfile` and `docker-compose.yml` provided).
    *   Official image: `ecency/vision-next:latest`.
*   **Structure:**
    *   `src/`: Main application code (pages, components, services).
    *   `public/`: Static assets.
    *   `next.config.js`: Next.js configuration.
    *   `README.md`: Detailed setup and contribution guidelines.

### 3.2 Ecency Mobile (`ecency-mobile`)

`ecency-mobile` provides the native mobile experience for Ecency users on iOS and Android.

*   **Repository:** `ecency/ecency-mobile`
*   **Technology Stack:** React Native, TypeScript.
*   **Key Features:**
    *   Native app functionalities for browsing and interacting with Hive via Ecency.
    *   Uses Firebase for Android (e.g., push notifications, analytics).
    *   Integrates with Hivesigner.
*   **Development Setup:**
    *   Requires Node.js, `yarn`, React Native development environment (Xcode for iOS, Android Studio/SDK for Android).
    *   Clone repository, install dependencies (`yarn`).
    *   Specific setup for Android involves Firebase (`google-services.json`).
    *   Reactotron can be used for debugging.
*   **Structure:**
    *   `src/`: Main application code.
    *   `ios/`, `android/`: Platform-specific project files.
    *   `app.json`: React Native configuration.
    *   `README.md`: Setup, contribution, and debugging instructions.

### 3.3 Ecency API (`vision-api`)

`vision-api` serves as the backend API that supports the Ecency web and mobile applications.

*   **Repository:** `ecency/vision-api`
*   **Technology Stack:** Appears to be built with Razzle (a tool for server-rendered React applications, but can be used for APIs), likely using Node.js and TypeScript.
*   **Key Features:**
    *   Provides endpoints for Ecency frontend applications.
    *   Interfaces with other services:
        *   A private Ecency API.
        *   Hivesigner (using `HIVESIGNER_SECRET`).
        *   Hivesearcher (Elasticsearch via `hive2elastic`, using `SEARCH_API_ADDR` and `SEARCH_API_SECRET`).
        *   Revue (newsletter service, using `REVUE_TOKEN`).
*   **Configuration:** Primarily through environment variables.
*   **Development Setup:**
    *   Requires Node.js (`^12.0.0`) and `yarn`.
    *   Clone, install dependencies, configure environment variables (edit `src/config.ts` or set env vars).
*   **Deployment:**
    *   Docker support (`Dockerfile`, `docker-compose.yml`).
    *   Official image: `ecency/api:latest` (Note: README mentions `ecency/vision:latest` in one place, likely a typo for `ecency/api:latest` or an older image name).
*   **Structure:**
    *   `src/`: API source code.
    *   `razzle.config.js`: Razzle framework configuration.
    *   `README.md`: Setup and deployment instructions.

---

## 4. Developer Resources & SDKs

Ecency provides SDKs to facilitate development on its platform and the Hive blockchain. These are located in the `ecency/sdk` monorepo.

*   **Repository:** `ecency/sdk` (monorepo, likely managed with Turborepo and Vite)
    *   `packages/core/`: Corresponds to `@ecency/sdk`.
    *   `packages/wallets/`: Corresponds to `@ecency/wallets`.

### 4.1 Ecency SDK (`@ecency/sdk`)

This SDK is designed for building user interfaces that interact with Hive.

*   **Package Name:** `@ecency/sdk`
*   **Purpose:** Provides an API and state management for Hive UIs.
*   **Key Technologies/Dependencies:**
    *   `@tanstack/react-query`: For data fetching, caching, and state synchronization.
    *   `@hiveio/dhive`: A popular JavaScript library for interacting with the Hive blockchain.
*   **Installation:** `yarn add @ecency/sdk`
*   **Setup:** Requires `react`, `@tanstack/react-query`, and `@hiveio/dhive` to be installed in the host project.

### 4.2 Ecency Wallets (`@ecency/wallets`)

This SDK focuses on wallet management functionalities.

*   **Package Name:** `@ecency/wallets`
*   **Purpose:** Provides an API for managing Hive blockchain wallets and external cryptocurrency wallets within the Ecency ecosystem.
*   **Key Features:**
    *   Wallet creation based on BIP39 seed phrases.
    *   Local generation of addresses and keys (seed phrases and private keys are not sent to any API).
    *   Supported tokens (as per README): BTC, ETH, SOL, TRX, TON, ATOM, APT, and theoretically their child tokens.
*   **Key Technologies/Dependencies:**
    *   `@hiveio/dhive`
    *   `okweb3` (a Web3 development toolkit)
*   **Roadmap (from README):** Adding more Hive wallet operations, support for signing with external wallets, importing existing wallets, and support for DASH and DOGE.

### 4.3 General Development Guidelines

Across the various Ecency repositories, common development practices include:

*   **Branching Strategy:** Often, changes are branched off a `development` or `main` branch.
*   **Pull Requests (PRs):**
    *   PRs should be clear, with descriptions, screenshots/videos if applicable.
    *   Link to issues; create an issue if one doesn't exist.
    *   Use "WIP" (Work In Progress) in titles for PRs not yet ready for merge.
*   **Testing:**
    *   Run tests (`yarn test`) before submitting PRs.
    *   Add tests for new features or bug fixes.
*   **Linting and Code Style:** Adherence to ESLint and Prettier configurations is common.
*   **Internationalization (i18n):**
    *   `vision-next` and `vision-api` use `crowdin.yml`, indicating Crowdin for translations. New strings are typically added to a base English file (e.g., `en-US.json`).
*   **Commit Messages:** Some repositories may have specific guidelines (e.g., `ecency-mobile` mentions squashing commits before push).

---

## 5. Getting Started with Development

### 5.1 Setting up a Development Environment

1.  **Prerequisites:**
    *   Git
    *   Node.js (check specific repository READMEs for version requirements, e.g., `^18.17.x` for `vision-next`, `^12.0.0` for `vision-api`).
    *   `yarn` (preferred package manager for most Ecency projects).
    *   Docker (optional, but useful for running dependencies or deploying).
    *   Platform-specific tools if developing for mobile (Xcode, Android Studio).

2.  **Cloning Repositories:**
    Clone the repositories relevant to your area of development. Key repositories include:
    *   `ecency/vision-next` (Web frontend)
    *   `ecency/ecency-mobile` (Mobile apps)
    *   `ecency/vision-api` (Backend API)
    *   `ecency/sdk` (Developer SDKs)
    *   `ecency/hivesigner-sdk` (For Hivesigner integration)
    *   And others as needed (e.g., `render-helper`, `hive2elastic`).

3.  **Installing Dependencies:**
    Navigate into each cloned repository directory and run `yarn install` (or `yarn` for short).

4.  **Configuration:**
    *   Most applications require environment variables or configuration files. Look for `.env.template`, `.env.example`, or configuration files mentioned in READMEs (e.g., `src/config.ts` in `vision-api`, `.env` from `.env.template` in `vision-next`).
    *   Pay close attention to Hivesigner client IDs/secrets and API endpoints.

### 5.2 Understanding the Authentication Flow

Authentication in Ecency heavily relies on Hivesigner:

1.  **User Initiates Login:** In an Ecency app (web/mobile), the user clicks a login button.
2.  **Redirect to Hivesigner:** The app redirects the user to Hivesigner's website (or uses the Hivesigner SDK to facilitate this).
3.  **User Authenticates with Hivesigner:** The user logs in on Hivesigner using their Hive credentials and authorizes the Ecency application for specific permissions (scopes like voting, commenting).
4.  **Callback to Application:** Hivesigner redirects the user back to the Ecency application's specified callback URL with an access token.
5.  **Token Usage:** The Ecency application uses this access token to make authenticated calls to its backend (`vision-api`) or directly to Hivesigner for performing blockchain operations on behalf of the user.
    *   The `hivesigner-sdk` simplifies managing tokens and making signed calls.

### 5.3 Interacting with the Hive Blockchain

Developers can interact with the Hive blockchain through several means:

*   **Ecency SDKs (`@ecency/sdk`, `@ecency/wallets`):**
    *   These are the recommended high-level tools for building UIs and managing wallets within the Ecency ecosystem.
    *   They abstract many complexities of direct blockchain interaction and integrate with React Query for state management.
*   **`@hiveio/dhive`:**
    *   A lower-level JavaScript library for direct communication with Hive nodes. Both Ecency SDKs use `dhive` under the hood.
    *   Useful for more custom or backend interactions.
*   **Hivesigner SDK (`ecency/hivesigner-sdk`):**
    *   Used for operations that require a user's signature, delegating the actual signing to Hivesigner.
*   **Ecency API (`vision-api`):**
    *   Frontend applications primarily interact with the Ecency API, which then communicates with the Hive blockchain or other services as needed.

---

## 6. Key Repositories Overview

| Repository          | Description                                      | Primary Technology      | Location in Project Dir |
| ------------------- | ------------------------------------------------ | ----------------------- | ----------------------- |
| `vision-next`       | Ecency web application frontend                  | Next.js, TypeScript     | `vision-next/`          |
| `ecency-mobile`     | Ecency native mobile apps (iOS & Android)        | React Native, TypeScript| `ecency-mobile/`        |
| `vision-api`        | Backend API for Ecency applications              | Razzle, Node.js/TS      | `vision-api/`           |
| `sdk` (monorepo)    | Developer SDKs                                   | TypeScript, Vite        | `sdk/`                  |
| ↳ `@ecency/sdk`     | SDK for Hive UI development & state management   | React Query, dHIVE      | `sdk/packages/core/`    |
| ↳ `@ecency/wallets` | SDK for Hive & crypto wallet management          | dHIVE, okweb3           | `sdk/packages/wallets/` |
| `hivesigner-sdk`    | JavaScript SDK for Hivesigner integration        | TypeScript              | `hivesigner-sdk/`       |
| `hivesigner-ui`     | UI components for Hivesigner                     | Nuxt.js (Vue.js)        | `hivesigner-ui/`        |
| `render-helper`     | Markdown/HTML rendering & content processing     | TypeScript              | `render-helper/`        |
| `hive2elastic`      | Syncs Hive data to Elasticsearch for search      | Python                  | `hive2elastic/`         |

---
This document should serve as a solid foundation for understanding the Ecency and Hive ecosystem. For more specific details, always refer to the README files and source code within each respective repository.
