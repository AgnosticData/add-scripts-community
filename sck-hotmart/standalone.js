(function() {

    // ================================
    // 1. CONFIGURAÇÃO DO USUÁRIO
    // ================================
    
    // Parâmetros selecionados (whitelist)
    // Se vazio → pega tudo
    var selected = [
      // "utm_source", "utm_term"
    ];
  
    // Parâmetros excluídos (blacklist)
    var excluded = [
      "_meta" // normalmente você não quer isso no sck
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