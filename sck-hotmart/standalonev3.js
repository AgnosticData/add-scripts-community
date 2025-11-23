// To avoid hit control and slow loading, use the CDN version:
// Use https://cdn.jsdelivr.net/gh/AgnosticData/add-scripts-community@main/
// Example:
// From:
//  https://raw.githubusercontent.com/AgnosticData/add-scripts-community/refs/heads/main/<PACKAGE>/standalone.js
// To:
//  https://cdn.jsdelivr.net/gh/AgnosticData/add-scripts-community@main/<PACKAGE>/standalone.js
// Example:
// <script defer src="https://cdn.jsdelivr.net/gh/AgnosticData/add-scripts-community@main/<PACKAGE>/standalone.js"></script>

(function() {

    // ================================
    // 1. CONFIGURAÇÃO DO USUÁRIO
    // ================================

    // Se você não pode colocar a classe no botão, você pode usar o XPath para encontrar o botão
    // Edite o texto procurado no link

    // > Exemplo por QuerySelector
    // var btn = document.querySelector('a[href*="Y100672606O"]');

    // > Exemplo por XPath
    // var xpath = '//a[contains(@href, "Y100672606O")]';
    // var result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    // var btn = result.singleNodeValue;

    // if (!btn) return;
    // btn.classList.add("ag_injection");
    
    // Parâmetros selecionados (whitelist)
    // Se vazio → pega tudo
    var selected = [
      // "utm_source", "utm_term"
    ];
  
    // Parâmetros excluídos (blacklist)
    var excluded = [
      "_meta", // normalmente você não quer isso no sck
      "sck"
    ];
  
    // ================================
    // 2. FONTE DE DADOS (Agnostic)
    // ================================
    
    var source = window.agnostic && agnostic.utmcase && agnostic.utmcase.value;
  
    if (!source) return; // não tem objeto, então ignora
  
    // ================================
    // 3. PROCESSAR DADOS
    // ================================
  
    var collected = [];
  
    Object.keys(source).forEach(function(key) {
  
      // Exclui blacklist
      if (excluded.includes(key)) return;
  
      // Se whitelist estiver preenchido → só pega os selecionados
      if (selected.length > 0 && !selected.includes(key)) return;
  
      collected.push(source[key]);
    });
  
    if (collected.length === 0) return;
  
    // Monta SCK
    var sckValue = collected.join('|');
  
    // ================================
    // 4. ATUALIZAR A URL SEM RELOAD
    // ================================
  
    var currentUrl = new URL(window.location.href);
    var params = currentUrl.searchParams;
  
    params.set('sck', sckValue);
    
    // Cria o caso no agnostic
    agnostic.utmcase.create(["sck", sckValue]);
  
    var finalUrl = currentUrl.pathname + "?" + params.toString();
    history.replaceState({}, '', finalUrl);
  
    // ================================
    // 5. ENVIAR PARA DATALAYER
    // ================================
  
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      sck: sckValue
    });
  
  })();