'use client';

import React, { useState, useEffect } from 'react';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, PanelsTopLeft, Rows3, FileText, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import CardSkeleton from '@/components/skeletons/card-skeleton';
import TableSkeleton from '@/components/skeletons/table-skeleton';
import { Skeleton } from './ui/skeleton';

type ComponentType = 'Card' | 'Table' | 'Form';

const availableComponents: { type: ComponentType; icon: React.ReactNode; name: string }[] = [
  { type: 'Card', icon: <PanelsTopLeft className="h-5 w-5" />, name: 'Info Card' },
  { type: 'Table', icon: <Rows3 className="h-5 w-5" />, name: 'Data Table' },
  { type: 'Form', icon: <FileText className="h-5 w-5" />, name: 'Input Form' },
];

function DraggableTool({ type, icon, name }: { type: ComponentType; icon: React.ReactNode; name: string }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `tool-${type}`,
    data: { type, isTool: true },
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} className="flex items-center gap-3 p-2 rounded-md bg-muted hover:bg-accent cursor-grab">
      {icon}
      <span>{name}</span>
    </div>
  );
}

function FormSkeleton() {
    return (
        <Card className="w-full">
            <CardHeader>
                <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-10 w-full" />
                </div>
                 <Skeleton className="h-10 w-28" />
            </CardContent>
        </Card>
    );
}

function SortableItem({ id, type }: { id: string; type: ComponentType }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id, data: { type, isSortable: true } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 'auto',
  };

  const renderComponent = () => {
    switch (type) {
      case 'Card':
        return <CardSkeleton />;
      case 'Table':
        return <TableSkeleton />;
      case 'Form':
        return <FormSkeleton />;
      default:
        return null;
    }
  };

  return (
    <div ref={setNodeRef} style={style} className="relative p-2 bg-card border rounded-lg shadow-sm">
      <div {...attributes} {...listeners} className="absolute top-1/2 -translate-y-1/2 right-2 cursor-grab p-1 text-muted-foreground hover:bg-accent rounded-md">
        <GripVertical className="h-5 w-5" />
      </div>
      {renderComponent()}
    </div>
  );
}


function Toolbox() {
    return (
        <div className="md:col-span-1 p-4 rounded-lg border bg-muted/50">
            <h3 className="text-lg font-semibold mb-4">Toolbox</h3>
            <div className="space-y-3">
            {availableComponents.map(comp => (
                <DraggableTool key={comp.type} type={comp.type} icon={comp.icon} name={comp.name} />
            ))}
            </div>
        </div>
    );
}

function Canvas({ items }: { items: { id: string; type: ComponentType }[] }) {
    const { setNodeRef } = useDroppable({
        id: 'canvas-droppable',
    });

    return (
        <div ref={setNodeRef} className="md:col-span-2 lg:col-span-3 p-4 rounded-lg border-2 border-dashed min-h-[400px] bg-background/50">
            <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-4">
                    {items.length > 0 ? items.map(({ id, type }) => (
                        <SortableItem key={id} id={id} type={type} />
                    )) : (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground pt-24 text-center">
                            <p>Drop components here to build your layout.</p>
                        </div>
                    )}
                </div>
            </SortableContext>
        </div>
    );
}


export default function LayoutBuilder() {
  const [canvasItems, setCanvasItems] = useState<{ id: string; type: ComponentType }[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs once on the client after the component mounts
    setIsClient(true);
  }, []);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const isDraggingTool = active.data.current?.isTool;
    const isDraggingItem = active.data.current?.isSortable;

    // Dragging a new tool to the canvas
    if (isDraggingTool) {
      const type = active.data.current?.type as ComponentType;
      const newItem = { id: `item-${Date.now()}`, type };
      
      // Dropping on an existing item
      if (over.data.current?.isSortable) {
        const overIndex = canvasItems.findIndex(item => item.id === over.id);
        setCanvasItems(items => {
            const newItems = [...items];
            newItems.splice(overIndex, 0, newItem);
            return newItems;
        });
      } 
      // Dropping on the canvas itself
      else if (over.id === 'canvas-droppable') {
        setCanvasItems(items => [...items, newItem]);
      }
      return;
    }

    // Reordering existing items
    if (isDraggingItem && over.data.current?.isSortable) {
      if (active.id !== over.id) {
        setCanvasItems((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }
  }

  const DragAndDropPlaceholder = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div className="md:col-span-1 p-4 rounded-lg border bg-muted/50">
            <h3 className="text-lg font-semibold mb-4">Toolbox</h3>
            <div className="space-y-3">
                {availableComponents.map(comp => (
                    <div key={comp.type} className="flex items-center gap-3 p-2 rounded-md bg-muted">
                        {comp.icon}
                        <span>{comp.name}</span>
                    </div>
                ))}
            </div>
        </div>
        <div className="md:col-span-2 lg:col-span-3 p-4 rounded-lg border-2 border-dashed min-h-[400px] bg-background/50 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center text-muted-foreground text-center">
                <Loader2 className="h-8 w-8 animate-spin mb-4" />
                <p>Loading Layout Builder...</p>
            </div>
        </div>
    </div>
  );

  return (
    <Card className="w-full">
        <CardHeader>
            <CardTitle className="font-headline">Layout Builder</CardTitle>
            <CardDescription>Drag components from the toolbox to the canvas to build a custom layout skeleton.</CardDescription>
        </CardHeader>
        <CardContent>
            {isClient ? (
                <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        <Toolbox />
                        <Canvas items={canvasItems} />
                    </div>
                </DndContext>
            ) : (
                <DragAndDropPlaceholder />
            )}
        </CardContent>
    </Card>
  );
}
