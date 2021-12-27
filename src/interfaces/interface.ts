export interface IElementType {
  id: string;
  name: string;
  type: string;
  parentId: string;
  content?: string;
}

export interface IFolderType {
  id: string;
  name: string;
  onDoubleClick: () => void;
  onDelete: () => void;
}

export interface ITextFileType {
  id: string;
  name: string;
  content?: string;
  onDoubleClick: () => void;
  onDelete: () => void;
}

export interface IDeleteModalType {
  open: boolean;
  moveTrash: () => void;
  onCancel: () => void;
}

export interface IOptionsContainerType {
  inFilePage?: boolean;
  inTrash?: boolean;
}

export interface ITextEditorType {
  content?: ITextFileType["content"];
  onChangeContent: (newContent: string) => void;
}
