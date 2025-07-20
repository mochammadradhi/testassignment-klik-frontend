import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  addGroup,
  removeGroup,
  addMenuItem,
  removeMenuItem,
} from "@/redux/features/menuSlice";

export default function Settings() {
  const dispatch = useAppDispatch();
  const { groups } = useAppSelector((state) => state.menu);
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [newItem, setNewItem] = useState({
    name: "",
    price: 0,
    description: "",
  });

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      dispatch(addGroup({ name: newGroupName }));
      setNewGroupName("");
    }
  };

  const handleAddItem = () => {
    if (selectedGroup && newItem.name.trim() && newItem.price > 0) {
      dispatch(addMenuItem({ groupId: selectedGroup, item: newItem }));
      setNewItem({ name: "", price: 0, description: "" });
    }
  };

  return (
    <div className="p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Menu Group Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="New group name"
            />
            <Button onClick={handleAddGroup}>Add Group</Button>
          </div>

          <div className="space-y-2">
            <Label>Existing Groups</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className="border p-3 rounded flex justify-between items-center"
                >
                  <span>{group.name}</span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => dispatch(removeGroup(group.id))}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Menu Item Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Select Group</Label>
              <select
                className="border p-2 rounded w-full"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
                <option value="">Select a group</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedGroup && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Item Name</Label>
                  <Input
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                    placeholder="Item name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input
                    type="number"
                    value={newItem.price}
                    onChange={(e) =>
                      setNewItem({ ...newItem, price: Number(e.target.value) })
                    }
                    placeholder="Price"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    value={newItem.description}
                    onChange={(e) =>
                      setNewItem({ ...newItem, description: e.target.value })
                    }
                    placeholder="Description (optional)"
                  />
                </div>
              </div>
              <Button onClick={handleAddItem}>Add Item</Button>

              <div className="space-y-2">
                <Label>
                  Items in {groups.find((g) => g.id === selectedGroup)?.name}
                </Label>
                <div className="border rounded divide-y">
                  {groups
                    .find((g) => g.id === selectedGroup)
                    ?.items.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            ${item.price.toFixed(2)}
                          </p>
                          {item.description && (
                            <p className="text-sm text-gray-500">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            dispatch(
                              removeMenuItem({
                                groupId: selectedGroup,
                                itemId: item.id,
                              })
                            )
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
