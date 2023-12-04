/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Carbon from '../index';

describe('Carbon Components React', () => {
  it('can be imported using the correct path', () => {
    expect(typeof Carbon).toBe('object');
  });

  it('should export components', () => {
    expect(Object.keys(Carbon).sort()).toMatchInlineSnapshot(`
      Array [
        "Accordion",
        "AccordionItem",
        "AccordionSkeleton",
        "ActionableNotification",
        "AspectRatio",
        "Breadcrumb",
        "BreadcrumbItem",
        "BreadcrumbSkeleton",
        "Button",
        "ButtonKinds",
        "ButtonSet",
        "ButtonSizes",
        "ButtonSkeleton",
        "ButtonTooltipAlignments",
        "ButtonTooltipPositions",
        "Checkbox",
        "CheckboxGroup",
        "CheckboxSkeleton",
        "ClassPrefix",
        "ClickableTile",
        "CodeSnippet",
        "CodeSnippetSkeleton",
        "Column",
        "ColumnHang",
        "ComboBox",
        "ComboButton",
        "ComposedModal",
        "ContainedList",
        "ContainedListItem",
        "Content",
        "ContentSwitcher",
        "ControlledPasswordInput",
        "Copy",
        "CopyButton",
        "DangerButton",
        "DataTable",
        "DataTableSkeleton",
        "DatePicker",
        "DatePickerInput",
        "DatePickerSkeleton",
        "DefinitionTooltip",
        "Dropdown",
        "DropdownSkeleton",
        "ErrorBoundary",
        "ErrorBoundaryContext",
        "ExpandableSearch",
        "ExpandableTile",
        "FileUploader",
        "FileUploaderButton",
        "FileUploaderDropContainer",
        "FileUploaderItem",
        "FileUploaderSkeleton",
        "Filename",
        "FilterableMultiSelect",
        "FlexGrid",
        "FluidForm",
        "Form",
        "FormContext",
        "FormGroup",
        "FormItem",
        "FormLabel",
        "GlobalTheme",
        "Grid",
        "GridSettings",
        "HStack",
        "Header",
        "HeaderContainer",
        "HeaderGlobalAction",
        "HeaderGlobalBar",
        "HeaderMenu",
        "HeaderMenuButton",
        "HeaderMenuItem",
        "HeaderName",
        "HeaderNavigation",
        "HeaderPanel",
        "HeaderSideNavItems",
        "Heading",
        "IconButton",
        "IconSkeleton",
        "IconSwitch",
        "IconTab",
        "IdPrefix",
        "InlineLoading",
        "InlineNotification",
        "Layer",
        "Link",
        "ListItem",
        "Loading",
        "Menu",
        "MenuButton",
        "MenuItem",
        "MenuItemDivider",
        "MenuItemGroup",
        "MenuItemRadioGroup",
        "MenuItemSelectable",
        "Modal",
        "ModalBody",
        "ModalFooter",
        "ModalHeader",
        "ModalWrapper",
        "MultiSelect",
        "NotificationActionButton",
        "NotificationButton",
        "NumberInput",
        "NumberInputSkeleton",
        "OrderedList",
        "OverflowMenu",
        "OverflowMenuItem",
        "Pagination",
        "PaginationNav",
        "PaginationSkeleton",
        "PasswordInput",
        "Popover",
        "PopoverContent",
        "PrefixContext",
        "PrimaryButton",
        "ProgressBar",
        "ProgressIndicator",
        "ProgressIndicatorSkeleton",
        "ProgressStep",
        "RadioButton",
        "RadioButtonGroup",
        "RadioButtonSkeleton",
        "RadioTile",
        "Row",
        "Search",
        "SearchSkeleton",
        "SecondaryButton",
        "Section",
        "Select",
        "SelectItem",
        "SelectItemGroup",
        "SelectSkeleton",
        "SelectableTile",
        "SideNav",
        "SideNavDetails",
        "SideNavDivider",
        "SideNavFooter",
        "SideNavHeader",
        "SideNavIcon",
        "SideNavItem",
        "SideNavItems",
        "SideNavLink",
        "SideNavLinkText",
        "SideNavMenu",
        "SideNavMenuItem",
        "SideNavSwitcher",
        "SkeletonIcon",
        "SkeletonPlaceholder",
        "SkeletonText",
        "SkipToContent",
        "Slider",
        "SliderSkeleton",
        "Stack",
        "StructuredListBody",
        "StructuredListCell",
        "StructuredListHead",
        "StructuredListInput",
        "StructuredListRow",
        "StructuredListSkeleton",
        "StructuredListWrapper",
        "Switch",
        "Switcher",
        "SwitcherDivider",
        "SwitcherItem",
        "Tab",
        "TabContent",
        "TabList",
        "TabPanel",
        "TabPanels",
        "Table",
        "TableActionList",
        "TableBatchAction",
        "TableBatchActions",
        "TableBody",
        "TableCell",
        "TableContainer",
        "TableExpandHeader",
        "TableExpandRow",
        "TableExpandedRow",
        "TableHead",
        "TableHeader",
        "TableRow",
        "TableSelectAll",
        "TableSelectRow",
        "TableSlugRow",
        "TableToolbar",
        "TableToolbarAction",
        "TableToolbarContent",
        "TableToolbarMenu",
        "TableToolbarSearch",
        "Tabs",
        "TabsSkeleton",
        "Tag",
        "TagSkeleton",
        "TextArea",
        "TextAreaSkeleton",
        "TextInput",
        "TextInputSkeleton",
        "Theme",
        "ThemeContext",
        "Tile",
        "TileAboveTheFoldContent",
        "TileBelowTheFoldContent",
        "TileGroup",
        "TimePicker",
        "TimePickerSelect",
        "ToastNotification",
        "Toggle",
        "ToggleSkeleton",
        "ToggleSmallSkeleton",
        "Toggletip",
        "ToggletipActions",
        "ToggletipButton",
        "ToggletipContent",
        "ToggletipLabel",
        "Tooltip",
        "TreeNode",
        "TreeView",
        "UnorderedList",
        "VStack",
        "types",
        "unstable_FeatureFlags",
        "unstable_Layout",
        "unstable_LayoutDirection",
        "unstable_OverflowMenuV2",
        "unstable_PageSelector",
        "unstable_Pagination",
        "unstable_Text",
        "unstable_TextDirection",
        "unstable__FluidComboBox",
        "unstable__FluidComboBoxSkeleton",
        "unstable__FluidDatePicker",
        "unstable__FluidDatePickerInput",
        "unstable__FluidDatePickerSkeleton",
        "unstable__FluidDropdown",
        "unstable__FluidDropdownSkeleton",
        "unstable__FluidMultiSelect",
        "unstable__FluidMultiSelectSkeleton",
        "unstable__FluidSelect",
        "unstable__FluidSelectSkeleton",
        "unstable__FluidTextArea",
        "unstable__FluidTextAreaSkeleton",
        "unstable__FluidTextInput",
        "unstable__FluidTextInputSkeleton",
        "unstable__FluidTimePicker",
        "unstable__FluidTimePickerSelect",
        "unstable__FluidTimePickerSkeleton",
        "unstable__Slug",
        "unstable__SlugActions",
        "unstable__SlugContent",
        "unstable_useFeatureFlag",
        "unstable_useFeatureFlags",
        "unstable_useLayoutDirection",
        "useContextMenu",
        "useIdPrefix",
        "useLayer",
        "usePrefix",
        "useTheme",
      ]
    `);
  });
});
