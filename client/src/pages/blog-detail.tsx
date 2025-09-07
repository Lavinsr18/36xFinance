import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import type { Blog } from "@shared/schema";

export default function BlogDetail() {
  const { id } = useParams();
  
  const { data: blog, isLoading, error } = useQuery({
    queryKey: ["/api/blogs", id],
    enabled: !!id,
  });

  const { data: allBlogs = [] } = useQuery({
    queryKey: ["/api/blogs"],
  });

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-muted rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="pt-16 min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <CardContent className="p-12 text-center">
              <h1 className="text-2xl font-bold text-foreground mb-4">Blog Not Found</h1>
              <p className="text-muted-foreground mb-6">
                The blog post you're looking for doesn't exist or has been removed.
              </p>
              <Link href="/blogs">
                <Button data-testid="button-back-to-blogs">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blogs
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const relatedBlogs = allBlogs
    .filter((b: Blog) => b.id !== blog.id && b.category === blog.category)
    .slice(0, 3);

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/blogs">
          <Button variant="ghost" className="mb-8" data-testid="button-back">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blogs
          </Button>
        </Link>

        {/* Blog Content */}
        <article className="slide-in">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary" data-testid="badge-category">
                <Tag className="h-3 w-3 mr-1" />
                {blog.category}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span data-testid="text-publish-date">
                  {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : ""}
                </span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-blog-title">
              {blog.title}
            </h1>
            
            {blog.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed" data-testid="text-blog-excerpt">
                {blog.excerpt}
              </p>
            )}
          </header>

          {/* Featured Image */}
          {blog.image && (
            <div className="mb-8">
              <img 
                src={blog.image} 
                alt={blog.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                data-testid="img-blog-featured"
              />
            </div>
          )}

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
              data-testid="content-blog-body"
            />
          </div>

          {/* Author and Meta Info */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">36x Finance Team</p>
                <p className="text-sm text-muted-foreground">Financial Experts</p>
              </div>
            </div>
          </div>
        </article>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-8" data-testid="text-related-blogs">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog: Blog) => (
                <Card key={relatedBlog.id} className="hover:shadow-lg transition-shadow" data-testid={`related-blog-${relatedBlog.id}`}>
                  <CardContent className="p-0">
                    {relatedBlog.image && (
                      <img 
                        src={relatedBlog.image} 
                        alt={relatedBlog.title}
                        className="w-full h-32 object-cover rounded-t-lg"
                      />
                    )}
                    <div className="p-4">
                      <Badge variant="secondary" className="mb-2">
                        {relatedBlog.category}
                      </Badge>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {relatedBlog.excerpt}
                      </p>
                      <Link href={`/blogs/${relatedBlog.id}`}>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 p-0">
                          Read More →
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="mt-16">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Need Personalized Financial Advice?
              </h3>
              <p className="text-muted-foreground mb-6">
                Our expert team is ready to help you implement these strategies for your specific situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="btn-gradient" data-testid="button-get-consultation">
                    Get Free Consultation
                  </Button>
                </Link>
                <Link href="/enquiry">
                  <Button variant="outline" data-testid="button-learn-more">
                    Learn More About Our Services
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
