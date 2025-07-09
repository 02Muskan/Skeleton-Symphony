import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MessageSquare } from 'lucide-react';

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`w-5 h-5 ${i < rating ? 'text-accent fill-accent' : 'text-muted-foreground/50'}`}
                />
            ))}
        </div>
    )
}

export default function SampleReview() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="https://placehold.co/48x48.png" alt="User Avatar" data-ai-hint="woman face" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">Sarah Adams</CardTitle>
            <CardDescription>Reviewed on June 12, 2024</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <StarRating rating={4} />
        <p className="text-foreground">
          This is an excellent product! The quality exceeded my expectations, and it arrived much faster than anticipated. I'm taking one star off because the packaging was slightly damaged, but the product itself was in perfect condition.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm">
          Helpful
        </Button>
        <Button size="sm" variant="outline">
          <MessageSquare className="mr-2 h-4 w-4" /> Reply
        </Button>
      </CardFooter>
    </Card>
  );
}
