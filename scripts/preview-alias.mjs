/**
 * Dev-only alias listener.
 *
 * The sandbox preview is pinned to whichever port the dev server first bound.
 * If Vite ever falls back to a different port (5173 in use, restart, etc.) the
 * previously-opened preview tab points at a dead port. This forwards 5174 ->
 * 5173, HTTP and websocket (HMR), so an already-open preview keeps working.
 *
 * Not part of the build. Run it alongside `npm run dev` if you need it.
 */
import http from 'node:http'
import net from 'node:net'

const FROM = Number(process.env.ALIAS_PORT || 5174)
const TO = Number(process.env.TARGET_PORT || 5173)

const server = http.createServer((req, res) => {
  const proxy = http.request(
    { host: '127.0.0.1', port: TO, path: req.url, method: req.method, headers: req.headers },
    (up) => {
      res.writeHead(up.statusCode || 502, up.headers)
      up.pipe(res)
    },
  )
  proxy.on('error', (err) => {
    res.writeHead(502, { 'content-type': 'text/plain' })
    res.end(`dev server on :${TO} unreachable — ${err.message}\n`)
  })
  req.pipe(proxy)
})

// Vite's HMR client opens a websocket on the same origin.
server.on('upgrade', (req, socket, head) => {
  const upstream = net.connect(TO, '127.0.0.1', () => {
    upstream.write(
      `${req.method} ${req.url} HTTP/1.1\r\n` +
        Object.entries(req.headers)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
          .join('\r\n') +
        '\r\n\r\n',
    )
    if (head?.length) upstream.write(head)
    socket.pipe(upstream).pipe(socket)
  })
  upstream.on('error', () => socket.destroy())
  socket.on('error', () => upstream.destroy())
})

server.listen(FROM, '0.0.0.0', () => {
  console.log(`preview alias: http://0.0.0.0:${FROM} -> http://127.0.0.1:${TO}`)
})
