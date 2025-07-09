import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-8 px-4 md:px-8">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
            <Sparkles className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-foreground">
                Skeleton Symphony
            </h1>
        </div>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          A toolkit to dynamically generate, customize, and compare skeleton loaders for a better user experience.
        </p>
      </div>
    </header>
  );
};

export default Header;
