'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function LessonPage() {
  const params = useParams()
  const courseId = params?.courseId as string
  const videoId = params?.videoId as string
  
  // Get video index from ID
  const index = parseInt(videoId.split('-')[2])
  
  // Generate content (in production, this would come from a database)
  const title = `${courseId.charAt(0).toUpperCase() + courseId.slice(1)} Lesson ${index + 1}`
  const content = `
# ${title}

## Introduction
Welcome to ${title}! In this lesson, we'll explore fundamental concepts and practical applications.

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Link 
            href={`/courses/${courseId}`}
            className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Course
          </Link>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <pre className="whitespace-pre-wrap font-sans">
              {content}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
