export const MEDIA_MAX_WIDTH = (width: string) => `(max-width: ${width})`

export const MEDIA_MIN_WIDTH = (width: string) => `(min-width: ${width})`

export const MEDIA_MAX_WIDTH_KEYS = {
  SM: MEDIA_MAX_WIDTH('640px'),
  MD: MEDIA_MAX_WIDTH('768px'),
  LG: MEDIA_MAX_WIDTH('1024px'),
  XL: MEDIA_MAX_WIDTH('1280px'),
}

export const MEDIA_MIN_WIDTH_KEYS = {
  SM: MEDIA_MIN_WIDTH('640px'),
  MD: MEDIA_MIN_WIDTH('768px'),
  LG: MEDIA_MIN_WIDTH('1024px'),
  XL: MEDIA_MIN_WIDTH('1280px'),
}
