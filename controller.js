function displayPayment(payment) {
    payment = "$" + payment.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); //payment.toFixed(2);
    $("#payment").html(payment);
}

function displaySchedule(paymentSchedule) {
    var i, output = "", totalInterest = 0, totalPaid = 0, totalMonths = 0;
    for(i = 0; i < paymentSchedule.length; i+=1){
        output += "Payment Amount: " + paymentSchedule[i].paymentAmount + " Principal: "
                    + paymentSchedule[i].principal + " Interest: " + paymentSchedule[i].interest
                    + " Remaining Balance: " + paymentSchedule[i].remainingBalance + "<br/>";
        totalInterest = totalInterest + parseFloat(paymentSchedule[i].interest);
        totalPaid = totalPaid + parseFloat(paymentSchedule[i].paymentAmount);
        totalMonths++;
    }
    output = output + "Total paid: " + totalPaid.toFixed(2) + " Total interest: " + totalInterest.toFixed(2) + " Total months: " + totalMonths;
    $("#schedule").html(output);
}

function controller() {
    $(document).on("submit", "#loanForm", function(e) {
        e.preventDefault();
        var payment, inputs = getInputs(), extraPayment;
        switch($(e.originalEvent.currentTarget.activeElement).attr("id")){
            case "seeBreakdown":
                var schedule = getPaymentSchedule(inputs.annualRate, inputs.loanValue, inputs.numPeriods, inputs.extraPayment);
                displaySchedule(schedule);
                break;
            case "seePayment":
                payment = getPayment(inputs.annualRate, inputs.loanValue, inputs.numPeriods, inputs.extraPayment);
                displayPayment(payment);
                break;
            case "clear":
                $("#schedule").empty();
                $("#payment").empty();
                break;
        }
   });
}

function getInputs(){
    var inputs = {};
    inputs.annualRate = $("#annualRate").val() / 100;
    inputs.loanValue = $("#loanAmount").val();
    inputs.numPeriods = $("#loanTerm").val() * 12;
    inputs.extraPayment = $("#extraPayment").val() * 1;
    return inputs;
}
/*$(function() {
   
});*/