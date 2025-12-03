# ImageGrid Component - Usage Guide

The ImageGrid component has been successfully refactored to support multiple document types with proper TypeScript typing using Sanity TypeGen generated types.

## ✅ **Updated Features**

### **Type Safety**

- Uses `ARTWORKS_QUERYResult`, `BIOGRAPHIES_QUERYResult`, and `STUDIOS_QUERYResult` from Sanity TypeGen
- Proper union types for handling different document schemas
- Type guards for safe property access

### **Component Interface**

```typescript
interface ImageGridProps {
  artworks?: ARTWORKS_QUERYResult;
  biographies?: BIOGRAPHIES_QUERYResult;
  studios?: STUDIOS_QUERYResult;
  itemType?: "artwork" | "biography" | "studio";
  recent?: boolean;
}
```

## 📖 **Usage Examples**

### **1. Artwork Grid (existing)**

```tsx
import { ImageGrid } from "@/components/common/ImageGrid";
import { ARTWORKS_QUERY } from "@/sanity/lib/queries";

// In your page component
const artworks = await sanityFetch({ query: ARTWORKS_QUERY });

<ImageGrid artworks={artworks} itemType="artwork" />;
```

### **2. Biography Grid**

```tsx
import { ImageGrid } from "@/components/common/ImageGrid";
import { BIOGRAPHIES_QUERY } from "@/sanity/lib/queries";

const biographies = await sanityFetch({ query: BIOGRAPHIES_QUERY });

<ImageGrid biographies={biographies} itemType="biography" />;
```

### **3. Studio Grid**

```tsx
import { ImageGrid } from "@/components/common/ImageGrid";
import { STUDIOS_QUERY } from "@/sanity/lib/queries";

const studios = await sanityFetch({ query: STUDIOS_QUERY });

<ImageGrid studios={studios} itemType="studio" />;
```

### **4. Recent/Priority Mode**

```tsx
// Show only 12 most recent items with priority sorting
<ImageGrid artworks={artworks} itemType="artwork" recent={true} />
```

## 🔧 **Technical Implementation**

### **Type Handling**

- **Union Type**: `GridItem = ARTWORKS_QUERYResult[number] | BIOGRAPHIES_QUERYResult[number] | STUDIOS_QUERYResult[number]`
- **Type Guards**: Uses `'property' in item` checks for safe property access
- **Conditional Logic**: Different behaviors based on `itemType` prop

### **Dynamic Features**

- **Routing**: Generates URLs based on itemType (`/artwork/[slug]`, `/biography/[slug]`, `/studio/[slug]`)
- **Filtering**:
  - Artworks: By categories
  - Biographies: By type (group, solo, etc.)
  - Studios: Generic filtering
- **Sorting**:
  - Artworks: Priority, date, major exhibition
  - Other types: Generic title sorting

### **Backward Compatibility**

- All existing artwork usage continues to work unchanged
- Maintains all existing functionality and styling
- Preserves search, filtering, and carousel features

## 📁 **Updated Files**

1. **`/src/components/common/imageGrid/index.tsx`** - Main component with polymorphic support
2. **`/src/components/common/imageGrid/types.ts`** - Type definitions (optional, for future enhancement)
3. **`/src/app/biography/page.tsx`** - Updated to use ImageGrid instead of BiographiesList
4. **`/src/app/studio-archive/page.tsx`** - Example studio page implementation

## 🎯 **Next Steps**

The component is now fully functional and type-safe. You can:

1. **Test the biography page**: The existing `/biography` route now uses ImageGrid
2. **Create studio routes**: Use the studio-archive example as a template
3. **Customize filtering**: Add more specific filtering logic for different document types
4. **Extend types**: Replace the generic union types with more specific interfaces if needed

All TypeScript compilation errors have been resolved and the component maintains full backward compatibility while adding new flexibility! 🚀
