// import { motion } from "framer-motion";
// import { BookOpen, TrendingUp, Clock, ArrowRight, Star, Eye } from "lucide-react";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Insights() {
//   const [blogs, setBlogs] = useState<any[]>([]);
//   const [videos, setVideos] = useState<any[]>([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/blogs").then((res) => setBlogs(res.data));
//     axios.get("http://localhost:5000/api/videos").then((res) => setVideos(res.data));
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 py-20">
//       <div className="container mx-auto px-6">

//         {/* Hero Section */}
//         <motion.div 
//           className="text-center space-y-8 mb-20"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
//             Financial Knowledge Base
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Insights, guides, and analysis to help you make informed financial decisions.
//           </p>
//         </motion.div>

//         {/* Featured Article */}
//         <motion.section 
//           className="mb-20"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8 }}
//         >
//           <div className="bg-white shadow-lg p-8 rounded-2xl hover:scale-[1.01] transition-transform duration-300">
//             <div className="grid lg:grid-cols-2 gap-8 items-center">
//               <motion.div 
//                 initial={{ x: -50, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.7 }}
//               >
//                 <div className="flex items-center mb-4">
//                   <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold mr-4">
//                     Featured
//                   </span>
//                   <span className="text-gray-500 text-sm">January 2025</span>
//                 </div>
//                 <h2 className="text-3xl font-bold text-gray-900 mb-4">
//                   Tax Planning Strategies for 2025: Maximize Your Savings
//                 </h2>
//                 <p className="text-gray-600 mb-6">
//                   A comprehensive guide to optimizing your tax planning with the latest updates to Indian tax laws, including new deduction limits and investment options.
//                 </p>
//                 <div className="flex items-center text-gray-500 text-sm mb-6">
//                   <Clock className="w-4 h-4 mr-2" />
//                   <span className="mr-6">8 min read</span>
//                   <Eye className="w-4 h-4 mr-2" />
//                   <span>2,453 views</span>
//                 </div>
//                 <motion.button 
//                   className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center"
//                   whileHover={{ scale: 1.05, x: 5 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Read Full Article
//                   <ArrowRight className="w-4 h-4 ml-2" />
//                 </motion.button>
//               </motion.div>
//               <motion.div 
//                 initial={{ x: 50, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.7 }}
//               >
//                 <img 
//                   src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&h=600" 
//                   alt="Tax planning strategies" 
//                   className="rounded-xl w-full h-auto shadow-lg hover:rotate-1 hover:scale-[1.02] transition-transform duration-500" 
//                 />
//               </motion.div>
//             </div>
//           </div>
//         </motion.section>

//         {/* Blogs Section */}
//         <section className="mb-20">
//           <h2 className="text-3xl font-bold mb-6 text-gray-900">Latest Blogs</h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {blogs.map((blog, i) => (
//               <motion.div 
//                 key={blog._id} 
//                 className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl cursor-pointer border border-gray-200"
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: i * 0.1 }}
//                 whileHover={{ rotate: 1, scale: 1.05 }}
//               >
//                 <h3 className="text-xl font-bold mb-2 text-gray-900">{blog.title}</h3>
//                 <p className="text-gray-600">{blog.excerpt}</p>
//               </motion.div>
//             ))}
//           </div>
//         </section>

//         {/* Videos Section */}
//         <section className="mb-20">
//           <h2 className="text-3xl font-bold mb-6 text-gray-900">Videos</h2>
//           <motion.div 
//             className="grid md:grid-cols-2 gap-6"
//             initial="hidden"
//             animate="visible"
//             variants={{
//               hidden: { opacity: 0 },
//               visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
//             }}
//           >
//             {videos.map((video) => (
//               <motion.div 
//                 key={video._id} 
//                 className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200"
//                 variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
//                 whileHover={{ scale: 1.03 }}
//               >
//                 <h3 className="text-lg font-semibold mb-3 text-gray-900">{video.title}</h3>
//                 <iframe
//                   width="100%"
//                   height="200"
//                   src={video.youtubeUrl.replace("watch?v=", "embed/")}
//                   title={video.title}
//                   className="rounded-lg"
//                   allowFullScreen
//                 />
//               </motion.div>
//             ))}
//           </motion.div>
//         </section>

