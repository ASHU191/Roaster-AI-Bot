import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Zap, Heart, Send } from "lucide-react";
import roasterLogo from "@/assets/roasterbot-logo.png";

interface RoasterResponse {
  roast: string;
  realityCheck: string;
  tip: string;
  closingZinger: string;
}

const RoasterBot = () => {
  const [input, setInput] = useState("");
  const [isNiceMode, setIsNiceMode] = useState(false);
  const [response, setResponse] = useState<RoasterResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const roastResponses = [
    {
      roast: "Oh great, another victim of Netflix-induced ambition murder.",
      realityCheck: "Listen, your dreams aren't going to manifest themselves while you're binge-watching your third series this week. Every minute you spend 'planning' instead of doing is a minute your future self will want to travel back in time and smack you for.",
      tip: "Set a 25-minute timer right now and start working on ONE specific task. Just one. Don't overthink it.",
      closingZinger: "Your to-do list just applied for unemployment benefits."
    },
    {
      roast: "You're treating your goals like your ex - thinking about them but never actually committing.",
      realityCheck: "Motivation is overrated, discipline is underrated. Stop waiting for the 'perfect moment' because spoiler alert: it doesn't exist. Start messy, start scared, but just START.",
      tip: "Pick the smallest possible action you can take toward your goal right now. Like, embarrassingly small. Then do it.",
      closingZinger: "Sharma Ji's kid is already on step 7 while you're still buffering on step 1."
    },
    {
      roast: "You're procrastinating so hard, procrastination itself is getting second-hand embarrassment.",
      realityCheck: "That 'someday' you keep talking about? It's not a real day on the calendar. Your future self is begging you to stop being the villain in your own success story.",
      tip: "Use the 2-minute rule: if it takes less than 2 minutes, do it NOW. Build momentum with tiny wins.",
      closingZinger: "Your phone has more screen time than your actual screen time with productivity."
    }
  ];

  const niceResponses = [
    {
      roast: "Hey there, beautiful soul dealing with a case of the 'maybe laters' 💫",
      realityCheck: "I see you trying, and that matters more than you know. Sometimes we get stuck because we care so much about doing things perfectly. But progress beats perfection every single time, and you've got this!",
      tip: "Take three deep breaths, then choose one tiny step forward. Celebrate every small win - they add up faster than you think.",
      closingZinger: "You're not behind in life, you're just getting started. Keep going! ✨"
    },
    {
      roast: "Look at you, being human and struggling with motivation like the rest of us legends 🌟",
      realityCheck: "It's okay to have off days, but don't let them turn into off weeks. You have incredible potential just waiting to be unleashed. The world needs what you have to offer.",
      tip: "Write down three things you're grateful for, then tackle one small task. Gratitude creates momentum.",
      closingZinger: "Your comeback story starts with this next action. Make it count! 💪"
    }
  ];

  const generateResponse = () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const responses = isNiceMode ? niceResponses : roastResponses;
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setResponse(randomResponse);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-bg text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img 
              src={roasterLogo} 
              alt="RoasterBot" 
              className="w-16 h-16 animate-pulse-glow rounded-lg"
            />
            <h1 className="text-5xl font-bold bg-gradient-fire bg-clip-text text-transparent animate-float">
              RoasterBot
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-4">
            Your brutally honest AI coach that roasts you into greatness
          </p>
          
          {/* Mode Toggle */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              variant={!isNiceMode ? "default" : "outline"}
              onClick={() => setIsNiceMode(false)}
              className="flex items-center gap-2"
            >
              <Flame className="w-4 h-4" />
              Roast Mode
            </Button>
            <Button
              variant={isNiceMode ? "default" : "outline"}
              onClick={() => setIsNiceMode(true)}
              className="flex items-center gap-2"
            >
              <Heart className="w-4 h-4" />
              Nice Mode
            </Button>
          </div>
        </div>

        {/* Input Section */}
        <Card className="p-6 mb-8 border-border/50 bg-card/50 backdrop-blur">
          <div className="space-y-4">
            <label className="text-lg font-semibold text-foreground">
              What are you procrastinating on? Spill the tea ☕
            </label>
            <Textarea
              placeholder="Type here... RoasterBot is waiting to serve you some tough love (or gentle encouragement)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[120px] bg-input/50 border-border/50 focus:ring-2 focus:ring-primary/50"
            />
            <Button 
              onClick={generateResponse}
              disabled={!input.trim() || isLoading}
              className="w-full flex items-center gap-2 bg-gradient-fire hover:opacity-90 transition-opacity"
            >
              {isLoading ? (
                <>
                  <Zap className="w-4 h-4 animate-spin" />
                  Generating your reality check...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Get Roasted!
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Response Section */}
        {response && (
          <Card className="p-8 border-border/50 bg-card/50 backdrop-blur">
            <div className="space-y-6">
              {/* Roast */}
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-gradient-fire text-primary-foreground">
                  🔥 {isNiceMode ? "Gentle Reality" : "The Roast"}
                </Badge>
                <p className="text-lg font-medium text-accent">
                  {response.roast}
                </p>
              </div>

              {/* Reality Check */}
              <div className="space-y-2">
                <Badge variant="outline" className="border-electric-blue text-electric-blue">
                  💡 Reality Check
                </Badge>
                <p className="text-foreground leading-relaxed">
                  {response.realityCheck}
                </p>
              </div>

              {/* Tip */}
              <div className="space-y-2">
                <Badge variant="outline" className="border-cyber-green text-cyber-green">
                  🎯 Action Step
                </Badge>
                <p className="text-foreground font-medium">
                  {response.tip}
                </p>
              </div>

              {/* Closing Zinger */}
              <div className="pt-4 border-t border-border/30">
                <p className="text-center text-lg font-bold text-hot-pink italic">
                  {response.closingZinger}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-muted-foreground">
          <p>Built to roast you into your best self 🚀</p>
        </div>
      </div>
    </div>
  );
};

export default RoasterBot;