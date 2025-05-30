import { Client } from '@hiveio/dhive'

// Create a Hive client instance
// Using public Hive nodes - these are the most commonly used endpoints
export const hiveClient = new Client([
  'https://api.hive.blog',
  'https://api.hivekings.com',
  'https://anyx.io',
])

// Types for Hive data structures
export interface HivePost {
  id: number
  author: string
  permlink: string
  title: string
  body: string
  created: string
  last_update: string
  net_votes: number
  children: number
  active_votes: Array<{
    voter: string
    weight: number
    rshares: string
    percent: number
  }>
  json_metadata: string
  category: string
}

export interface HiveComment {
  id: number
  author: string
  permlink: string
  parent_author: string
  parent_permlink: string
  title: string
  body: string
  created: string
  last_update: string
  net_votes: number
  children: number
}

// Function to get posts from a specific community or tag
export async function getPosts(tag: string = 'hive', limit: number = 10) {
  try {
    const posts = await hiveClient.database.getDiscussions('trending', {
      tag,
      limit,
    })
    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

// Function to get a specific post
export async function getPost(author: string, permlink: string) {
  try {
    const post = await hiveClient.database.call('get_content', [author, permlink])
    return post
  } catch (error) {
    console.error('Error fetching post:', error)
    throw error
  }
}

// Function to get comments for a post
export async function getComments(author: string, permlink: string) {
  try {
    const comments = await hiveClient.database.call('get_content_replies', [author, permlink])
    return comments
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw error
  }
}

// Function to get user account info
export async function getAccount(username: string) {
  try {
    const accounts = await hiveClient.database.getAccounts([username])
    return accounts[0] || null
  } catch (error) {
    console.error('Error fetching account:', error)
    throw error
  }
}