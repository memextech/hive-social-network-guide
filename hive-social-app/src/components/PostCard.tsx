import { HivePost } from '@/lib/hive'

interface PostCardProps {
  post: HivePost
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}

function parseJsonMetadata(jsonMetadata: string) {
  try {
    return JSON.parse(jsonMetadata)
  } catch {
    return {}
  }
}

export default function PostCard({ post }: PostCardProps) {
  const metadata = parseJsonMetadata(post.json_metadata)
  
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-4 bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            @{post.author}
          </span>
          <span className="text-gray-500 text-sm">
            {formatDate(post.created)}
          </span>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>💗 {post.net_votes}</span>
          <span>💬 {post.children}</span>
        </div>
      </div>
      
      <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
        {post.title}
      </h2>
      
      <div className="text-gray-700 dark:text-gray-300 mb-3">
        {/* Display first 300 characters of the post body */}
        {post.body.substring(0, 300)}
        {post.body.length > 300 && '...'}
      </div>
      
      {metadata.tags && metadata.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {metadata.tags.slice(0, 5).map((tag: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="text-sm text-gray-500">
        Category: {post.category}
      </div>
    </div>
  )
}