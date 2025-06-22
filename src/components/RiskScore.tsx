
import { Shield, AlertTriangle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RiskScoreProps {
  score: number;
}

const RiskScore = ({ score }: RiskScoreProps) => {
  const getRiskLevel = (score: number) => {
    if (score <= 3) return { level: 'Low', color: 'text-green-400', strokeColor: '#4ade80', icon: Shield };
    if (score <= 6) return { level: 'Medium', color: 'text-yellow-400', strokeColor: '#facc15', icon: AlertTriangle };
    return { level: 'High', color: 'text-red-400', strokeColor: '#f87171', icon: XCircle };
  };

  const risk = getRiskLevel(score);
  const IconComponent = risk.icon;
  
  // Calculate percentage for circular progress
  const percentage = (score / 10) * 100;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <IconComponent className={`h-6 w-6 mr-2 ${risk.color}`} />
          Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Circular Progress */}
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke={risk.strokeColor}
                strokeWidth="8"
                fill="none"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${risk.color}`}>{score}</span>
              <span className="text-slate-400 text-sm">/10</span>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className={`inline-flex items-center px-4 py-2 rounded-full ${risk.color.replace('text-', 'bg-').replace('-400', '-400/20')} border border-current/20`}>
            <IconComponent className={`h-4 w-4 mr-2 ${risk.color}`} />
            <span className={`font-semibold ${risk.color}`}>{risk.level} Risk</span>
          </div>
          <p className="text-slate-300 text-sm mt-3">
            {score <= 3 && "This document appears to have reasonable terms with minimal concerning clauses."}
            {score > 3 && score <= 6 && "Some concerning clauses found. Review highlighted sections carefully."}
            {score > 6 && "Multiple red flags detected. Consider seeking legal advice before agreeing."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskScore;
