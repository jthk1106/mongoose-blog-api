// separate listener from server file in index.js
const server = require('./app')

const PORT = process.env.PORT || 8080

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
})