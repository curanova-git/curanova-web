"use client";

import { useState } from "react";

interface ContentEditorProps {
  title: string;
  description: string;
  initialData: Record<string, unknown>;
  onSave: (data: Record<string, unknown>) => Promise<void>;
  fields: FieldConfig[];
}

interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "textarea" | "array" | "object-array";
  placeholder?: string;
  arrayFields?: FieldConfig[];
}

export default function ContentEditor({
  title,
  description,
  initialData,
  onSave,
  fields,
}: ContentEditorProps) {
  const [data, setData] = useState<Record<string, unknown>>(initialData);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (name: string, value: unknown) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (name: string, index: number, value: string) => {
    const arr = [...(data[name] as string[])];
    arr[index] = value;
    handleChange(name, arr);
  };

  const handleAddArrayItem = (name: string) => {
    const arr = [...(data[name] as string[]), ""];
    handleChange(name, arr);
  };

  const handleRemoveArrayItem = (name: string, index: number) => {
    const arr = (data[name] as string[]).filter((_, i) => i !== index);
    handleChange(name, arr);
  };

  const handleObjectArrayChange = (
    name: string,
    index: number,
    field: string,
    value: unknown
  ) => {
    const arr = [...(data[name] as Record<string, unknown>[])];
    arr[index] = { ...arr[index], [field]: value };
    handleChange(name, arr);
  };

  const handleAddObjectArrayItem = (name: string, arrayFields: FieldConfig[]) => {
    const newItem: Record<string, unknown> = {};
    arrayFields.forEach((field) => {
      newItem[field.name] = field.type === "array" ? [] : "";
    });
    const arr = [...(data[name] as Record<string, unknown>[]), newItem];
    handleChange(name, arr);
  };

  const handleRemoveObjectArrayItem = (name: string, index: number) => {
    const arr = (data[name] as Record<string, unknown>[]).filter((_, i) => i !== index);
    handleChange(name, arr);
  };

  const handleNestedArrayChange = (
    parentName: string,
    parentIndex: number,
    fieldName: string,
    itemIndex: number,
    value: string
  ) => {
    const arr = [...(data[parentName] as Record<string, unknown>[])];
    const nestedArr = [...(arr[parentIndex][fieldName] as string[])];
    nestedArr[itemIndex] = value;
    arr[parentIndex] = { ...arr[parentIndex], [fieldName]: nestedArr };
    handleChange(parentName, arr);
  };

  const handleAddNestedArrayItem = (
    parentName: string,
    parentIndex: number,
    fieldName: string
  ) => {
    const arr = [...(data[parentName] as Record<string, unknown>[])];
    const nestedArr = [...(arr[parentIndex][fieldName] as string[]), ""];
    arr[parentIndex] = { ...arr[parentIndex], [fieldName]: nestedArr };
    handleChange(parentName, arr);
  };

  const handleRemoveNestedArrayItem = (
    parentName: string,
    parentIndex: number,
    fieldName: string,
    itemIndex: number
  ) => {
    const arr = [...(data[parentName] as Record<string, unknown>[])];
    const nestedArr = (arr[parentIndex][fieldName] as string[]).filter(
      (_, i) => i !== itemIndex
    );
    arr[parentIndex] = { ...arr[parentIndex], [fieldName]: nestedArr };
    handleChange(parentName, arr);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await onSave(data);
      setMessage({ type: "success", text: "Content saved successfully!" });
    } catch {
      setMessage({ type: "error", text: "Failed to save content. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  const renderField = (field: FieldConfig, value: unknown) => {
    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            value={(value as string) || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent outline-none"
          />
        );

      case "textarea":
        return (
          <textarea
            value={(value as string) || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent outline-none resize-y"
          />
        );

      case "array":
        return (
          <div className="space-y-2">
            {((value as string[]) || []).map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange(field.name, index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveArrayItem(field.name, index)}
                  className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddArrayItem(field.name)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Item
            </button>
          </div>
        );

      case "object-array":
        return (
          <div className="space-y-4">
            {((value as Record<string, unknown>[]) || []).map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium text-gray-700">Item {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveObjectArrayItem(field.name, index)}
                    className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors text-sm"
                  >
                    Remove
                  </button>
                </div>
                <div className="space-y-4">
                  {field.arrayFields?.map((subField) => (
                    <div key={subField.name}>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        {subField.label}
                      </label>
                      {subField.type === "text" && (
                        <input
                          type="text"
                          value={(item[subField.name] as string) || ""}
                          onChange={(e) =>
                            handleObjectArrayChange(field.name, index, subField.name, e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent outline-none"
                        />
                      )}
                      {subField.type === "textarea" && (
                        <textarea
                          value={(item[subField.name] as string) || ""}
                          onChange={(e) =>
                            handleObjectArrayChange(field.name, index, subField.name, e.target.value)
                          }
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent outline-none resize-y"
                        />
                      )}
                      {subField.type === "array" && (
                        <div className="space-y-2">
                          {((item[subField.name] as string[]) || []).map((nestedItem, nestedIndex) => (
                            <div key={nestedIndex} className="flex gap-2">
                              <input
                                type="text"
                                value={nestedItem}
                                onChange={(e) =>
                                  handleNestedArrayChange(
                                    field.name,
                                    index,
                                    subField.name,
                                    nestedIndex,
                                    e.target.value
                                  )
                                }
                                className="flex-1 px-3 py-1.5 border border-gray-200 rounded focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent outline-none text-sm"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveNestedArrayItem(field.name, index, subField.name, nestedIndex)
                                }
                                className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => handleAddNestedArrayItem(field.name, index, subField.name)}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors text-sm"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddObjectArrayItem(field.name, field.arrayFields || [])}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#14b8a6]/10 text-[#14b8a6] rounded-lg hover:bg-[#14b8a6]/20 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Item
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="space-y-6">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
              </label>
              {renderField(field, data[field.name])}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#14b8a6] text-white rounded-lg hover:bg-[#14b8a6]/90 transition-colors disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
