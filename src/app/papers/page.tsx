'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Paper {
  id: string
  title: string
  year: number
  subject: string
  filename: string
}

const papers: Paper[] = [
  {
    id: 'math-2023',
    title: 'Mathematics Final Exam',
    year: 2023,
    subject: 'Mathematics',
    filename: 'maths.pdf'
  },
  {
    id: 'eng-2023',
    title: 'English Language Test',
    year: 2023,
    subject: 'English',
    filename: 'english.pdf'
  },
  {
    id: 'sci-2023',
    title: 'Science Comprehensive',
    year: 2023,
    subject: 'Science',
    filename: 'science.pdf'
  }
]

export default function PapersPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleDownload = (filename: string) => {
    // Create a link to download the PDF
    const link = document.createElement('a')
    link.href = `/papers/${filename}`
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

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
        <h1 className="text-3xl font-bold mb-8">Previous Year Papers</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.map((paper) => (
            <div
              key={paper.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{paper.title}</h2>
                  <p className="text-gray-600">Year: {paper.year}</p>
                  <p className="text-gray-600">Subject: {paper.subject}</p>
                </div>
                <button 
                  className="text-purple-600 hover:text-purple-700"
                  onClick={() => handleDownload(paper.filename)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
