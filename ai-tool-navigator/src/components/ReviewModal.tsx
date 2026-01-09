import { useState } from 'react';
import { AITool } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { StarRating } from '@/components/StarRating';
import { toast } from 'sonner';

interface ReviewModalProps {
  tool: AITool | null;
  open: boolean;
  onClose: () => void;
  onSubmit: (toolId: string, rating: number, comment: string) => void;
}

export function ReviewModal({ tool, open, onClose, onSubmit }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!tool || rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onSubmit(tool.id, rating, comment);
    toast.success('Review submitted! It will be visible once approved.');
    
    // Reset form
    setRating(0);
    setComment('');
    setIsSubmitting(false);
    onClose();
  };

  const handleClose = () => {
    setRating(0);
    setComment('');
    onClose();
  };

  if (!tool) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Review {tool.name}</DialogTitle>
          <DialogDescription>
            Share your experience with this tool. Your review will be visible once approved.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Your Rating</label>
            <div className="flex items-center gap-3">
              <StarRating
                rating={rating}
                size="lg"
                interactive
                onRatingChange={setRating}
              />
              {rating > 0 && (
                <span className="text-lg font-semibold text-accent">{rating}/5</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Comment <span className="text-muted-foreground">(optional)</span>
            </label>
            <Textarea
              placeholder="Share your experience with this tool..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="accent" onClick={handleSubmit} disabled={isSubmitting || rating === 0}>
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
