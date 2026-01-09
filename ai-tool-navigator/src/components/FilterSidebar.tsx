import { FilterState, Category, PricingModel } from '@/types';
import { categories, pricingModels } from '@/data/mockData';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { X, Filter } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

export function FilterSidebar({ filters, onFilterChange, onClose, isMobile }: FilterSidebarProps) {
  const handleCategoryChange = (category: Category, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handlePricingChange = (pricing: PricingModel, checked: boolean) => {
    const newPricing = checked
      ? [...filters.pricingModels, pricing]
      : filters.pricingModels.filter(p => p !== pricing);
    onFilterChange({ ...filters, pricingModels: newPricing });
  };

  const handleRatingChange = (value: number[]) => {
    onFilterChange({ ...filters, minRating: value[0] });
  };

  const clearFilters = () => {
    onFilterChange({
      categories: [],
      pricingModels: [],
      minRating: 0,
      searchQuery: filters.searchQuery
    });
  };

  const hasActiveFilters = filters.categories.length > 0 || filters.pricingModels.length > 0 || filters.minRating > 0;

  return (
    <div className="bg-card rounded-xl border border-border p-5 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-accent" />
          <h2 className="font-display font-semibold text-foreground">Filters</h2>
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          )}
          {isMobile && onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Pricing</h3>
        <div className="space-y-2">
          {pricingModels.map((pricing) => (
            <div key={pricing} className="flex items-center space-x-2">
              <Checkbox
                id={`pricing-${pricing}`}
                checked={filters.pricingModels.includes(pricing)}
                onCheckedChange={(checked) => handlePricingChange(pricing, checked as boolean)}
              />
              <Label
                htmlFor={`pricing-${pricing}`}
                className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
              >
                {pricing}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">Minimum Rating</h3>
          <span className="text-sm font-medium text-accent">{filters.minRating}+</span>
        </div>
        <Slider
          value={[filters.minRating]}
          onValueChange={handleRatingChange}
          max={5}
          step={0.5}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Any</span>
          <span>5.0</span>
        </div>
      </div>
    </div>
  );
}
