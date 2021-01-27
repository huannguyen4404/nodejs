import path from 'path'

export const ROOT_DIR = path.dirname(path.dirname(__dirname))
export const SRC_DIR = path.join(ROOT_DIR, 'src')
export const UPLOAD_DIR = path.join(ROOT_DIR, 'public/uploads')
