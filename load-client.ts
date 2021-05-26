interface Window {
  BMB: any
}

(function() {
  const l = document.getElementById('bmbclientloader') as HTMLScriptElement
  if (!l) {
    return
  }
  const host = l.src.match(/https?:\/\/[^/]*/)[0] || ''

  function fetchFiles(callback: (cssFile: string, jsFile: string) => void) {
    const req = new XMLHttpRequest()
    req.onreadystatechange = function () {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          const files = JSON.parse(req.responseText).files
          const cssFile = files['main.css']
          const jsFile = files['main.js']
          callback(`${host}/${cssFile}`, `${host}/${jsFile}`)
        }
      }
    }
    req.open('GET', `${host}/asset-manifest.json`)
    req.send()
  }

  function init() {
    const m = l.getAttribute('data-m')
    if (m) {
      window.BMB.renderFixedClient(m)
    }
  }

  fetchFiles(function(cssFile, jsFile) {
    let loadedCount = 0
    const head = document.getElementsByTagName('head')[0]
    const link = document.createElement('link')
    const script = document.createElement('script')

    function loaded() {
      loadedCount += 1
      
      if (loadedCount === 2) {
        init()
      }
    }
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = cssFile
    link.onload = loaded
    head.appendChild(link)
    script.src = jsFile
    script.onload = loaded
    head.appendChild(script)
  })
})()