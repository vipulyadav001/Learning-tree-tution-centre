'use client'

import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  content?: string
}

// Move video generation to client-side only
const generateVideos = (courseId: string, page: number): Video[] => {
  return Array.from({ length: 10 }, (_, i) => {
    const video: Video = {
      id: `${courseId}-${page}-${i}`,
      title: `${courseId.charAt(0).toUpperCase() + courseId.slice(1)} Lesson ${page * 10 + i + 1}`,
      description: `Learn about important concepts in ${courseId}`,
      thumbnail: `https://picsum.photos/seed/${courseId}-${i}/400/225`
    }
    
    // Add content for first 6 videos
    if (page === 0 && i < 6) {
      video.content = `
# ${video.title}

## Introduction
Welcome to ${video.title}! In this lesson, we'll explore fundamental concepts and practical applications.

## Key Points
1. Understanding basic principles
2. Practical applications
3. Common misconceptions
4. Problem-solving techniques

## Summary
This lesson covers essential topics that will help build your foundation in ${courseId}. Practice the concepts regularly to master them.

## Practice Questions
1. What are the main principles discussed in this lesson?
2. How can you apply these concepts in real-world scenarios?
3. What are some common mistakes to avoid?

Keep practicing and don't hesitate to ask questions if you need help!
      `
    }
    
    return video
  })
}

export default function CoursePage() {
  const params = useParams()
  const courseId = params?.courseId as string
  const [videos, setVideos] = useState<Video[]>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Handle client-side initialization
  useEffect(() => {
    setIsClient(true)
    if (courseId) {
      setVideos(generateVideos(courseId, 0))
    }
  }, [courseId])

  useEffect(() => {
    const handleScroll = () => {
      if (loading || !isClient) return

      const scrollPosition = window.innerHeight + window.scrollY
      const documentHeight = document.documentElement.offsetHeight

      if (scrollPosition >= documentHeight - 1000) {
        setLoading(true)
        const newVideos = generateVideos(courseId, page + 1)
        setVideos(prev => [...prev, ...newVideos])
        setPage(prev => prev + 1)
        setLoading(false)
      }
    }

    if (isClient) {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [loading, page, courseId, isClient])

  // Prevent hydration issues by not rendering until client-side
  if (!isClient) {
    return null
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <nav className="space-y-4">
          <div className="text-xl font-bold mb-6">Navigation</div>
          <Link href="/courses" className="block py-2 px-4 rounded hover:bg-gray-700">Courses</Link>
          <Link href="/papers" className="block py-2 px-4 rounded hover:bg-gray-700 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Previous Year Papers
          </Link>
          <Link href="/profile" className="block py-2 px-4 rounded hover:bg-gray-700">Profile</Link>
          <Link href="/api/auth/signout" className="block py-2 px-4 rounded hover:bg-gray-700">Sign Out</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">
          {courseId?.charAt(0).toUpperCase() + courseId?.slice(1)} Course
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div 
              key={video.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => {
                if (video.content) {
                  window.open(`/courses/${courseId}/${video.id}`, '_blank')
                }
              }}
            >
              <Image 
                src={video.thumbnail} 
                alt={video.title}
                width={400}
                height={225}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
                <p className="text-gray-600">{video.description}</p>
                {video.content && (
                  <div className="mt-2 text-purple-600 font-medium">
                    Click to view lesson content →
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {loading && (
          <div className="text-center py-4">
            Loading more videos...
          </div>
        )}
      </main>
    </div>
  )
}
