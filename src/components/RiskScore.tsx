
import { Shield, AlertTriangle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RiskScoreProps {
  score: number;
}

const RiskScore = ({ score }: RiskScoreProps) => {
  const getRiskLevel = (score: number) => {
    if (score <= 3) return { level: 'Low', color: 'text-green-400', bg: 'bg-green-400/20', icon: Shield };
    if (score <= 6) return { level: 'Medium', color: 'text-yellow-400', bg: 'bg-yellow-400/20', icon: AlertTriangle };
    return { level: 'High', color: 'text-red-400', bg: 'bg-red-400/20', icon: XCircle };
  };

  const risk = getRiskLevel(score);
  const IconComponent = risk.icon;
  
  // Calculate percentage for progress bar
  const percentage = (score / 10) * 100;

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <IconComponent className={`h-6 w-6 mr-2 ${risk.color}`} />
          Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-slate-300">Overall Risk Score</span>
          <div className="flex items-center space-x-2">
            <span className={`text-2xl font-bold ${risk.color}`}>{score}</span>
            <span className="text-slate-400">/10</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ease-out ${
              score <= 3 ? 'bg-green-400' : 
              score <= 6 ? 'bg-yellow-400' : 'bg-red-400'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <div className={`${risk.bg} rounded-lg p-3 flex items-center`}>
          <IconComponent className={`h-5 w-5 mr-2 ${risk.color}`} />
          <div>
            <span className={`font-semibold ${risk.color}`}>{risk.level} Risk</span>
            <p className="text-slate-300 text-sm mt-1">
              {score <= 3 && "This document appears to have reasonable terms with minimal concerning clauses."}
              {score > 3 && score <= 6 && "Some concerning clauses found. Review highlighted sections carefully."}
              {score > 6 && "Multiple red flags detected. Consider seeking legal advice before agreeing."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskScore;
