function detectMovement() {
    const decoration = document.querySelector('.decoration');
    const container = document.querySelector('.container');

    document.addEventListener('mousemove', e => {
        const mouseX = e.clientX,
              mouseY = e.clientY;
    
        const PercentageX = (mouseX / window.innerWidth * 100) - 50,
              PercentageY = (mouseY / window.innerHeight * 100) - 50,
              MoveX = (PercentageX / 50).toFixed(3),
              MoveY = (PercentageY / 50).toFixed(3),
              MoveX_ = -MoveX / 2,
              MoveY_ = -MoveY / 2;
              
        decoration.animate({
            transform: `translate(${MoveX_}rem, ${MoveY_}rem)`
        }, {
            duration: 1000,
            fill: "forwards"
        })
    
        container.animate({
            transform: `translate(${MoveX}rem, ${MoveY}rem)`
        }, {
            duration: 1000,
            fill: "forwards"
        })
    })
}

/* Validação formulário */

class ValidaCPF {
    constructor(cpf) {
        Object.defineProperty(this, `newCpf`, {
            enumerable: true,
            writable: false,
            configurable: false,
            value: cpf.replace(/\D+/g, '')
        })
    }

    verificandoTipoCpf() {
        if (typeof this.newCpf !== 'string') return false;
        if (this.newCpf.length !== 11) return false;
        if (this.newCpf === this.newCpf[0].repeat(this.newCpf.length)) return false;
    }

    static gerandoDigitos(nCpf) {
        const cpfArray = Array.from(nCpf).slice(0, -2);

        const total = cpfArray.reduce((acc, value, idx) => {
            acc += (10 - idx) * Number(value);
            return acc;
        }, 0),
              n = 11 - (total % 11),
              validationNumber = n > 9 ? 0 : n;
        cpfArray.push(validationNumber);

        const total_ = cpfArray.reduce((acc, value, idx) => {
            acc += (11 - idx) * Number(value);
            return acc;
        }, 0),
              n_ = 11 - (total_ % 11),
              validationNumber_ = n_ > 9 ? 0 : n_;
        cpfArray.push(validationNumber_);

        return cpfArray.toString().replaceAll(',', '');
    }

    validandoCPF() {
        this.verificandoTipoCpf();
        this.correctCpf = ValidaCPF.gerandoDigitos(this.newCpf);
        return this.correctCpf === this.newCpf;
    }
}

class ValidaFormulario {
    constructor() {
        this.verificaCampos();
    }

    criaErro(local, msg) {
        const div = document.createElement('div');
        div.innerText = msg;
        div.classList.add('error');
        local.insertAdjacentElement('afterend', div);
    }    

    verificaUser() {
        const user = document.querySelector('#Usuario');
        let valid = true;

        if (user.value.length < 3 || user.value.length > 12) {
            this.criaErro(user, 'Usuário deve conter entre 3 e 12 caracteres');
            valid = false;
        }

        if (!user.value.match(/^[a-zA-Z0-9]+$/g)) {
            this.criaErro(user, 'Usuário deve conter apenas letras e números');
            valid = false;
        }

        return valid;
    }

    verificaPass() {
        const pass = document.querySelector('#senha'),
              rpass = document.querySelector('#rsenha');
        let valid = true;

        if (pass.value.length < 6 || pass.value.length > 12) {
            this.criaErro(pass, 'Senha deve conter entre 6 e 12 caracteres');
            valid = false;
        }

        if (pass.value !== rpass.value) {
            this.criaErro(rpass, 'As senhas não coincidem');
            valid = false;
        }

        return valid;
    }

    verificaVazio() {
        const inpts = document.querySelectorAll('.input');
        let valid = true;

        inpts.forEach(e => {
            if (!e.value) {
                const label = e.previousElementSibling.innerText;
                this.criaErro(e, `O campo "${label}" não pode estar vazio`);
                valid = false;
            }
        })

        return valid;
    }

    verificaCPF() {
        let valid = true;
        const cpf = document.querySelector('#CPF');
        const cpfvalidado = new ValidaCPF(cpf.value);
        if (!cpfvalidado.validandoCPF()) {
            this.criaErro(cpf, 'CPF inválido');
            valid = false;
        }

        return valid;
    }

    verificaCampos() {
        const errors = document.querySelectorAll('.error');
    
        errors.forEach(e => {
            e.remove();
        })
    
        const userValid = this.verificaUser(),
              passValid = this.verificaPass(),
              blankValid = this.verificaVazio(),
              cpfValid = this.verificaCPF();

        if (userValid && passValid && blankValid && cpfValid) {
            console.log('Formulário enviado');
        } else {
            console.log('Formulário não enviado.');
        }
    }
}

/* Animação letras */

const title = document.querySelector(".title_");

/* Execução */

detectMovement();