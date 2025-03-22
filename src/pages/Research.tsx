
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, X, Download, ExternalLink } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Sample research data
const researchItems = Array(16).fill(0).map((_, index) => ({
  id: index + 1,
  title: `Research Image ${index + 1}`,
  category: ["Architecture", "Product", "Nature", "Abstract"][index % 4],
  date: new Date(2023, index % 12, (index % 28) + 1).toISOString(),
  format: ["JPG", "PNG", "SVG", "TIFF"][index % 4],
  size: ["1920x1080", "3840x2160", "800x600", "1200x800"][index % 4],
}));

const ResearchItem = ({ item }: { item: typeof researchItems[0] }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="aspect-square rounded-lg bg-secondary relative overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-full flex items-center justify-center">
        <span className="font-mono text-sm text-muted-foreground">{item.title}</span>
      </div>
      
      {/* Hover overlay */}
      <div 
        className={`absolute inset-0 bg-background/90 flex flex-col justify-between p-4 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div>
          <h3 className="font-medium mb-1">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.category}</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs font-mono text-muted-foreground">
            {item.format} • {item.size}
          </span>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterPanel = ({ 
  isOpen, 
  onClose,
  onFilterChange,
}: { 
  isOpen: boolean, 
  onClose: () => void,
  onFilterChange: (filters: any) => void,
}) => {
  const [localFilters, setLocalFilters] = useState({
    category: "",
    format: "",
    dateRange: "",
  });
  
  const handleChange = (key: string, value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleApply = () => {
    onFilterChange(localFilters);
    onClose();
  };
  
  const handleReset = () => {
    const resetFilters = {
      category: "",
      format: "",
      dateRange: "",
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };
  
  return (
    <div className={`fixed inset-y-0 right-0 max-w-sm w-full bg-background border-l border-border p-6 transform transition-transform duration-300 z-50 overflow-y-auto ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Filters</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <Select 
            value={localFilters.category} 
            onValueChange={(value) => handleChange('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="Architecture">Architecture</SelectItem>
              <SelectItem value="Product">Product</SelectItem>
              <SelectItem value="Nature">Nature</SelectItem>
              <SelectItem value="Abstract">Abstract</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Format</label>
          <Select 
            value={localFilters.format} 
            onValueChange={(value) => handleChange('format', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Formats</SelectItem>
              <SelectItem value="JPG">JPG</SelectItem>
              <SelectItem value="PNG">PNG</SelectItem>
              <SelectItem value="SVG">SVG</SelectItem>
              <SelectItem value="TIFF">TIFF</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Date Added</label>
          <Select 
            value={localFilters.dateRange} 
            onValueChange={(value) => handleChange('dateRange', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Time</SelectItem>
              <SelectItem value="last-week">Last Week</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mt-8 flex gap-3">
        <Button onClick={handleReset} variant="outline" className="flex-1">Reset</Button>
        <Button onClick={handleApply} className="flex-1">Apply Filters</Button>
      </div>
    </div>
  );
};

const Research = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    format: "",
    dateRange: "",
  });
  const [filteredItems, setFilteredItems] = useState(researchItems);
  
  // Filter items based on search and filters
  useEffect(() => {
    let results = researchItems;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (filters.category) {
      results = results.filter(item => item.category === filters.category);
    }
    
    // Apply format filter
    if (filters.format) {
      results = results.filter(item => item.format === filters.format);
    }
    
    // Apply date filter
    if (filters.dateRange) {
      const now = new Date();
      let cutoffDate = new Date();
      
      switch(filters.dateRange) {
        case 'last-week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'last-month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case 'last-year':
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          cutoffDate = new Date(0); // Beginning of time
      }
      
      results = results.filter(item => new Date(item.date) >= cutoffDate);
    }
    
    setFilteredItems(results);
  }, [searchTerm, filters]);
  
  return (
    <Layout>
      <div>
        <div className="mb-10">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">Research</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore the visual research library for inspiration, reference, and resources.
          </p>
        </div>
        
        {/* Search and filter controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search visual research..."
              className="pl-10 bg-background"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[400px]">
              <SheetHeader className="mb-6">
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Refine your research results
                </SheetDescription>
              </SheetHeader>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Select 
                    value={filters.category} 
                    onValueChange={(value) => setFilters(prev => ({...prev, category: value}))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      <SelectItem value="Architecture">Architecture</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="Nature">Nature</SelectItem>
                      <SelectItem value="Abstract">Abstract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Format</label>
                  <Select 
                    value={filters.format} 
                    onValueChange={(value) => setFilters(prev => ({...prev, format: value}))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Formats</SelectItem>
                      <SelectItem value="JPG">JPG</SelectItem>
                      <SelectItem value="PNG">PNG</SelectItem>
                      <SelectItem value="SVG">SVG</SelectItem>
                      <SelectItem value="TIFF">TIFF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Date Added</label>
                  <Select 
                    value={filters.dateRange} 
                    onValueChange={(value) => setFilters(prev => ({...prev, dateRange: value}))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Time</SelectItem>
                      <SelectItem value="last-week">Last Week</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="last-year">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-8 flex gap-3">
                <Button 
                  onClick={() => setFilters({category: "", format: "", dateRange: ""})} 
                  variant="outline" 
                  className="flex-1"
                >
                  Reset
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Active filters */}
        {(filters.category || filters.format || filters.dateRange) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.category && (
              <div className="inline-flex items-center gap-1 bg-secondary px-3 py-1 rounded-full text-sm">
                Category: {filters.category}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5" 
                  onClick={() => setFilters(prev => ({...prev, category: ""}))}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            
            {filters.format && (
              <div className="inline-flex items-center gap-1 bg-secondary px-3 py-1 rounded-full text-sm">
                Format: {filters.format}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5" 
                  onClick={() => setFilters(prev => ({...prev, format: ""}))}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            
            {filters.dateRange && (
              <div className="inline-flex items-center gap-1 bg-secondary px-3 py-1 rounded-full text-sm">
                Date: {filters.dateRange.replace('-', ' ')}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5" 
                  onClick={() => setFilters(prev => ({...prev, dateRange: ""}))}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-sm h-7" 
              onClick={() => setFilters({category: "", format: "", dateRange: ""})}
            >
              Clear All
            </Button>
          </div>
        )}
        
        {/* Research items grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <ResearchItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No research items match your criteria.</p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setFilters({category: "", format: "", dateRange: ""});
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      
      {/* Mobile filter panel */}
      <FilterPanel 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)}
        onFilterChange={setFilters}
      />
    </Layout>
  );
};

export default Research;
