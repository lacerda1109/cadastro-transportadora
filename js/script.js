// API consumida: ViaCEP

// Declaração dos elementos
let rua = document.getElementById('endereço')
let bairro = document.getElementById('bairro')
let cidade = document.getElementById('cidade')
let estado = document.getElementById('estado')
let cepInput = document.getElementById('cep')
let msgErro = document.getElementById('cep-msg')

const clearForm = () => { // Limpar campos
    rua.value = ''
    bairro.value = ''
    cidade.value = ''
    estado.value = ''
}

const isCep = (cep) => { // Validação de cep
    if (cep.length === 8) {
        return true
    }
}

const preencherForm = (dt) => { // Preenchimento dos campos
    rua.value = dt.logradouro
    bairro.value = dt.bairro
    cidade.value = dt.localidade
    estado.value = dt.uf
}

const pesquisarCep = async () => { // Função principal
    msgErro.style.display = 'none'
    clearForm()
    const cep = cepInput.value
    if (cep === '') {
        return
    }

    if (isCep(cep)) {
        const baseUrl = `https://viacep.com.br/ws/${cep}/json/`
        const dados = await fetch(baseUrl).then(response => response.json())
        if (dados.hasOwnProperty('erro')) {
            msgErro.innerHTML = 'CEP não encontrado!'
            msgErro.style.display = 'inline'
            clearForm()
        } else {
            preencherForm(dados)
        }
    } else {
        msgErro.innerHTML = 'CEP inválido!'
        msgErro.style.display = 'inline'
        clearForm()
    }
}

cepInput.addEventListener('focusout', pesquisarCep)
