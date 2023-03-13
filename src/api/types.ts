export interface ApiResp {
  code: number
  message: string
  data: any
  meta?: {
    pageSize: number
    total: number
    current: number
  }
}
export interface UploadResp {
  code: number
  msg: string
  data: {
    filename: string
    fileUrl: string
  }
}