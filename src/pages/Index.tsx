
import React from 'react';
import Layout from '@/components/Layout';

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
      </div>
    </Layout>
  );
};

export default Index;
