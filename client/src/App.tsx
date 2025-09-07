import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import WhyUs from "@/pages/WhyUs";
import Insights from "@/pages/Insights";
import Tools from "@/pages/Tools";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import Login from "@/pages/admin-login";
import About from "@/pages/about";
import Calculator from "@/pages/Calculator";
import Dashboard from "@/pages/admin-dashboard";
import NotFound from "@/pages/not-found";
import Enquiry from "@/pages/enquiry";
import BlogDetail from "@/pages/blog-detail";
import AllBlogs from "@/pages/all-blogs";
import AllVideos from "@/pages/all-videos";


function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/why-36x" component={WhyUs} />
        <Route path="/insights" component={Insights} />
        <Route path="/tools" component={Tools} />
        <Route path="/services" component={Services} />
        <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
        <Route path="/calculator" component={Calculator} />
         <Route path="/admin-dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
          <Route path="/enquiry" component={Enquiry} />
      <Route path="/blogs" component={AllBlogs} />
      <Route path="/blogs/:id" component={BlogDetail} />
      <Route path="/videos" component={AllVideos} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
