# Flowbite Integration Guide for Adapted Strength

This document outlines how we're integrating Flowbite components and design patterns into the Adapted Strength application, themed with our brand colors.

## Brand Colors
- **Primary Red**: `bg-red-600`, `hover:bg-red-700`, `text-red-700`
- **Secondary Gray**: `text-gray-700`, `bg-gray-100`
- **Accent Colors**: `bg-red-100` for active states

## Implemented Flowbite Patterns

### Navigation Bar
- **Responsive Design**: Uses Flowbite's responsive navigation pattern
- **Hamburger Menu**: Appears on `lg` screens and below (1024px)
- **Logo Handling**: Proper aspect ratio with `object-contain`
- **Hover States**: Smooth transitions with Flowbite-style hover effects

```jsx
// Example: Responsive navigation item
<Link
  className="px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap hover:text-red-600 hover:bg-gray-100"
>
  Navigation Item
</Link>
```

### Buttons
- **Primary Button**: Red theme with proper hover states
- **Call-to-Action**: Enhanced styling for conversion optimization

```jsx
// Example: Flowbite-inspired CTA button
<PrimaryButton className="text-lg px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
  Get Started!
</PrimaryButton>
```

## Future Flowbite Components to Implement

### Forms
- **Login/Signup Forms**: Use Flowbite form components with red theming
- **Input Fields**: Consistent styling across all forms
- **Validation States**: Red-themed error states

### Cards
- **Service Cards**: For displaying gym services
- **Testimonial Cards**: For customer reviews
- **Pricing Cards**: For membership tiers

### Modals
- **Confirmation Dialogs**: For important actions
- **Image Galleries**: For movement library
- **User Profile Modals**: For quick profile access

### Tables
- **User Management**: Admin tables with Flowbite styling
- **Program Management**: Training program displays
- **Data Tables**: With sorting and filtering

## Implementation Guidelines

1. **Start with Flowbite Base**: Copy component structure from Flowbite docs
2. **Apply Brand Colors**: Replace default colors with Adapted Strength theme
3. **Maintain Accessibility**: Keep Flowbite's accessibility features
4. **Responsive First**: Ensure mobile-first responsive design
5. **Consistent Spacing**: Use Tailwind's spacing scale consistently

## Color Mapping

| Flowbite Default | Adapted Strength |
|------------------|------------------|
| `blue-600` | `red-600` |
| `blue-700` | `red-700` |
| `blue-100` | `red-100` |
| `gray-*` | Keep as-is |

## Resources

- [Flowbite Components](https://flowbite.com/docs/components/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Adapted Strength Brand Guidelines](./BrandGuidelines.md)

## Next Steps

1. Implement Flowbite form components for login/signup
2. Create consistent card components for services
3. Add Flowbite modal components for user interactions
4. Implement data tables for admin interfaces
5. Add loading states and skeleton components
