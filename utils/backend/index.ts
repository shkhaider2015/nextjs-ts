import formidable from "formidable"

const normalizeData = async (req:any) => {
    const data:{ err: string, fields:formidable.Fields, files: formidable.Files } = await new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm()
        form.parse(req, (err, fields, files) => {
          if (err) reject({ err })
          resolve({ err, fields, files })
        }) 
      })

      return data;
}

export default {
    normalizeData
}