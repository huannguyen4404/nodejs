import multer from 'multer'
import path from 'path'
import { UPLOAD_DIR } from '../../configs/paths.config'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR)
  },
  filename: (req, file, cb) => {
    console.log(file)
    // cb(null, new Date().toISOString() + file.originalname)
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const MulterUploader = multer({ storage: storage, fileFilter: fileFilter })

export default MulterUploader
