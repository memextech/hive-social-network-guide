# Hive Social Network Development Guide

This project contains a Next.js-based social network application built on top of the Hive blockchain, along with analysis of the Ecency ecosystem.

## Overview

Our main application (`hive-social-app`) is a working social network built with:
- **Next.js 15.3.3** with App Router
- **React 19** 
- **TypeScript**
- **Tailwind CSS 4**
- **@hiveio/dhive 1.3.2** for Hive blockchain integration

The app demonstrates how to build on top of Hive without requiring complex authentication - it focuses on read-only operations that showcase the social data available on the blockchain.

## Project Structure

```
ecency_hive_vision_docs/
├── .memex/
│   └── rules.md              # This development guide
├── docs/
│   └── ecency_hive_documentation.md  # Comprehensive ecosystem documentation
├── hive-social-app/          # Main Next.js application (our working app)
└── tasks/                    # Project task tracking
```

## Quick Start

### Prerequisites

```bash
# Required software
node --version    # Should be 18.17+ (tested with 23.10.0)
npm --version     # Should be 9+ (tested with 10.9.2)
```

### Installation

```bash
# Navigate to the main app
cd hive-social-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

## Current Working App Features

Our `hive-social-app` currently includes:

- **Trending Posts Display**: Fetches and displays trending posts from Hive
- **Post Cards**: Formatted display of post metadata (author, date, votes, comments)
- **Tag Support**: Shows post tags and categories
- **Responsive Design**: Built with Tailwind CSS
- **Error Handling**: Graceful handling of API failures
- **Loading States**: User feedback during data fetching

## Hive Integration Overview

### Core Dependencies

```json
{
  "@hiveio/dhive": "^1.3.2"
}
```

### Connection Setup

```typescript
// src/lib/hive.ts
import { Client } from '@hiveio/dhive'

export const hiveClient = new Client([
  'https://api.hive.blog',        // Primary public node
  'https://api.hivekings.com',    // Backup node  
  'https://anyx.io',              // Additional backup
])
```

**Key Points:**
- Uses public Hive API nodes (no authentication required for reads)
- Multiple nodes provide redundancy
- Read-only operations (posts, comments, user data)

### Reading Hive Data

#### Get Trending Posts
```typescript
const posts = await hiveClient.database.getDiscussions('trending', {
  tag: 'hive',     // Community/tag filter
  limit: 10        // Number of posts
})

// Other sort options: 'hot', 'new', 'created'
```

#### Get Specific Post
```typescript
const post = await hiveClient.database.call('get_content', [
  'author-name',   // Hive username
  'post-permlink'  // Unique post identifier
])
```

#### Get Post Comments
```typescript
const comments = await hiveClient.database.call('get_content_replies', [
  'author-name',
  'post-permlink'
])
```

#### Get User Account
```typescript
const accounts = await hiveClient.database.getAccounts(['username'])
const userAccount = accounts[0] // Returns null if not found
```

### Hive Data Structure

```typescript
interface HivePost {
  id: number
  author: string           // Username who created post
  permlink: string        // Unique post URL identifier  
  title: string          // Post title
  body: string           // Post content (often Markdown)
  created: string        // ISO timestamp
  last_update: string    // Last update timestamp
  net_votes: number      // Upvotes minus downvotes
  children: number       // Number of comments
  json_metadata: string  // App-specific data (tags, etc.)
  category: string       // Primary tag
  active_votes: Array<{  // Individual vote details
    voter: string
    weight: number
    rshares: string      // Raw vote power
    percent: number
  }>
}
```

### Error Handling

```typescript
try {
  const posts = await getPosts('hive', 10)
  setPosts(posts)
} catch (error) {
  console.error('Hive API Error:', error)
  // Handle network issues, invalid parameters, etc.
}
```

## Current Capabilities vs Limitations

### ✅ What Works (Read-Only)
- Browse posts by tag/community
- View post content and metadata  
- See vote counts and comment counts
- Get user profile information
- Filter and sort content
- No API keys or authentication needed

### ❌ What's Missing (Write Operations)
- Posting new content
- Voting/upvoting posts
- Adding comments
- Following users
- Managing HIVE/HBD wallet
- Real-time notifications

### 🔧 To Add Write Operations, You Need:

1. **User Authentication**
   ```bash
   npm install hivesigner
   # or
   npm install @hiveio/keychain
   ```

2. **Private Key Management**
   ```typescript
   // Example with Hivesigner (recommended for web apps)
   import { Client } from 'hivesigner'
   
   const client = new Client({
     app: 'your-app-name',
     callbackURL: 'http://localhost:3000/auth/callback',
     scope: ['vote', 'comment', 'post']
   })
   ```

3. **Transaction Broadcasting**
   ```typescript
   // Example: Cast a vote
   await client.vote(voter, author, permlink, weight)
   
   // Example: Post content
   await client.comment(
     parentAuthor, parentPermlink, 
     author, permlink, title, body, jsonMetadata
   )
   ```

## Advanced Implementation Patterns (From Ecency Vision-Next)

### Essential Dependencies for Full Hive Apps

```bash
# Core Hive blockchain
npm install @hiveio/dhive

