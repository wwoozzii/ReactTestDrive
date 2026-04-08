export interface Task {
  id: number;
  name: string;
  completed: boolean;
  createDat: number;
}
export interface TaskTool {
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onSave: (id: number, readySaveText: string) => void;
  onAdd: (readyAddText: string) => void;
  onSearch: (text: string) => void;
}
export type IdAction = (id: number) => void;
export type TextAction = (text: string) => void;
export type IdTextAction = (id: number, text: string) => void;