//         {/* Categories */}
//         <section className="mb-20">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold mb-6 text-gray-900">Browse by Category</h2>
//           </div>
//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               { title: "Investment Strategies", count: "24 articles", icon: TrendingUp, color: "from-yellow-400 to-orange-500" },
//               { title: "Tax Planning", count: "18 articles", icon: BookOpen, color: "from-blue-500 to-indigo-500" },
//               { title: "Financial Planning", count: "31 articles", icon: Star, color: "from-purple-500 to-pink-500" }
//             ].map((category, index) => (
//               <motion.div 
//                 key={category.title}
//                 className="bg-white shadow-md p-6 rounded-xl text-center hover:shadow-xl cursor-pointer border border-gray-200"
//                 initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
//                 animate={{ opacity: 1, scale: 1, rotate: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.15 }}
//                 whileHover={{ scale: 1.08, rotate: 3 }}
//               >
//                 <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
//                   <category.icon className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h3>
//                 <p className="text-gray-600">{category.count}</p>
//               </motion.div>
//             ))}
//           </div>
//         </section>

//         {/* Newsletter Signup */}
//         <motion.section 
//           className="bg-white p-12 rounded-2xl text-center relative shadow-xl border border-gray-200"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <motion.div 
//             className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-10 blur-2xl"
//             animate={{ opacity: [0.1, 0.2, 0.1] }}
//             transition={{ duration: 3, repeat: Infinity }}
//           />
//           <h2 className="text-3xl font-bold mb-6 text-gray-900 relative">Stay Updated</h2>
//           <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto relative">
//             Get weekly insights and market updates delivered to your inbox.
//           </p>
//           <div className="flex max-w-md mx-auto relative">
//             <input 
//               type="email" 
//               placeholder="Enter your email"
//               className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-l-lg focus:border-blue-500 focus:outline-none text-gray-900"
//             />
//             <motion.button 
//               className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-r-lg font-semibold hover:shadow-lg transition-all duration-300"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Subscribe
//             </motion.button>
//           </div>
//         </motion.section>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, Play } from "lucide-react";
import type { Blog, Video } from "@shared/schema";

