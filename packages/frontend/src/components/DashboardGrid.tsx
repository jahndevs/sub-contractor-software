import { useState, useCallback, useMemo, type ReactNode } from 'react';
import { Box, Grid, Text } from '@chakra-ui/react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { GripVertical } from 'lucide-react';

/* ── Types ──────────────────────────────────────────────── */

export type WidgetConfig = {
  id: string;
  section: string;
  colSpan: number;
  content: ReactNode;
};

export type SectionConfig = {
  id: string;
  title: string;
};

const STORAGE_KEY = 'dashboard-section-order';

type SectionOrder = Record<string, string[]>;

function loadOrder(): SectionOrder | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveOrder(order: SectionOrder) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
}

function reconcileSection(saved: string[] | undefined, defaults: string[]): string[] {
  if (!saved) return defaults;
  const currentIds = new Set(defaults);
  const filtered = saved.filter((id) => currentIds.has(id));
  const savedSet = new Set(filtered);
  const appended = defaults.filter((id) => !savedSet.has(id));
  return [...filtered, ...appended];
}

function SortableWidget({
  id,
  colSpan,
  isDragActive,
  children,
}: {
  id: string;
  colSpan: number;
  isDragActive: boolean;
  children: ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    gridColumn: `span ${colSpan}`,
    position: 'relative',
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition: isDragging ? 'none' : (transition ?? 'transform 250ms cubic-bezier(0.25, 1, 0.5, 1)'),
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <Box ref={setNodeRef} style={style}>
      <Box
        position="relative"
        borderRadius="xl"
        transition="box-shadow 0.2s ease, opacity 0.2s ease, transform 0.2s ease"
        boxShadow={isDragging ? '0 12px 28px rgba(0,0,0,0.12), 0 4px 10px rgba(0,0,0,0.08)' : 'none'}
        transform={isDragging ? 'scale(1.02)' : 'scale(1)'}
        opacity={isDragActive && !isDragging ? 0.6 : 1}
        css={{
          '& > .drag-handle': { opacity: 0 },
          '&:hover > .drag-handle': { opacity: 0.6 },
        }}
      >
        {/* Drag handle */}
        <Box
          {...attributes}
          {...listeners}
          className="drag-handle"
          position="absolute"
          top={2}
          right={2}
          zIndex={10}
          cursor="grab"
          p={1.5}
          borderRadius="md"
          bg="white"
          boxShadow="sm"
          _hover={{ bg: 'gray.100' }}
          transition="opacity 0.15s ease, background 0.15s ease"
          color="gray.400"
          aria-label="Drag to reorder"
        >
          <GripVertical size={16} />
        </Box>
        {children}
      </Box>
    </Box>
  );
}

function SortableSection({
  section,
  widgets,
  widgetMap,
  isDragActive,
  activeSection,
}: {
  section: SectionConfig;
  widgets: string[];
  widgetMap: Map<string, WidgetConfig>;
  isDragActive: boolean;
  activeSection: string | null;
}) {
  const isTargetSection = activeSection === section.id;
  const isOtherSectionDragging = isDragActive && !isTargetSection;

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={5}
      pb={6}
      transition="opacity 0.2s ease"
      opacity={isOtherSectionDragging ? 0.5 : 1}
    >
      <Box pb={2} borderBottomWidth="2px" borderColor="gray.200">
        <Text
          fontSize="xs"
          fontWeight="semibold"
          color="gray.400"
          letterSpacing="widest"
          textTransform="uppercase"
        >
          {section.title}
        </Text>
      </Box>

      <SortableContext items={widgets} strategy={rectSortingStrategy}>
        <Grid templateColumns="repeat(12, 1fr)" gap={5} alignItems="start">
          {widgets.map((id) => {
            const w = widgetMap.get(id);
            if (!w) return null;
            return (
              <SortableWidget
                key={w.id}
                id={w.id}
                colSpan={w.colSpan}
                isDragActive={isTargetSection && isDragActive}
              >
                {w.content}
              </SortableWidget>
            );
          })}
        </Grid>
      </SortableContext>
    </Box>
  );
}

export function DashboardGrid({
  sections,
  widgets,
}: {
  sections: SectionConfig[];
  widgets: WidgetConfig[];
}) {
  // Build lookup maps
  const widgetMap = useMemo(() => {
    const map = new Map<string, WidgetConfig>();
    for (const w of widgets) map.set(w.id, w);
    return map;
  }, [widgets]);

  const defaultSectionOrder = useMemo(() => {
    const map: SectionOrder = {};
    for (const s of sections) {
      map[s.id] = widgets.filter((w) => w.section === s.id).map((w) => w.id);
    }
    return map;
  }, [sections, widgets]);

  // Per-section order state
  const [sectionOrder, setSectionOrder] = useState<SectionOrder>(() => {
    const saved = loadOrder();
    const result: SectionOrder = {};
    for (const s of sections) {
      result[s.id] = reconcileSection(saved?.[s.id], defaultSectionOrder[s.id]);
    }
    return result;
  });

  const [isDragActive, setIsDragActive] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const widgetSectionMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const [sectionId, ids] of Object.entries(sectionOrder)) {
      for (const id of ids) map.set(id, sectionId);
    }
    return map;
  }, [sectionOrder]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      setIsDragActive(true);
      const section = widgetSectionMap.get(String(event.active.id)) ?? null;
      setActiveSection(section);
    },
    [widgetSectionMap],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setIsDragActive(false);
      setActiveSection(null);

      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const activeId = String(active.id);
      const overId = String(over.id);

      // Find which section these belong to
      const fromSection = widgetSectionMap.get(activeId);
      const toSection = widgetSectionMap.get(overId);

      // Only allow reorder within the same section
      if (!fromSection || !toSection || fromSection !== toSection) return;

      setSectionOrder((prev) => {
        const sectionItems = [...prev[fromSection]];
        const oldIndex = sectionItems.indexOf(activeId);
        const newIndex = sectionItems.indexOf(overId);
        const next = {
          ...prev,
          [fromSection]: arrayMove(sectionItems, oldIndex, newIndex),
        };
        saveOrder(next);
        return next;
      });
    },
    [widgetSectionMap],
  );

  const handleDragCancel = useCallback(() => {
    setIsDragActive(false);
    setActiveSection(null);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToParentElement]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <Box display="flex" flexDirection="column" gap={5}>
        {sections.map((section) => (
          <SortableSection
            key={section.id}
            section={section}
            widgets={sectionOrder[section.id]}
            widgetMap={widgetMap}
            isDragActive={isDragActive}
            activeSection={activeSection}
          />
        ))}
      </Box>
    </DndContext>
  );
}
