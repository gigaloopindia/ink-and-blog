
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  // Sample travel locations
  const travelLocations = [
    { name: "Tokyo, Japan", type: "image" },
    { name: "Venice, Italy", type: "video" },
    { name: "Santorini, Greece", type: "image" },
    { name: "New York City, USA", type: "image" },
    { name: "Kyoto, Japan", type: "video" },
    { name: "Barcelona, Spain", type: "image" },
  ];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <section className="py-12">
          <h1 className="font-serif text-5xl md:text-7xl font-semibold leading-tight tracking-tight mb-6">
            Travel <span className="text-muted-foreground">Collection</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12">
            Capturing moments and memories from around the world. A personal collection of travel photography and videography.
          </p>
          
          {/* Featured Travel Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {travelLocations.map((location, index) => (
              <div 
                key={index}
                className="aspect-[4/3] rounded-lg overflow-hidden bg-secondary relative group"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {location.type === "video" ? (
                    <div className="w-12 h-12 rounded-full bg-background/80 flex items-center justify-center">
                      <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-current ml-1"></div>
                    </div>
                  ) : null}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-white font-medium">{location.name}</h3>
                  <p className="text-white/80 text-sm">{location.type === "video" ? "Video" : "Photograph"}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* About Me Section */}
        <section className="py-12 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-secondary rounded-lg flex items-center justify-center">
              <span className="text-lg font-mono text-muted-foreground">Profile Photo</span>
            </div>
            
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-6">About Me</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm a designer and creative thinker specializing in minimal, human-centered design. For over 8 years, I've worked with clients and companies to create thoughtful digital experiences that balance form and function.
                </p>
                <p>
                  My approach is guided by the belief that great design solves real problems through simplicity and clarity. I'm particularly inspired by the design principles of Dieter Rams and the philosophy that less is more.
                </p>
                <div className="pt-4">
                  <Button asChild variant="outline" className="group">
                    <Link to="/about">
                      Learn more about me
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