export default function Resources() {
  const [blogSearch, setBlogSearch] = useState("");
  const [videoSearch, setVideoSearch] = useState("");

  const { data: blogs = [] } = useQuery({
    queryKey: ["/api/blogs"],
  });

  const { data: videos = [] } = useQuery({
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

  const filteredBlogs = blogs.filter((blog: Blog) =>
    blog.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
    blog.content.toLowerCase().includes(blogSearch.toLowerCase()) ||
    blog.category.toLowerCase().includes(blogSearch.toLowerCase())
  );

  const filteredVideos = videos.filter((video: Video) =>
    video.title.toLowerCase().includes(videoSearch.toLowerCase()) ||
    video.description.toLowerCase().includes(videoSearch.toLowerCase())
  );

  const faqs = [
    {
      question: "What tax planning services do you offer?",
      answer: "We offer comprehensive tax planning services including business tax optimization, personal tax strategies, retirement planning, and compliance consulting."
    },
    {
      question: "How can I schedule a consultation?",
      answer: "You can schedule a consultation by contacting us through our contact form, calling our office, or using our enquiry forms for specific services."
    },
    {
      question: "What types of businesses do you work with?",
      answer: "We work with small businesses, startups, corporations, and individual entrepreneurs across various industries."
    },
    {
      question: "How often should I review my tax strategy?",
      answer: "We recommend reviewing your tax strategy at least annually, or whenever there are significant changes to your business or personal financial situation."
    },
  ];

  return (
   <div className="pt-1">
  {/* Hero Section */}
  <div className="relative bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white py-20">
    <div className="absolute inset-0 bg-black/20"></div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 slide-in">
        Financial Resources Hub
      </h1>
      <p
        className="text-xl md:text-2xl mb-8 opacity-90 slide-in"
        style={{ animationDelay: "0.2s" }}
      >
        Expert insights, strategies, and tools for your financial success
      </p>
      <Button
        className="bg-white text-purple-600 px-8 py-4 text-lg font-semibold hover:shadow-lg transition-shadow slide-in"
        style={{ animationDelay: "0.4s" }}
      >
        Explore Resources
      </Button>
    </div>
  </div>

  {/* Tax Planning Section */}
  <div className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-purple-700 mb-6">
          Tax Planning & Strategy
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Strategic tax planning solutions designed to optimize your financial position and maximize savings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="hover:shadow-xl transition-shadow border-t-4 border-yellow-400">
          <CardContent className="p-8 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Business Tax Optimization</h3>
            <p className="text-gray-600">Comprehensive strategies to minimize business tax liability while maintaining compliance</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow border-t-4 border-blue-500">
          <CardContent className="p-8 text-center">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Tax Planning</h3>
            <p className="text-gray-600">Personalized tax strategies to maximize deductions and minimize your tax burden</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow border-t-4 border-pink-500">
          <CardContent className="p-8 text-center">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Investment Tax Strategy</h3>
            <p className="text-gray-600">Optimize your investment portfolio with tax-efficient strategies and planning</p>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>

{/* Blogs Section */}
<div className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
      <h2 className="text-4xl font-bold text-blue-900" data-testid="text-latest-insights">
        Latest Insights
      </h2>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search blogs..."
            value={blogSearch}
            onChange={(e) => setBlogSearch(e.target.value)}
            className="pl-10 w-64 border-blue-300 focus:ring-blue-500"
            data-testid="input-search-blogs"
          />
        </div>
        <Link href="/blogs">
          <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50" data-testid="button-view-all-blogs">
            View All Blogs
          </Button>
        </Link>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredBlogs.slice(0, 6).map((blog: Blog) => (
        <Card key={blog.id} className="overflow-hidden hover:shadow-xl transition-shadow border border-blue-200" data-testid={`blog-card-${blog.id}`}>
          {blog.image && (
            <img 
              src={blog.image} 
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
          )}
          <CardContent className="p-6">
            <div className="flex items-center text-sm text-blue-500 mb-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-600">{blog.category}</Badge>
              <span className="mx-2">•</span>
              <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ""}</span>
            </div>
            <h3 className="text-xl font-semibold text-blue-900 mb-3">
              {blog.title}
            </h3>
            <p className="text-blue-600 mb-4 line-clamp-3">
              {blog.excerpt}
            </p>
            <Link href={`/blogs/${blog.id}`}>
              <Button variant="ghost" className="text-purple-600 hover:text-purple-800 p-0" data-testid={`button-read-blog-${blog.id}`}>
                Read More →
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>

    {filteredBlogs.length === 0 && (
      <div className="text-center py-12">
        <p className="text-blue-500 text-lg">No blogs found matching your search.</p>
      </div>
    )}
  </div>
</div>

{/* Videos Section */}
<div className="py-20 bg-gradient-to-r from-purple-50 to-pink-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
      <h2 className="text-4xl font-bold text-purple-900" data-testid="text-expert-videos">
        Expert Videos
      </h2>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search videos..."
            value={videoSearch}
            onChange={(e) => setVideoSearch(e.target.value)}
            className="pl-10 w-64 border-purple-300 focus:ring-purple-500"
            data-testid="input-search-videos"
          />
        </div>
        <Link href="/videos">
          <Button variant="outline" className="border-purple-500 text-purple-600 hover:bg-purple-50" data-testid="button-explore-more-videos">
            Explore More
          </Button>
        </Link>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredVideos.slice(0, 6).map((video: Video) => (
        <Card key={video.id} className="overflow-hidden hover:shadow-xl transition-shadow border border-purple-200" data-testid={`video-card-${video.id}`}>
          <div className="relative group cursor-pointer">
            <img 
              src={getYoutubeThumbnail(video.youtubeUrl)} 
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                <Play className="h-6 w-6 text-purple-600 ml-1" />
              </div>
            </div>
            {video.duration && (
              <div className="absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-sm">
                {video.duration}
              </div>
            )}
          </div>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              {video.title}
            </h3>
            <p className="text-purple-600 text-sm mb-3 line-clamp-2">
              {video.description}
            </p>
            <div className="flex items-center text-sm text-purple-500">
              <span>{video.views || "0"} views</span>
              <span className="mx-2">•</span>
              <span>{video.createdAt ? new Date(video.createdAt).toLocaleDateString() : ""}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    {filteredVideos.length === 0 && (
      <div className="text-center py-12">
        <p className="text-purple-500 text-lg">No videos found matching your search.</p>
      </div>
    )}
  </div>
</div>

{/* Consult with Us Section */}
<div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-4xl font-bold mb-6" data-testid="text-consult-title">
      Ready to Optimize Your Finances?
    </h2>
    <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
      Get personalized financial advice from our certified experts. Schedule a consultation today.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link href="/contact">
        <Button className="bg-white text-blue-600 px-8 py-4 font-semibold hover:shadow-lg transition-shadow" data-testid="button-schedule-consultation">
          Schedule Consultation
        </Button>
      </Link>
      <Link href="/contact">
        <Button 
          variant="outline" 
          className="border-2 border-white text-white px-8 py-4 font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          data-testid="button-contact-us"
        >
          Contact Us
        </Button>
      </Link>
    </div>
  </div>
</div>

    </div>
  );
}