# Authentication & Signing  
npm install hivesigner @hiveio/hivescript

# Ecency's production-ready packages
npm install @ecency/sdk @ecency/wallets @ecency/render-helper

# State management & data fetching
npm install @tanstack/react-query zustand

# Rich text editing
npm install @tiptap/react @tiptap/starter-kit

# UI & Utilities
npm install framer-motion clsx date-fns marked dompurify
```

### Authentication Implementation

Ecency uses a multi-method authentication system supporting:

1. **Hivesigner OAuth** - Recommended for web apps
2. **Hive Keychain** - Browser extension
3. **Private Keys** - Direct key entry (advanced users)

**Key Files Reference:**
- [Login Dialog](https://github.com/ecency/vision-next/blob/main/src/features/shared/login/index.tsx)
- [Transaction Signer](https://github.com/ecency/vision-next/blob/main/src/features/shared/transactions/transaction-signer.tsx)

```typescript
// Authentication pattern from Ecency
import { useSignOperationByHivesigner, useSignOperationByKeychain, useSignOperationByKey } from '@ecency/sdk'

// Multiple auth methods
const { mutateAsync: signByHivesigner } = useSignOperationByHivesigner(callbackUrl)
const { mutateAsync: signByKeychain } = useSignOperationByKeychain(username)  
const { mutateAsync: signByKey } = useSignOperationByKey(username)
```

### Voting/Upvoting Implementation

**Reference:** [Entry Vote Button](https://github.com/ecency/vision-next/blob/main/src/features/shared/entry-vote-btn/index.tsx)

```typescript
// Vote pattern from Ecency
import { useEntryVote } from '@/api/mutations'

const { mutateAsync: voteInAPI, isPending: isVotingLoading } = useEntryVote(entry)

// Vote with weight (100-10000, where 10000 = 100%)
await voteInAPI({ 
  weight: Math.ceil(percent * 100), 
  estimated: estimatedPayout 
})
```

**Key Implementation Details:**
- Vote weights: 100-10000 (1% to 100%)
- Tracks previous vote state in session storage
- Optimistic UI updates with cache invalidation
- Real-time vote power updates

### Commenting System

**Reference:** [Comment Component](https://github.com/ecency/vision-next/blob/main/src/features/shared/comment)

```typescript
// Comment mutation pattern
import { useCreateReply } from '@/api/mutations'

const { mutateAsync: createReply } = useCreateReply()

await createReply({
  parentAuthor: post.author,
  parentPermlink: post.permlink,
  author: currentUser.username,
  permlink: generatePermlink(), // unique identifier
  title: '',
  body: commentMarkdown,
  jsonMetadata: JSON.stringify({ tags: [], app: 'your-app' })
})
```

### Following/Unfollowing Users

**Reference:** [Follow Controls](https://github.com/ecency/vision-next/blob/main/src/features/shared/follow-controls)

```typescript
// Follow pattern
import { useAccountFollow } from '@/api/mutations'

