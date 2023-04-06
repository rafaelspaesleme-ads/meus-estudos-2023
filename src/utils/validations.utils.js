export const isCreditCard = (creditCard) => {
    if (!creditCard) return false;

    const cc = removeAllSpaceInCreditCard(creditCard);

    const cartoes = {
        visa: /^4[0-9]{12}(?:[0-9]{3})/,
        mastercard: /^5[1-5][0-9]{14}/,
        hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
        elo: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/,
        amex: /^3[47][0-9]{13}/,
        diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
        discover: /^6(?:011|5[0-9]{2})[0-9]{12}/,
        jcb: /^(?:2131|1800|35\d{3})\d{11}/
    };

    for (let cartao in cartoes) if (cc.match(cartoes[cartao])) return cartao;
    return false;
}

export const removeAllSpaceInCreditCard = (numberCreditCard) => {
    return String(numberCreditCard).replaceAll(" ", "");
}

export const isValidDate = (date, period = 0) => {

    const userDate = new Date();
    userDate.setDate(date.getDate());

    const limitDate = new Date();
    limitDate.setDate(limitDate.getDate() + period);

    return userDate.getTime() >= limitDate.getTime();
}