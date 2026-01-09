import { useState } from 'react';
import { AITool, FilterState } from '@/types';
import { useTools } from '@/hooks/useTools';
import { useCreateReview } from '@/hooks/useReviews';
import { Header } from '@/components/Header';
import { ToolCard } from '@/components/ToolCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { SearchBar } from '@/components/SearchBar';
import { ReviewModal } from '@/components/ReviewModal';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Filter, Sparkles, Loader2 } from 'lucide-react';

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    pricingModels: [],
    minRating: 0,
    searchQuery: ''
  });
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const { data: tools = [], isLoading, error } = useTools(filters);
  const createReview = useCreateReview();

  const handleReviewSubmit = (toolId: string, rating: number, comment: string) => {
    createReview.mutate({
      toolId,
      rating,
      comment,
      userName: 'Current User', // TODO: Replace with actual user
    });
  };

  const activeFilterCount = filters.categories.length + filters.pricingModels.length + (filters.minRating > 0 ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-hero py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Discover the best AI tools</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Find Your Perfect{' '}
              <span className="text-accent">AI Tool</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
              Explore, compare, and review trusted AI tools. Make informed decisions with community ratings and verified reviews.
            </p>
            <div className="max-w-xl mx-auto">
              <SearchBar
                value={filters.searchQuery}
                onChange={(value) => setFilters({ ...filters, searchQuery: value })}
                placeholder="Search by name, use case, or description..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar filters={filters} onFilterChange={setFilters} />
            </div>
          </aside>

          {/* Tools Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  AI Tools
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {tools.length} tool{tools.length !== 1 ? 's' : ''} found
                </p>
              </div>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <div className="p-4">
                    <FilterSidebar filters={filters} onFilterChange={setFilters} isMobile />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-accent mb-4" />
                <p className="text-muted-foreground">Loading tools...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                  <Filter className="w-8 h-8 text-destructive" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  Failed to load tools
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  {error instanceof Error ? error.message : 'An error occurred while fetching tools.'}
                </p>
              </div>
            ) : tools.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {tools.map((tool, index) => (
                  <div
                    key={tool.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ToolCard
                      tool={tool}
                      onReview={(tool) => {
                        setSelectedTool(tool);
                        setReviewModalOpen(true);
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Filter className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  No tools found
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Try adjusting your filters or search query to find what you're looking for.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setFilters({
                    categories: [],
                    pricingModels: [],
                    minRating: 0,
                    searchQuery: ''
                  })}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Review Modal */}
      <ReviewModal
        tool={selectedTool}
        open={reviewModalOpen}
        onClose={() => {
          setReviewModalOpen(false);
          setSelectedTool(null);
        }}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
};

export default Index;
