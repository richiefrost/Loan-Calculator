
function getPayment(annualRate, loanValue, numPeriods, extraPayment) {
	'use strict';
    return extraPayment + loanValue * ((annualRate / 12 * Math.pow(1 + annualRate / 12, numPeriods)) / (Math.pow(1 + annualRate / 12, numPeriods) - 1));
}

function getRatePerPeriod(rate, paymentsPerPeriod) {
    'use strict';
    return rate / paymentsPerPeriod;
}

function getInterestPortionOfPayment(annualRate, remainingBalance) {
    'use strict';
    var rate = getRatePerPeriod(annualRate, 12);
    return remainingBalance * rate;
}

function getPrincipalPortionOfPayment(paymentAmount, annualRate, remainingBalance) {
    'use strict';
    return paymentAmount - getInterestPortionOfPayment(annualRate, remainingBalance);
}

function getPaymentSchedule(annualRate, principal, numPeriods, extraPayment) {
    'use strict';
    var payment, paymentId, loanBalance, principalPortion, interestPortion, result, resultObj;
    payment = getPayment(annualRate, principal, numPeriods, extraPayment);
    paymentId = 0;
    //Store the loan balance once
    loanBalance = principal;
    result = [];
    while (loanBalance > 0) {
        principalPortion = getPrincipalPortionOfPayment(payment, annualRate, loanBalance);
        interestPortion = getInterestPortionOfPayment(annualRate, loanBalance);
        if (loanBalance < payment) {
            loanBalance = 0;
        } else {
            loanBalance -= principalPortion;
        }
        resultObj = {paymentAmount: payment.toFixed(2), principal: principalPortion.toFixed(2),
                     interest: interestPortion.toFixed(2), remainingBalance: loanBalance.toFixed(2)};
        result[paymentId] = resultObj;
        paymentId += 1;
    }
    
    //result[paymentId] = {paymentAmount: payment.toFixed(2), principal: loanBalance.toFixed(2),
    //                     interest: (0).toFixed(2), remainingBalance: (0).toFixed(2)};
    return result;
}

function paymentScheduleToStringArray(annualRate, principal, numPeriods) {
    'use strict';
    var paymentSchedule = getPaymentSchedule(annualRate, principal, numPeriods), i, result;
    result = [];
    for (i = 0; i < paymentSchedule.length; i += 1) {
        result[i] = "Payment Amount: " + paymentSchedule[i].paymentAmount + " Principal: "
                    + paymentSchedule[i].principal + " Interest: " + paymentSchedule[i].interest
                    + " Remaining Balance: " + paymentSchedule[i].remainingBalance;
    }
    return result;
}

function printArray(array) {
    'use strict';
    var i, html, pageBody;
    pageBody = document.getElementById('outputBody');
    html = "";
    for (i = 0; i < array.length; i += 1) {
        html += array[i] + "<br/>";
    }
    pageBody.innerHTML = html;
}