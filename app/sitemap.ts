import type { MetadataRoute } from 'next'
import { posts } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Dynamic blog posts
  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // Section anchors (for better SEO)
  const sections: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/#about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/#experience`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/#projects`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/#certifications`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/#contact`, changeFrequency: 'yearly', priority: 0.9 },
  ].map(section => ({
    ...section,
    lastModified: new Date(),
  }))

  return [...staticPages, ...blogPosts, ...sections]
}






