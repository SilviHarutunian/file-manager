import FilesContainer from "../pages/filesContainer/FilesContainer";
import OpenFile from "../pages/openFile/OpenFile";
import Trash from "../pages/trash/Trash";

const routes = [
  { path: "/home", element: FilesContainer },
  { path: "home/folder/:folderId", element: FilesContainer },
  { path: "home/file/:fileId", element: OpenFile },
  { path: "/trash", element: Trash },
];

export default routes;
