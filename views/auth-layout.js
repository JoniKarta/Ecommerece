

module.exports = ({content})=> {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="/css/styles.css" />
        <title>My Application</title>
    </head>
        </body>
            ${content}
        </body>

    </html>
    `
}

