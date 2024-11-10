const postOCR = async (req, res) => {
    try {
        const lesson = await fetch(`https://api.ocr.space/parse/image`, {
            method: "post",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'apikey': 'K88169338288957',
            },
            body: new URLSearchParams({
                'url': req.body.url
            })
        })
        const data = await lesson.json()
        res.status(200).json(data.ParsedResults[0].ParsedText)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { postOCR }