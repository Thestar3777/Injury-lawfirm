import { useState, useRef } from "react";
import { useUploadCmsImage } from "@/hooks/useCmsContent";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Loader2, Check, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ImageSlot {
  key: string;
  label: string;
  description: string;
  currentSrc?: string;
}

const imageSlots: ImageSlot[] = [
  {
    key: "hero-background",
    label: "Hero Background",
    description: "Main background image for the homepage hero section"
  },
  {
    key: "attorney-photo",
    label: "Attorney Photo",
    description: "Professional photo of the lead attorney"
  },
  {
    key: "logo",
    label: "Logo",
    description: "Firm logo displayed in header and footer"
  }
];

const AdminImages = () => {
  const uploadImage = useUploadCmsImage();
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<Record<string, string>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleFileSelect = async (key: string, file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setUploadingKey(key);

    try {
      const extension = file.name.split(".").pop();
      const path = `${key}.${extension}`;
      
      const publicUrl = await uploadImage.mutateAsync({ file, path });
      
      setUploadedImages(prev => ({
        ...prev,
        [key]: publicUrl
      }));
      
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploadingKey(null);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Image Manager</h1>
        <p className="text-muted-foreground mt-1">Upload and manage website images</p>
      </div>

      <div className="grid gap-6">
        {imageSlots.map((slot) => (
          <Card key={slot.key}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                {slot.label}
              </CardTitle>
              <CardDescription>{slot.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-6">
                {/* Preview */}
                <div className="w-48 h-32 bg-muted rounded-lg overflow-hidden flex items-center justify-center border border-border">
                  {uploadedImages[slot.key] ? (
                    <img 
                      src={uploadedImages[slot.key]} 
                      alt={slot.label}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-muted-foreground text-sm text-center p-4">
                      <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      No image uploaded
                    </div>
                  )}
                </div>

                {/* Upload controls */}
                <div className="flex-1 space-y-4">
                  <div>
                    <Input
                      ref={(el) => { fileInputRefs.current[slot.key] = el; }}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileSelect(slot.key, file);
                      }}
                    />
                    <Button
                      variant="outline"
                      onClick={() => fileInputRefs.current[slot.key]?.click()}
                      disabled={uploadingKey === slot.key}
                    >
                      {uploadingKey === slot.key ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : uploadedImages[slot.key] ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Replace Image
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Image
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Recommended: High-quality images, max 5MB. JPG, PNG, or WebP format.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 border-dashed">
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">
            After uploading images, they will be available for use on your website.
            <br />
            <span className="text-sm">Note: Some images may require code updates to display.</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminImages;
