let numeroSecreto;
let tentativas = 0;
let recorde = parseInt(localStorage.getItem('recorde')) || null;
let historico = [];

// Inicializar o jogo
function inicializarJogo() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    tentativas = 0;
    historico = [];
    
    document.getElementById('chute').value = '';
    document.getElementById('numberDisplay').textContent = '-';
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
    document.getElementById('tentativas').textContent = '0';
    document.getElementById('historico').innerHTML = '';
    document.getElementById('chute').disabled = false;
    document.getElementById('chute').focus();
    
    atualizarRecorde();
}

// Atualizar display do recorde
function atualizarRecorde() {
    const recordeEl = document.getElementById('recorde');
    if (recorde) {
        recordeEl.textContent = recorde;
    } else {
        recordeEl.textContent = '-';
    }
}

// Verificar o chute
function verificarChute() {
    const inputEl = document.getElementById('chute');
    const chute = parseInt(inputEl.value);
    const feedback = document.getElementById('feedback');
    
    // Validação
    if (isNaN(chute) || chute < 1 || chute > 100) {
        feedback.textContent = '⚠️ Digite um número entre 1 e 100!';
        feedback.className = 'feedback warning';
        return;
    }
    
    // Atualizar display do número
    document.getElementById('numberDisplay').textContent = chute;
    
    tentativas++;
    historico.push(chute);
    
    document.getElementById('tentativas').textContent = tentativas;
    
    if (chute === numeroSecreto) {
        feedback.textContent = `✅ Muito baixo! Tente um número maior.`;
        feedback.className = 'feedback success';
        feedback.textContent = `✅ Parabéns! Você acertou em ${tentativas} tentativa(s)!`;
        
        // Verificar e atualizar recorde
        if (!recorde || tentativas < recorde) {
            recorde = tentativas;
            localStorage.setItem('recorde', recorde);
            atualizarRecorde();
            feedback.textContent += ' 🏆 Novo recorde!';
        }
        
        inputEl.disabled = true;
        document.querySelector('.btn-submit').disabled = true;
    } else if (chute < numeroSecreto) {
        feedback.textContent = '📈 Muito baixo! Tente um número maior.';
        feedback.className = 'feedback low';
    } else {
        feedback.textContent = '📉 Muito alto! Tente um número menor.';
        feedback.className = 'feedback high';
    }
    
    // Atualizar histórico visual
    atualizarHistorico();
    
    inputEl.value = '';
    inputEl.focus();
}

// Atualizar histórico de chutes
function atualizarHistorico() {
    const historicoEl = document.getElementById('historico');
    historicoEl.innerHTML = '';
    
    historico.forEach(chute => {
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.textContent = chute;
        
        if (chute === numeroSecreto) {
            badge.classList.add('acerto');
        } else if (chute < numeroSecreto) {
            badge.classList.add('baixo');
        } else {
            badge.classList.add('alto');
        }
        
        historicoEl.appendChild(badge);
    });
}

// Reiniciar o jogo
function reiniciarChute() {
    inicializarJogo();
}

// Permitir enviar com Enter
document.addEventListener('DOMContentLoaded', function() {
    const inputEl = document.getElementById('chute');
    inputEl.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && !this.disabled) {
            verificarChute();
        }
    });
    
    inicializarJogo();
});