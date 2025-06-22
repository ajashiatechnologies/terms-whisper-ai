
import { useState } from 'react';
import { Upload, FileText, Link, AlertTriangle, Shield, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import DocumentUpload from '@/components/DocumentUpload';
import AnalysisResults from '@/components/AnalysisResults';
import RiskScore from '@/components/RiskScore';

const Index = () => {
  const [documentText, setDocumentText] = useState('');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadMethod, setUploadMethod] = useState('paste');

  const handleAnalyze = async () => {
    if (!documentText.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate AI analysis delay
    setTimeout(() => {
      // Mock analysis results for demonstration
      const mockResults = {
        riskScore: 7,
        summary: "This privacy policy has several concerning clauses regarding data collection and sharing with third parties.",
        redFlags: [
          "Data shared with unlimited third parties",
          "No clear data deletion policy",
          "Automatic renewal with difficult cancellation"
        ],
        keyPoints: [
          { 
            category: "Data Collection", 
            severity: "high", 
            text: "Collects personal data, browsing history, and location data" 
          },
          { 
            category: "Data Sharing", 
            severity: "high", 
            text: "May share data with third-party partners for marketing purposes" 
          },
          { 
            category: "User Rights", 
            severity: "medium", 
            text: "Limited user control over data deletion and portability" 
          }
        ]
      };
      setAnalysisResults(mockResults);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-400 mr-4" />
            <h1 className="text-4xl font-bold text-white">PolicyLens</h1>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Understand what you're agreeing to with AI-powered analysis of Terms & Conditions and Privacy Policies
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="h-6 w-6 mr-2" />
                  Document Input
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs value={uploadMethod} onValueChange={setUploadMethod} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-white/10">
                    <TabsTrigger value="paste" className="text-white data-[state=active]:bg-white/20">
                      Paste Text
                    </TabsTrigger>
                    <TabsTrigger value="upload" className="text-white data-[state=active]:bg-white/20">
                      Upload File
                    </TabsTrigger>
                    <TabsTrigger value="url" className="text-white data-[state=active]:bg-white/20">
                      From URL
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="paste" className="space-y-4">
                    <Textarea
                      placeholder="Paste your Terms & Conditions or Privacy Policy here..."
                      value={documentText}
                      onChange={(e) => setDocumentText(e.target.value)}
                      className="min-h-[300px] bg-white/10 border-white/20 text-white placeholder:text-slate-400 resize-none"
                    />
                  </TabsContent>
                  
                  <TabsContent value="upload" className="space-y-4">
                    <DocumentUpload onTextExtracted={setDocumentText} />
                  </TabsContent>
                  
                  <TabsContent value="url" className="space-y-4">
                    <Input
                      placeholder="Enter URL to privacy policy or terms..."
                      className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                    />
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Link className="h-4 w-4 mr-2" />
                      Fetch Document
                    </Button>
                  </TabsContent>
                </Tabs>

                <Button 
                  onClick={handleAnalyze}
                  disabled={!documentText.trim() || isAnalyzing}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing Document...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Analyze Document
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            <div className="space-y-6">
              {analysisResults ? (
                <>
                  <RiskScore score={analysisResults.riskScore} />
                  <AnalysisResults results={analysisResults} />
                </>
              ) : (
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Shield className="h-16 w-16 text-slate-400 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Ready to Analyze</h3>
                    <p className="text-slate-400 text-center">
                      Upload or paste a document to get started with AI-powered analysis
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-center">
            <CardContent className="pt-6">
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">AI-Powered Analysis</h3>
              <p className="text-slate-400">Advanced AI identifies key clauses and potential risks</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-center">
            <CardContent className="pt-6">
              <AlertTriangle className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Red Flag Detection</h3>
              <p className="text-slate-400">Automatically spots concerning terms and conditions</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-center">
            <CardContent className="pt-6">
              <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Risk Scoring</h3>
              <p className="text-slate-400">Clear numerical risk assessment from 1-10</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
