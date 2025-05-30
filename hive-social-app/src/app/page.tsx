'use client'

import { useState, useEffect } from 'react'
import { getPosts, HivePost } from '@/lib/hive'
import PostCard from '@/components/PostCard'

export default function Home() {
  const [posts, setPosts] = useState<HivePost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    async function fetchPosts() {
      try {
        setLoading(true)
        const hivePosts = await getPosts('hive', 10)
        setPosts(hivePosts)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch posts')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [mounted])

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Hive posts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">Error loading posts</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Hive Social Network
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Exploring the decentralized social web
          </p>
        </header>

        <main className="max-w-2xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center text-gray-600 dark:text-gray-400">
              No posts found
            </div>
          ) : (
            posts.map((post) => (
              <PostCard key={`${post.author}/${post.permlink}`} post={post} />
            ))
          )}
        </main>
      </div>
    </div>
  )
}
