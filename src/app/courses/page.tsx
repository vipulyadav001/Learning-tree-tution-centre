'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Course {
  id: string
  title: string
  description: string
}

const courses: Course[] = [
  {
    id: 'maths-1',
    title: 'Mathematics Fundamentals',
    description: 'Learn basic arithmetic, algebra, and geometry'
  },
  {
    id: 'english-1',
    title: 'English Language',
    description: 'Master grammar, vocabulary, and writing skills'
  },
  {
    id: 'science-1',
    title: 'General Science',
    description: 'Explore physics, chemistry, and biology basics'
  },
  {
    id: 'social-science-1',
    title: 'Social Studies',
    description: 'Study history, geography, and civics'
  },
  {
    id: 'general-knowledge-1',
    title: 'General Knowledge',
    description: 'Learn about current affairs and general awareness'
  },
  {
    id: 'computer-science-1',
    title: 'Computer Science',
    description: 'Introduction to programming and computer basics'
  }
]

export default function CoursesPage() {



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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Available Courses</h1>
          <Link 
            href="/premium"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg"
          >
            Go Premium
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-600">{course.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
