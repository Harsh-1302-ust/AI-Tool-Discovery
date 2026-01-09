import { useState } from 'react';
import { AITool, Category, PricingModel } from '@/types';
import { categories, pricingModels } from '@/data/mockData';
import { useTools, useCreateTool, useUpdateTool, useDeleteTool } from '@/hooks/useTools';
import { useReviews, useApproveReview, useRejectReview } from '@/hooks/useReviews';
import { Header } from '@/components/Header';
import { StarRating } from '@/components/StarRating';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Check, 
  X, 
  Package, 
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react';

interface ToolFormData {
  name: string;
  description: string;
  useCase: string;
  category: Category;
  pricingModel: PricingModel;
  websiteUrl: string;
}

const initialFormData: ToolFormData = {
  name: '',
  description: '',
  useCase: '',
  category: 'NLP',
  pricingModel: 'Free',
  websiteUrl: ''
};

const Admin = () => {
  const { data: tools = [], isLoading: toolsLoading } = useTools();
  const { data: reviews = [], isLoading: reviewsLoading } = useReviews();
  
  const createTool = useCreateTool();
  const updateTool = useUpdateTool();
  const deleteTool = useDeleteTool();
  const approveReview = useApproveReview();
  const rejectReview = useRejectReview();

  const [isToolModalOpen, setIsToolModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<AITool | null>(null);
  const [formData, setFormData] = useState<ToolFormData>(initialFormData);

  const pendingReviews = reviews.filter(r => r.status === 'Pending');
  const approvedReviews = reviews.filter(r => r.status === 'Approved');
  const rejectedReviews = reviews.filter(r => r.status === 'Rejected');

  const handleOpenToolModal = (tool?: AITool) => {
    if (tool) {
      setEditingTool(tool);
      setFormData({
        name: tool.name,
        description: tool.description,
        useCase: tool.useCase,
        category: tool.category,
        pricingModel: tool.pricingModel,
        websiteUrl: tool.websiteUrl || ''
      });
    } else {
      setEditingTool(null);
      setFormData(initialFormData);
    }
    setIsToolModalOpen(true);
  };

  const handleSaveTool = () => {
    if (!formData.name || !formData.description || !formData.useCase) {
      return;
    }

    if (editingTool) {
      updateTool.mutate(
        { id: editingTool.id, data: formData },
        { onSuccess: () => {
          setIsToolModalOpen(false);
          setFormData(initialFormData);
          setEditingTool(null);
        }}
      );
    } else {
      createTool.mutate(formData, {
        onSuccess: () => {
          setIsToolModalOpen(false);
          setFormData(initialFormData);
          setEditingTool(null);
        }
      });
    }
  };

  const handleDeleteTool = (toolId: string) => {
    deleteTool.mutate(toolId);
  };

  const handleReviewAction = (reviewId: string, action: 'Approved' | 'Rejected') => {
    if (action === 'Approved') {
      approveReview.mutate(reviewId);
    } else {
      rejectReview.mutate(reviewId);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Badge className="bg-warning/10 text-warning border-warning/20"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'Approved':
        return <Badge className="bg-success/10 text-success border-success/20"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'Rejected':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const isLoading = toolsLoading || reviewsLoading;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage AI tools and moderate reviews</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-accent/10">
                      <Package className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{tools.length}</p>
                      <p className="text-sm text-muted-foreground">Total Tools</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-warning/10">
                      <Clock className="w-6 h-6 text-warning" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{pendingReviews.length}</p>
                      <p className="text-sm text-muted-foreground">Pending Reviews</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-success/10">
                      <CheckCircle className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{approvedReviews.length}</p>
                      <p className="text-sm text-muted-foreground">Approved Reviews</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-destructive/10">
                      <XCircle className="w-6 h-6 text-destructive" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{rejectedReviews.length}</p>
                      <p className="text-sm text-muted-foreground">Rejected Reviews</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="tools" className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="tools" className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Tools
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Reviews
                  {pendingReviews.length > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-warning text-xs text-warning-foreground">
                      {pendingReviews.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>

              {/* Tools Tab */}
              <TabsContent value="tools">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>AI Tools Management</CardTitle>
                    <Button variant="accent" onClick={() => handleOpenToolModal()}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Tool
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Pricing</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Reviews</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {tools.map((tool) => (
                            <TableRow key={tool.id}>
                              <TableCell className="font-medium">{tool.name}</TableCell>
                              <TableCell>
                                <Badge variant="category">{tool.category}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{tool.pricingModel}</Badge>
                              </TableCell>
                              <TableCell>
                                <StarRating rating={tool.averageRating} size="sm" showValue />
                              </TableCell>
                              <TableCell>{tool.totalReviews}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleOpenToolModal(tool)}
                                  >
                                    <Pencil className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteTool(tool.id)}
                                    disabled={deleteTool.isPending}
                                  >
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Review Moderation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Tool</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Comment</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {reviews.map((review) => (
                            <TableRow key={review.id}>
                              <TableCell className="font-medium">{review.toolName}</TableCell>
                              <TableCell>{review.userName}</TableCell>
                              <TableCell>
                                <StarRating rating={review.rating} size="sm" />
                              </TableCell>
                              <TableCell className="max-w-xs truncate">
                                {review.comment || '-'}
                              </TableCell>
                              <TableCell>{getStatusBadge(review.status)}</TableCell>
                              <TableCell className="text-right">
                                {review.status === 'Pending' && (
                                  <div className="flex items-center justify-end gap-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleReviewAction(review.id, 'Approved')}
                                      className="text-success hover:text-success hover:bg-success/10"
                                      disabled={approveReview.isPending}
                                    >
                                      <Check className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleReviewAction(review.id, 'Rejected')}
                                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                      disabled={rejectReview.isPending}
                                    >
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </div>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>

      {/* Tool Modal */}
      <Dialog open={isToolModalOpen} onOpenChange={setIsToolModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editingTool ? 'Edit Tool' : 'Add New Tool'}
            </DialogTitle>
            <DialogDescription>
              {editingTool ? 'Update the tool details below.' : 'Fill in the details for the new AI tool.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tool Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., ChatGPT"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the tool..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="useCase">Use Case *</Label>
              <Input
                id="useCase"
                value={formData.useCase}
                onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                placeholder="e.g., Content creation, coding assistance"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: Category) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Pricing Model</Label>
                <Select
                  value={formData.pricingModel}
                  onValueChange={(value: PricingModel) => setFormData({ ...formData, pricingModel: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {pricingModels.map((pm) => (
                      <SelectItem key={pm} value={pm}>{pm}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="websiteUrl">Website URL</Label>
              <Input
                id="websiteUrl"
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsToolModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="accent" 
              onClick={handleSaveTool}
              disabled={createTool.isPending || updateTool.isPending}
            >
              {(createTool.isPending || updateTool.isPending) && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              {editingTool ? 'Update Tool' : 'Add Tool'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