const { mutateAsync: followUser } = useAccountFollow()

// Follow user
await followUser({
  follower: currentUser.username,
  following: targetUsername,
  what: ['blog'] // or ['ignore'] to ignore/mute
})
```

### Wallet & Key Management

**Reference:** [Wallet Components](https://github.com/ecency/vision-next/blob/main/src/features/shared/transactions)

Ecency implements secure key handling with:

```typescript
// Never store keys in state - use secure patterns
import { PrivateKey } from '@hiveio/dhive'

// Key validation before operations
const privateKey = PrivateKey.fromString(keyInput)

// Always clear sensitive data
privateKey.toString() // Use once then discard
```

**Security Patterns:**
- Keys never stored in component state
- Session storage for temporary auth tokens only
- Multiple signature methods (Hivesigner, Keychain, direct key)
- Operation confirmation dialogs

### State Management with React Query + Zustand

**Reference:** [Global Store](https://github.com/ecency/vision-next/blob/main/src/core/global-store)

```typescript
// Global state pattern from Ecency
import { create } from 'zustand'

const useGlobalStore = create((set, get) => ({
  activeUser: null,
  login: false,
  setActiveUser: (user) => set({ activeUser: user }),
  setLogin: (show) => set({ login: show })
}))

// Cache management with React Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Optimistic updates pattern
const { mutateAsync } = useMutation({
  mutationFn: operationFunction,
  onSuccess: () => {
    queryClient.invalidateQueries(['posts'])
    // Update cache optimistically
  }
})
```

### Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build
npm run start

# Type checking
npm run lint

# Install Ecency's full stack
npm install @hiveio/dhive hivesigner @ecency/sdk @ecency/wallets @ecency/render-helper @tanstack/react-query zustand
```

## Useful Hive Resources

- **Hive Developer Portal**: https://developers.hive.io/
- **dhive Documentation**: https://gitlab.syncad.com/hive/dhive
- **Hivesigner**: https://hivesigner.com/developers
- **Hive API Explorer**: https://api.hive.blog/
- **Ecency GitHub**: https://github.com/ecency

## API Endpoints for Testing

```bash
# Test Hive API directly
curl -s --data '{"jsonrpc":"2.0", "method":"condenser_api.get_discussions_by_trending", "params":[{"tag":"hive","limit":1}], "id":1}' https://api.hive.blog

# Check if Hive node is responsive  
curl -s --data '{"jsonrpc":"2.0", "method":"condenser_api.get_dynamic_global_properties", "params":[], "id":1}' https://api.hive.blog
```

## Common Issues & Solutions

### Network Timeouts
```typescript
const hiveClient = new Client([
  'https://api.hive.blog',
  'https://api.hivekings.com',
], { timeout: 10000 }) // 10 second timeout
```

### Rate Limiting
- Public nodes are generally unlimited for reads
- Consider implementing client-side caching for better UX
- For high-traffic apps, consider running your own Hive node

### CORS Issues in Browser
- Hive public APIs support CORS
- If issues persist, proxy requests through your backend API

## Important Notes

### Our App vs Vision-Next

Our `hive-social-app` is **not** using Vision-Next - it's a completely independent Next.js application that:
- Connects directly to Hive using `@hiveio/dhive`
- Demonstrates basic read-only operations (viewing posts, user data)
- Uses custom components and styling

Vision-Next (Ecency's production platform) is referenced for:
- Learning advanced implementation patterns
- Understanding how to add write operations (voting, commenting, etc.)
- Seeing production-ready code examples

### Development Philosophy

This documentation focuses on practical implementation rather than theoretical concepts. All code examples in the basic sections are tested and working in the current project setup. The advanced patterns from Vision-Next are provided as reference for when you need to implement authentication and write operations.