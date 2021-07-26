let form = document.querySelector('form');

let customer = form.querySelector('[name="name"]');
let phone = form.querySelector('[name="phone"]');
let message = form.querySelector('[name="message"]');

let overlay = document.querySelector('.modal-overlay');
let popup = document.querySelector('.modal-content');
let close = popup.querySelector('.modal-content-close');

/* user-block popup functions */

form.addEventListener('submit', function (e) {
    let phoneValue = phone.value.replace(/[^\d]/g, '');
    if (!customer.value || !phoneValue || phoneValue.length !== 12) {
        e.preventDefault();

        if (!customer.value) {
            customer.classList.add('border-danger');
        }

        console.log(phoneValue.length !== 12);
        if (!phoneValue || (phoneValue.length !== 12)) {
            phone.classList.add('border-danger');
        }

        form.classList.add('modal-error');
        setTimeout(function() {
            form.classList.remove('modal-error');
            customer.classList.remove('border-danger');
            phone.classList.remove('border-danger');
        }, 1000);
    } else {
        e.preventDefault();
        let chatId = "-1001391529764";
        let token = "1805227154:AAHNJ4htXxxjjdCx0NSP85jDspF5bBF64Hg";
        let text = "Текст для <b>нашего</b> бота";

        let fields = [
            '<b>Имя</b>: ' + customer.value,
            '<b>Телефон</b>: %2b' + phoneValue,
            '<b>Сообщение:</b> ' + "" + message.value + ""
        ]
        let msg = ''
        
        fields.forEach(field => {
            msg += field + '%0A'
        });
        
        const request = new XMLHttpRequest();

        let url = "https://api.telegram.org/bot" + token + "/sendMessage?chat_id=" + chatId + "&parse_mode=HTML&text=" + msg;
        request.open("POST", url, true);

        request.send(text);

        // show modal content
        popup.classList.add('modal-content-show');
        overlay.classList.add('modal-overlay-show');

        customer.value = '';
        phone.value = '';
        message.value = '';
    }
});

close.addEventListener('click', function (e) {
    e.preventDefault();
    popup.classList.remove('modal-content-show');
    overlay.classList.remove('modal-overlay-show');
});

window.addEventListener('keydown', function (e) {
    if (e.keyCode === 27) {
        if (popup.classList.contains('modal-content-show')) {
            popup.classList.remove('modal-content-show');
            overlay.classList.remove('modal-overlay-show');
        }
    }
});

let maskedInputs = document.querySelectorAll("[data-mask]");

for (let index = 0; index < maskedInputs.length; index++) {
    maskedInputs[index].addEventListener('input', maskInput);
}

function maskInput() {
    let input = this;
    let mask = input.dataset.mask;
    let value = input.value;
    let literalPattern = /[0\*]/;
    let numberPattern = /[0-9]/;
    let newValue = "";
    try {
        let maskLength = mask.length;
        let valueIndex = 0;
        let maskIndex = 0;

        for (; maskIndex < maskLength;) {
            if (maskIndex >= value.length) break;

            if (mask[maskIndex] === "0" && value[valueIndex].match(numberPattern) === null) break;

            // Found a literal
            while (mask[maskIndex].match(literalPattern) === null) {
                if (value[valueIndex] === mask[maskIndex]) break;
                newValue += mask[maskIndex++];
            }
            newValue += value[valueIndex++];
            maskIndex++;
        }

        input.value = newValue;
    } catch (e) {
        console.log(e);
    }
}
