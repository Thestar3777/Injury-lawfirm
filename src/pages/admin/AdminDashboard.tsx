import { useCmsContent } from "@/hooks/useCmsContent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Image, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const AdminDashboard = () => {
  const { data: allContent, isLoading } = useCmsContent();

  const contentSections = Array.isArray(allContent) ? allContent : [];

  const lastUpdated = contentSections.length > 0
    ? contentSections.reduce((latest, item) => 
        new Date(item.updated_at) > new Date(latest.updated_at) ? item : latest
      )
    : null;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage your website content</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Content Sections
            </CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentSections.length}</div>
            <p className="text-xs text-muted-foreground">Editable sections</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Images
            </CardTitle>
            <Image className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">—</div>
            <p className="text-xs text-muted-foreground">Uploaded images</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Last Updated
            </CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {lastUpdated 
                ? format(new Date(lastUpdated.updated_at), "MMM d")
                : "—"
              }
            </div>
            <p className="text-xs text-muted-foreground">
              {lastUpdated 
                ? format(new Date(lastUpdated.updated_at), "h:mm a")
                : "No updates yet"
              }
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Edit Content
              <ArrowRight className="w-4 h-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Update text content across your website including headlines, descriptions, and contact information.
            </p>
            <Link 
              to="/admin/content" 
              className="inline-flex items-center text-primary font-semibold hover:text-primary/80"
            >
              Manage Content <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Manage Images
              <ArrowRight className="w-4 h-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Upload and manage images for your website including hero images, attorney photos, and more.
            </p>
            <Link 
              to="/admin/images" 
              className="inline-flex items-center text-primary font-semibold hover:text-primary/80"
            >
              Manage Images <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
