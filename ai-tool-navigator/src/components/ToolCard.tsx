import { AITool } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/StarRating';
import { ExternalLink, MessageSquare } from 'lucide-react';

interface ToolCardProps {
  tool: AITool;
  onReview: (tool: AITool) => void;
}

export function ToolCard({ tool, onReview }: ToolCardProps) {
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'NLP': '💬',
      'Computer Vision': '👁️',
      'Dev Tools': '🛠️',
      'Data Science': '📊',
      'Automation': '⚡',
      'Content Generation': '✨'
    };
    return icons[category] || '🤖';
  };

  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case 'Free':
        return 'bg-success/10 text-success border-success/20';
      case 'Paid':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Subscription':
        return 'bg-info/10 text-info border-info/20';
      default:
        return '';
    }
  };

  return (
    <Card className="group h-full transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 border-border/50 bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-2xl">
              {getCategoryIcon(tool.category)}
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                {tool.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <StarRating rating={tool.averageRating} size="sm" showValue />
                <span className="text-xs text-muted-foreground">
                  ({tool.totalReviews})
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {tool.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="category">{tool.category}</Badge>
          <Badge className={getPricingColor(tool.pricingModel)}>
            {tool.pricingModel}
          </Badge>
        </div>
        
        <div className="pt-2">
          <p className="text-xs font-medium text-muted-foreground mb-1">Use Case</p>
          <p className="text-sm text-foreground line-clamp-2">{tool.useCase}</p>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="accent"
            size="sm"
            className="flex-1"
            onClick={() => onReview(tool)}
          >
            <MessageSquare className="w-4 h-4 mr-1" />
            Review
          </Button>
          {tool.websiteUrl && (
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
