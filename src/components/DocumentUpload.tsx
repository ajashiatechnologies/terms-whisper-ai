
import { useState, useCallback } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DocumentUploadProps {
  onTextExtracted: (text: string) => void;
}

const DocumentUpload = ({ onTextExtracted }: DocumentUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    
    // For demo purposes, we'll simulate file reading
    // In a real app, you'd use FileReader API or send to backend
    const mockText = `Privacy Policy

Last updated: [Date]

1. Information We Collect
We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.

2. How We Use Your Information
We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.

3. Information Sharing
We may share your information with third parties in certain circumstances, including with your consent, for legal compliance, or to protect our rights.

4. Data Security
We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

5. Your Rights
You have certain rights regarding your personal information, including the right to access, update, or delete your information.

Contact Us: For questions about this Privacy Policy, please contact us at privacy@example.com`;
    
    onTextExtracted(mockText);
  };

  const removeFile = () => {
    setUploadedFile(null);
    onTextExtracted('');
  };

  return (
    <div className="space-y-4">
      {!uploadedFile ? (
        <Card
          className={`border-2 border-dashed transition-all duration-200 cursor-pointer ${
            isDragOver 
              ? 'border-blue-400 bg-blue-50/10' 
              : 'border-white/30 bg-white/5 hover:border-white/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Upload className={`h-12 w-12 mb-4 transition-colors ${
              isDragOver ? 'text-blue-400' : 'text-slate-400'
            }`} />
            <h3 className="text-lg font-semibold text-white mb-2">
              Drop your file here
            </h3>
            <p className="text-slate-400 mb-4 text-center">
              Supports PDF, TXT, DOC files up to 10MB
            </p>
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => document.getElementById('file-input')?.click()}
            >
              Choose File
            </Button>
            <input
              id="file-input"
              type="file"
              accept=".pdf,.txt,.doc,.docx"
              onChange={handleFileInput}
              className="hidden"
            />
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white/10 border-white/20">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-400 mr-3" />
              <div>
                <p className="text-white font-medium">{uploadedFile.name}</p>
                <p className="text-slate-400 text-sm">
                  {(uploadedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DocumentUpload;
