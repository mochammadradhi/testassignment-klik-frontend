import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
}

interface MenuGroup {
  id: string;
  name: string;
  items: MenuItem[];
}

interface MenuState {
  groups: MenuGroup[];
}

// Load initial state from localStorage or use default
const loadInitialState = (): MenuState => {
  const savedMenu = localStorage.getItem("menuData");
  return savedMenu
    ? JSON.parse(savedMenu)
    : {
        groups: [
          {
            id: "1",
            name: "Appetizers",
            items: [
              { id: "1-1", name: "Bruschetta", price: 8.99 },
              { id: "1-2", name: "Calamari", price: 12.99 },
            ],
          },
          {
            id: "2",
            name: "Main Courses",
            items: [
              { id: "2-1", name: "Spaghetti Carbonara", price: 16.99 },
              { id: "2-2", name: "Grilled Salmon", price: 22.99 },
            ],
          },
        ],
      };
};

const initialState: MenuState = loadInitialState();

// Function to save menu to localStorage
const saveMenuToLocalStorage = (state: MenuState) => {
  localStorage.setItem("menuData", JSON.stringify(state));
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<{ name: string }>) => {
      const newGroup: MenuGroup = {
        id: Date.now().toString(),
        name: action.payload.name,
        items: [],
      };
      state.groups.push(newGroup);
      saveMenuToLocalStorage(state);
    },
    removeGroup: (state, action: PayloadAction<string>) => {
      state.groups = state.groups.filter(
        (group) => group.id !== action.payload
      );
      saveMenuToLocalStorage(state);
    },
    addMenuItem: (
      state,
      action: PayloadAction<{
        groupId: string;
        item: Omit<MenuItem, "id">;
      }>
    ) => {
      const group = state.groups.find((g) => g.id === action.payload.groupId);
      if (group) {
        group.items.push({
          id: `${action.payload.groupId}-${Date.now()}`,
          ...action.payload.item,
        });
        saveMenuToLocalStorage(state);
      }
    },
    removeMenuItem: (
      state,
      action: PayloadAction<{
        groupId: string;
        itemId: string;
      }>
    ) => {
      const group = state.groups.find((g) => g.id === action.payload.groupId);
      if (group) {
        group.items = group.items.filter(
          (item) => item.id !== action.payload.itemId
        );
        saveMenuToLocalStorage(state);
      }
    },
    // Add a new action to initialize from localStorage
    initializeMenu: (state) => {
      const savedMenu = localStorage.getItem("menuData");
      if (savedMenu) {
        return JSON.parse(savedMenu);
      }
      return state;
    },
  },
});

export const {
  addGroup,
  removeGroup,
  addMenuItem,
  removeMenuItem,
  initializeMenu,
} = menuSlice.actions;

export default menuSlice.reducer;
