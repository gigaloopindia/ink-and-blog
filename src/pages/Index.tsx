
import React, { useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <section 
          ref={heroRef} 
          className="py-20 transition-all duration-700 transform opacity-0 translate-y-8"
        >
          <h1 className="font-serif text-5xl md:text-7xl font-semibold leading-tight tracking-tight mb-6">
            Minimalist design, <br /> 
            <span className="text-muted-foreground">maximum impact.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
            A portfolio showcasing design principles focused on simplicity, function, and beauty. 
            Creating thoughtful interfaces that elevate digital experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="rounded-md group">
              <Link to="/portfolio">
                View Portfolio
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-md">
              <Link to="/contact">Contact</Link>
            </Button>
          </div>
        </section>
        
        {/* Featured Work */}
        <section className="py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold font-serif">Selected Work</h2>
            <Button asChild variant="link" className="font-medium">
              <Link to="/portfolio" className="group">
                All Projects 
                <ArrowRight className="ml-1 h-4 w-4 inline transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div 
                key={item} 
                className="rounded-lg overflow-hidden bg-secondary aspect-[4/3] hover:bg-secondary/80 transition-colors duration-300 flex items-center justify-center"
              >
                <span className="text-xl font-mono text-muted-foreground">Project {item}</span>
              </div>
            ))}
          </div>
        </section>
        
        {/* Recent Blog Posts */}
        <section className="py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold font-serif">Recent Articles</h2>
            <Button asChild variant="link" className="font-medium">
              <Link to="/blog" className="group">
                All Articles
                <ArrowRight className="ml-1 h-4 w-4 inline transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          
          <div className="space-y-6">
            {[
              "The Principles of Minimal Design",
              "Form Follows Function: A Case Study",
              "White Space in Modern Interfaces"
            ].map((title, index) => (
              <div 
                key={index}
                className="p-6 border border-border rounded-lg hover:bg-secondary/50 transition-colors duration-300"
              >
                <p className="text-sm text-muted-foreground mb-2 font-mono">
                  {new Date(2023, 11 - index, 15).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <h3 className="text-xl font-medium mb-3">{title}</h3>
                <p className="text-muted-foreground mb-4">
                  A thoughtful exploration of how {title.toLowerCase()} impacts our perception of digital products and user experience.
                </p>
                <Button asChild variant="link" className="px-0 font-medium">
                  <Link to={`/blog/${index + 1}`} className="group hover-underline">
                    Read Article
                    <ArrowRight className="ml-1 h-4 w-4 inline transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
