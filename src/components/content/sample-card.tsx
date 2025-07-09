import Image from 'next/image';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThumbsUp } from 'lucide-react';

export default function SampleCard() {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatar.png" alt="User Avatar" data-ai-hint="person face" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">John Doe</CardTitle>
            <CardDescription>Posted 2 hours ago</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="aspect-video relative w-full">
        <img src="/lone-tree.jpg" alt="Sample image" style={{ objectFit: 'cover', width: '100%', height: 'auto' }} />

        </div>
        <div className="p-6">
            <p className="text-foreground">This is the actual content of the card. It loads after a simulated delay to demonstrate the effect of skeleton screens. Pretty cool, right?</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button>
          <ThumbsUp className="mr-2 h-4 w-4" /> Like
        </Button>
      </CardFooter>
    </Card>
  );
}
