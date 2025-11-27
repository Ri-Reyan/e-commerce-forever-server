import multer from "multer";

const storage = multer.diskStorage({});
export const uploads = multer({ storage });
