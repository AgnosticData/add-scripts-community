(function () {

    const DEFAULT_META_VALUE = "DEFAULT-CONTENT"; // <-- mude seu default aqui
    const META_NAME = "agnostic_content_type";
  
    function isXPath(selector) {
      return (
        selector.startsWith('/') ||
        selector.startsWith('(') ||
        selector.startsWith('./') ||
        selector.includes('//')
      );
    }
  
    function updateMeta(content) {
      let meta = document.querySelector(`meta[name="${META_NAME}"]`);
  
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', META_NAME);
        document.head.appendChild(meta);
      }
  
      meta.setAttribute('content', content);
    }
  
    function replaceBySelector(selector, content, isHTML = false) {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (isHTML) el.innerHTML = content;
        else el.textContent = content;
      });
    }
  
    function replaceByXPath(xpath, content, isHTML = false) {
      const res = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
      );
      for (let i = 0; i < res.snapshotLength; i++) {
        const node = res.snapshotItem(i);
        if (!node) continue;
  
        if (isHTML) node.innerHTML = content;
        else node.textContent = content;
      }
    }
  
    /**
     * MASTER FUNCTION:
     * replace(selector, content, isHTML, metaValue)
     * metaValue → se informado, atualiza meta
     * metaValue → se não informado, usa default
     */
    function replace(selector, content, isHTML = false, metaValue = DEFAULT_META_VALUE) {
  
      // Atualiza meta sempre
      updateMeta(metaValue);
  
      // Usar XPath ou CSS selector
      if (isXPath(selector)) {
        replaceByXPath(selector, content, isHTML);
      } else {
        replaceBySelector(selector, content, isHTML);
      }
    }
  
    window.DOMReplacer = {
      replace,
      updateMeta
    };
  
  })();
  