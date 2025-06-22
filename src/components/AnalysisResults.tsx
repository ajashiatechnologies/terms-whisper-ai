
import { AlertTriangle, Info, Shield, Eye, DollarSign, Users, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface AnalysisResultsProps {
  results: {
    summary: string;
    redFlags: string[];
    keyPoints: Array<{
      category: string;
      severity: 'low' | 'medium' | 'high';
      text: string;
    }>;
  };
}

const AnalysisResults = ({ results }: AnalysisResultsProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'data collection':
        return Eye;
      case 'data sharing':
        return Users;
      case 'payments':
        return DollarSign;
      default:
        return Shield;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Generate AI-powered simplified explanations for risky clauses
  const getSimplifiedExplanation = (category: string, severity: string, text: string) => {
    const explanations = {
      'data collection': {
        high: "⚠️ This means the company can collect a lot of your personal information, including what you browse and where you are. This could be used to build a detailed profile about you.",
        medium: "📊 The company collects some personal data but with reasonable limits. Your privacy has some protection.",
        low: "✅ Minimal data collection with clear purposes. Your privacy is well protected."
      },
      'data sharing': {
        high: "🚨 Your data can be shared with many other companies for marketing. You might get tons of ads and your info could end up anywhere.",
        medium: "⚠️ Some data sharing with partners, but with certain restrictions. Your data has moderate protection.",
        low: "✅ Very limited data sharing, only when necessary. Your data stays mostly private."
      },
      'payments': {
        high: "💳 Be careful! This might automatically charge you or make cancellation very difficult. You could end up paying for things you don't want.",
        medium: "💰 Some payment terms that require attention. Make sure you understand the billing cycle.",
        low: "✅ Clear and fair payment terms with easy cancellation options."
      },
      'user rights': {
        high: "🔒 You have very limited control over your data. It's hard to delete your information or get a copy of what they have.",
        medium: "📝 You have some rights but the process might be complicated. You can request your data but it takes time.",
        low: "✅ You have full control over your data with easy options to download or delete it."
      }
    };

    const categoryKey = category.toLowerCase().replace(/\s+/g, ' ');
    return explanations[categoryKey]?.[severity] || "📋 This clause requires careful review to understand its implications.";
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Info className="h-6 w-6 mr-2" />
            TL;DR Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-300 leading-relaxed">{results.summary}</p>
        </CardContent>
      </Card>

      {/* Red Flags */}
      {results.redFlags.length > 0 && (
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <AlertTriangle className="h-6 w-6 mr-2 text-red-400" />
              Red Flags
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {results.redFlags.map((flag, index) => (
              <div key={index} className="flex items-start space-x-3 bg-red-400/10 rounded-lg p-3 border border-red-400/20">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-slate-300">{flag}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Key Points with AI Explanations */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Shield className="h-6 w-6 mr-2" />
            Key Points Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {results.keyPoints.map((point, index) => {
            const IconComponent = getCategoryIcon(point.category);
            const explanation = getSimplifiedExplanation(point.category, point.severity, point.text);
            
            return (
              <div key={index} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="h-5 w-5 text-blue-400" />
                    <span className="font-medium text-white">{point.category}</span>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${getSeverityColor(point.severity)} text-xs`}
                  >
                    {point.severity.toUpperCase()}
                  </Badge>
                </div>
                
                {/* Original clause text */}
                <p className="text-slate-300 text-sm ml-7">{point.text}</p>
                
                {/* AI-powered simplified explanation */}
                {(point.severity === 'medium' || point.severity === 'high') && (
                  <div className="ml-7 bg-blue-400/10 rounded-lg p-3 border border-blue-400/20">
                    <div className="flex items-start space-x-2">
                      <Brain className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-blue-400 mb-1">AI Simplified</p>
                        <p className="text-slate-300 text-sm">{explanation}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {index < results.keyPoints.length - 1 && (
                  <Separator className="bg-white/10 mt-4" />
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisResults;
