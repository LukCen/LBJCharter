
export default function saveToFile(contents: HTMLCanvasElement | null, extension: string = 'png') {
  const canvas = contents
  if (canvas) {
    console.log(contents)
    const dataUrl = canvas.toDataURL(`image/${extension}`)
    return dataUrl
  }
}
