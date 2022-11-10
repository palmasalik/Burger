const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 400,
        amount: 0,
        Summ: function () {
            return this.price * this.amount
        },
        Kcall: function () {
            return this.kcall * this.amount
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 600,
        amount: 0,
        Summ: function () {
            return this.price * this.amount
        },
        Kcall: function () {
            return this.kcall * this.amount
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 900,
        amount: 0,
        Summ: function () {
            return this.price * this.amount
        },
        Kcall: function () {
            return this.kcall * this.amount
        }
    }
}

// Создаем доп Объект с модификациями

const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 2000,
        kcall: 100
    },
    lettuce: {
        name: 'Салатный лист',
        price: 1000,
        kcall: 10
    },
    cheese: {
        name: 'Сыр',
        price: 3000,
        kcall: 50
    }
}

const btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
    checkExtraProduct = document.querySelectorAll('.main__product-checkbox')

for (let i = 0; i < btnPlusOrMinus.length; i++) {

    btnPlusOrMinus[i].addEventListener('click', function () {

        plusOrMinus(this)

    })
}

function plusOrMinus(element) {

    // closest() - метод объекта. Подключается к родительскому элементу
    // getAttribute() - Берет информацию с атрибута

    const parent = element.closest('.main__product'),
        /* Подключаемся к родителю */
        parentId = parent.getAttribute('id'),
        /* Беру у родителся данные из атрибута id */
        out = parent.querySelector('.main__product-num'),
        price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span'),
        elementData = element.getAttribute('data-symbol')

    if (elementData == '+' && product[parentId].amount < Infinity) {
        product[parentId].amount++
    } else if (elementData == '-' && product[parentId].amount > 0) {
        product[parentId].amount--
    }

    out.innerHTML = product[parentId].amount
    price.innerHTML = product[parentId].Summ()
    kcall.innerHTML = product[parentId].Kcall()
}


for (let i = 0; i < checkExtraProduct.length; i++) {

    checkExtraProduct[i].addEventListener('click', function () {
        addExtraProduct(this)
    })
}

function addExtraProduct(element) {
    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        kcall = parent.querySelector('.main__product-kcall span'),
        price = parent.querySelector('.main__product-price span'),
        elAtr = element.getAttribute('data-extra')
    product[parentId][elAtr] = element.checked

    if (product[parentId][elAtr] == true) {
        product[parentId].kcall += extraProduct[elAtr].kcall
        product[parentId].price += extraProduct[elAtr].price
    } else {
        product[parentId].kcall -= extraProduct[elAtr].kcall
        product[parentId].price -= extraProduct[elAtr].price
    }
    kcall.innerHTML = product[parentId].Kcall()
    price.innerHTML = product[parentId].Summ()
}

const receipt = document.querySelector('.receipt'),
      receiptWindow = receipt.querySelector('.receipt__window'),
      receiptOut = receipt.querySelector('.receipt__window-out'),
      btnReceipt = receipt.querySelector('.receipt__window-btn'),
      addCart = document.querySelector('.addCart')
      
      
let arrayProduct = [],
totalName = '',
totalPrice = 0,
totalKcall = 0
      
addCart.addEventListener('click', function () { 
    for (const key in product) {
        const po = product[key]
        if (po.amount > 0) {
            arrayProduct.push(po)
            for (const infokey in po) {
                if (po[infokey] === true) {
                    po.name += '\n' + extraProduct[infokey].name
                }
                }
            }
            po.price = po.Summ()
            po.kcall - po.Kcall()
        }
    for (let i = 0; i < arrayProduct.length; i++) {
        const el = arrayProduct[i]
        totalPrice += el.price
        totalKcall += el.kcall
        totalName += '\n' + el.name + '\n'
    }
    receiptOut.innerHTML = `Вы заказали: \n ${totalName} \nКаллорийность ${totalKcall} \nСтоимость покупки ${totalPrice} сумм`
    receipt.style.display = 'flex'
    setTimeout(() => {
         receipt.style.opacity = '1'
    }, 100);
    setTimeout(() => {
         receiptWindow.style = `top: 50px;
                                height:100px; 
                                overflow-y: scroll;
                                `
    }, 200);
    document.body.style.overflow = 'hidden'
    
})
btnReceipt.addEventListener('click' , function () {
    location.reload()
})





let headerTimer = document.querySelector('.header__timer-extra');

increase()

function increase(e) {
    if (headerTimer.innerHTML >= 0 && headerTimer.innerHTML < 50) {
        setTimeout(() => {
            headerTimer.innerHTML++
            increase(10)
        }, e);
    } else if (headerTimer.innerHTML >= 50 && headerTimer.innerHTML < 100) {
        setTimeout(() => {
            headerTimer.innerHTML++
            increase(70)
        }, e);
    }
}