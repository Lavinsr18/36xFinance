import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ArrowLeft, Play, Calendar, Eye } from "lucide-react";
import type { Video } from "@shared/schema";

export default function AllVideos() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const { data: videos = [], isLoading } = useQuery({
    queryKey: ["/api/videos"],
  });

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const getYoutubeThumbnail = (url: string) => {
    const videoId = extractVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";
  };

  const getEmbedUrl = (url: string) => {
    const videoId = extractVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };

  // Filter and sort videos
  const filteredVideos = videos
    .filter((video: Video) => {
      const matchesSearch = !searchQuery || 
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSearch;
    })
    .sort((a: Video, b: Video) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
        case "oldest":
          return new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        case "views":
          return parseInt(b.views || "0") - parseInt(a.views || "0");
        default:
          return 0;
      }
    });

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4" data-testid="button-back-home">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 slide-in" data-testid="text-all-videos-title">
            Expert Video Library
          </h1>
          <p className="text-xl text-muted-foreground slide-in" style={{animationDelay: "0.2s"}}>
            Watch our comprehensive collection of financial education videos and expert insights
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-muted/50 p-6 rounded-lg mb-8 fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search videos by title or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-videos"
                />
              </div>
            </div>
            
            <div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger data-testid="select-sort">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="title">Alphabetical</SelectItem>
                  <SelectItem value="views">Most Viewed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {searchQuery && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Showing {filteredVideos.length} of {videos.length} videos
              </span>
              <div className="flex items-center gap-1 bg-secondary/10 px-2 py-1 rounded">
                <span className="text-sm">Search: "{searchQuery}"</span>
                <button
                  onClick={() => setSearchQuery("")}
                  className="ml-1 hover:text-destructive"
                  data-testid="button-clear-search"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-0">
                  <div className="h-48 bg-muted rounded-t-lg"></div>
                  <div className="p-6">
                    <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-muted rounded w-full mb-2"></div>
                    <div className="h-4 bg-muted rounded w-2/3 mb-4"></div>
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Video Grid */}
        {!isLoading && (
          <>
            {filteredVideos.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">🎥</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No videos found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery
                      ? "Try adjusting your search query."
                      : "No videos are available at the moment."}
                  </p>
                  {searchQuery && (
                    <Button
                      onClick={() => setSearchQuery("")}
                      data-testid="button-clear-search"
                    >
                      Clear Search
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVideos.map((video: Video, index: number) => (
                  <Card 
                    key={video.id} 
                    className="overflow-hidden hover:shadow-lg transition-shadow scale-in"
                    style={{animationDelay: `${index * 0.1}s`}}
                    data-testid={`video-card-${video.id}`}
                  >
                    <CardContent className="p-0">
                      <Dialog>
                        <DialogTrigger asChild>
                          <div 
                            className="relative group cursor-pointer"
                            onClick={() => setSelectedVideo(video)}
                          >
                            <img 
                              src={getYoutubeThumbnail(video.youtubeUrl)} 
                              alt={video.title}
                              className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                                <Play className="h-6 w-6 text-primary ml-1" />
                              </div>
                            </div>
                            {video.duration && (
                              <div className="absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-sm">
                                {video.duration}
                              </div>
                            )}
                          </div>
                        </DialogTrigger>
                        
                        <DialogContent className="max-w-4xl w-full">
                          <div className="aspect-video">
                            <iframe
                              src={getEmbedUrl(video.youtubeUrl)}
                              title={video.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full rounded-lg"
                            />
                          </div>
                          <div className="mt-4">
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                              {video.title}
                            </h3>
                            <p className="text-muted-foreground">
                              {video.description}
                            </p>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                          {video.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {video.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            <span>{video.views || "0"} views</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>
                              {video.createdAt ? new Date(video.createdAt).toLocaleDateString() : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {/* Call to Action */}
        <section className="mt-16">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Apply What You've Learned?
              </h3>
              <p className="text-muted-foreground mb-6">
                Our expert team can help you implement these strategies and provide personalized guidance for your financial goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="btn-gradient" data-testid="button-schedule-consultation">
                    Schedule Consultation
                  </Button>
                </Link>
                <Link href="/enquiry">
                  <Button variant="outline" data-testid="button-service-enquiry">
                    Explore Our Services
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
