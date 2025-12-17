import { useState } from "react";
import { useAdminCmsContent, useUpdateCmsContent, CmsContent } from "@/hooks/useCmsContent";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ContentField {
  key: string;
  label: string;
  type: "text" | "textarea";
}

const sectionConfig: Record<string, { title: string; description: string; fields: ContentField[] }> = {
  hero: {
    title: "Hero Section",
    description: "Main headline and call-to-action on the homepage",
    fields: [
      { key: "headline", label: "Headline", type: "text" },
      { key: "subheadline", label: "Subheadline", type: "textarea" },
      { key: "cta_primary", label: "Primary Button Text", type: "text" },
      { key: "cta_secondary", label: "Secondary Button Text", type: "text" },
    ]
  },
  attorney: {
    title: "Attorney Section",
    description: "Information about the lead attorney",
    fields: [
      { key: "name", label: "Attorney Name", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "experience", label: "Experience", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ]
  },
  contact: {
    title: "Contact Information",
    description: "Office contact details shown across the site",
    fields: [
      { key: "phone", label: "Phone Number", type: "text" },
      { key: "email", label: "Email Address", type: "text" },
      { key: "address", label: "Street Address", type: "text" },
      { key: "city", label: "City", type: "text" },
      { key: "state", label: "State", type: "text" },
      { key: "zip", label: "ZIP Code", type: "text" },
    ]
  },
  firm: {
    title: "Firm Information",
    description: "General firm branding and taglines",
    fields: [
      { key: "name", label: "Firm Name", type: "text" },
      { key: "tagline", label: "Tagline", type: "text" },
    ]
  }
};

const AdminContent = () => {
  const { data: allContent, isLoading } = useAdminCmsContent();
  const updateContent = useUpdateCmsContent();
  const [editedContent, setEditedContent] = useState<Record<string, Record<string, unknown>>>({});

  const contentSections = Array.isArray(allContent) ? allContent : [];

  const getContentValue = (sectionKey: string, fieldKey: string) => {
    // Check edited content first
    if (editedContent[sectionKey]?.[fieldKey] !== undefined) {
      return editedContent[sectionKey][fieldKey] as string;
    }
    // Fall back to database content
    const section = contentSections.find(s => s.section_key === sectionKey);
    return (section?.content?.[fieldKey] as string) || "";
  };

  const handleFieldChange = (sectionKey: string, fieldKey: string, value: string) => {
    setEditedContent(prev => ({
      ...prev,
      [sectionKey]: {
        ...(prev[sectionKey] || {}),
        [fieldKey]: value
      }
    }));
  };

  const handleSaveSection = async (sectionKey: string) => {
    const section = contentSections.find(s => s.section_key === sectionKey);
    const currentContent = section?.content || {};
    const updates = editedContent[sectionKey] || {};
    
    const mergedContent = { ...currentContent, ...updates };

    await updateContent.mutateAsync({
      sectionKey,
      content: mergedContent
    });

    // Clear edited content for this section
    setEditedContent(prev => {
      const { [sectionKey]: _, ...rest } = prev;
      return rest;
    });
  };

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Content Manager</h1>
        <p className="text-muted-foreground mt-1">Edit text content across your website</p>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          {Object.keys(sectionConfig).map(key => (
            <TabsTrigger key={key} value={key} className="capitalize">
              {sectionConfig[key].title.split(" ")[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(sectionConfig).map(([sectionKey, config]) => (
          <TabsContent key={sectionKey} value={sectionKey}>
            <Card>
              <CardHeader>
                <CardTitle>{config.title}</CardTitle>
                <CardDescription>{config.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {config.fields.map(field => (
                  <div key={field.key} className="space-y-2">
                    <Label htmlFor={`${sectionKey}-${field.key}`}>{field.label}</Label>
                    {field.type === "textarea" ? (
                      <Textarea
                        id={`${sectionKey}-${field.key}`}
                        value={getContentValue(sectionKey, field.key)}
                        onChange={(e) => handleFieldChange(sectionKey, field.key, e.target.value)}
                        rows={4}
                      />
                    ) : (
                      <Input
                        id={`${sectionKey}-${field.key}`}
                        value={getContentValue(sectionKey, field.key)}
                        onChange={(e) => handleFieldChange(sectionKey, field.key, e.target.value)}
                      />
                    )}
                  </div>
                ))}

                <div className="pt-4 border-t">
                  <Button 
                    onClick={() => handleSaveSection(sectionKey)}
                    disabled={updateContent.isPending || !editedContent[sectionKey]}
                  >
                    {updateContent.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AdminContent;
